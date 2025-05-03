import "./ListProduct.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { getAllProducts, deleteProduct } from "../../services/product";

const ListProduct = () => {
  //const authUrl = import.meta.env.VITE_BE_URL;
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

  const fetchInfo = async () => {
    try {
      const products = await getAllProducts();
      setAllProducts(products);
    } catch (err) {
      console.error("Error loading product:", err);
    }
  };

  const editProduct = (product) => {
    navigate(`/admin/updateproduct/${product._id}`, {
      state: { productToUpdate: product },
    });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    try {
      await deleteProduct(id);
      setAllProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (err) {
      console.error("Error while deleting product:", err);
    }
  };

  return (
    <div className="list-product">
      <h1>All Products List</h1>
      {allProducts.length === 0 ? (
        <p>There are no products.</p>
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
              {allProducts.map((product, index) => (
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
