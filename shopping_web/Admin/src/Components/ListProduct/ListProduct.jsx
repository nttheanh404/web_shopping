import "./ListProduct.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt, FaTrashAlt, FaSearch } from "react-icons/fa"; // Thêm FaSearch
import { getAllProducts, deleteProduct } from "../../services/product";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");
  const navigate = useNavigate();

  const fetchInfo = async () => {
    try {
      const products = await getAllProducts();
      setAllProducts(products);
      setFilteredProducts(products); // Gán ban đầu
    } catch (err) {
      console.error("Error loading product:", err);
    }
  };

  const editProduct = (product) => {
    navigate(`/admin/updateproduct/${product._id}`, {
      state: { productToUpdate: product },
    });
  };

  const removeProduct = async (id) => {
    try {
      await deleteProduct(id);
      const updated = allProducts.filter((product) => product._id !== id);
      setAllProducts(updated);
      filterProducts(updated, searchKeyword, categoryFilter);
    } catch (err) {
      console.error("Error while deleting product:", err);
    }
  };

  const filterProducts = (products, keyword, category, sort) => {
    let result = products;

    if (keyword) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (sort === "asc") {
      result.sort((a, b) => Number(a.new_price) - Number(b.new_price));
    } else if (sort === "desc") {
      result.sort((a, b) => Number(b.new_price) - Number(a.new_price));
    }

    setFilteredProducts(result);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  useEffect(() => {
    filterProducts(allProducts, searchKeyword, categoryFilter, sortOrder);
  }, [searchKeyword, categoryFilter, sortOrder, allProducts]);

  // Lấy danh sách các category duy nhất
  const categories = ["all", ...new Set(allProducts.map((p) => p.category))];

  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="product-filters">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by product name..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all"
                ? "All Categories"
                : cat.charAt(0).toUpperCase() + cat.slice(1)}{" "}
            </option>
          ))}
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="none">Sort by price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="list-product-table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th colSpan={3}>Products</th>
                <th colSpan={4}>Title</th>
                <th colSpan={2}>Old Price</th>
                <th colSpan={2}>Offer Price</th>
                <th colSpan={2}>Category</th>
                <th colSpan={5}>Description</th>
                <th colSpan={2}>Activity</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, index) => (
                <tr key={index}>
                  <td colSpan={3}>
                    <img
                      src={product.image}
                      alt="product"
                      className="list-product-icon"
                    />
                  </td>
                  <td colSpan={4}>{product.name}</td>
                  <td colSpan={2}>${product.old_price}</td>
                  <td colSpan={2}>${product.new_price}</td>
                  <td colSpan={2}>{product.category}</td>
                  <td
                    colSpan={5}
                    style={{ maxWidth: "1000px", wordWrap: "break-word" }}
                  >
                    {product.description}
                  </td>
                  <td colSpan={2}>
                    <div className="list-product-update-container">
                      <div
                        className="list-product-update-icon-container"
                        onClick={() => editProduct(product)}
                      >
                        <FaPencilAlt className="list-product-update-icon" />
                        <span>Update</span>
                      </div>
                      <div
                        className="list-product-update-icon-container"
                        onClick={() => removeProduct(product._id)}
                      >
                        <FaTrashAlt className="list-product-update-icon" />
                        <span>Remove</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListProduct;
