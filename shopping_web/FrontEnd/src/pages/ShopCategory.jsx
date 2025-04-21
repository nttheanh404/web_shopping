import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
// import { ShopContext } from "../context/ShopContext";
// import dropdown_icon from "../components/assets/dropdown_icon.png";
import Item from "../components/Item/item";
import { HelmetProvider } from "react-helmet-async";
import { getAllProducts } from "../services/product";
import { IoMdSearch } from "react-icons/io";
const ShopCategory = (props) => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);

  const filteredAndSortedProducts = [...products]
    .filter((item) => {
      const matchCategory = props.category === item.category;
      const matchPrice =
        priceFilter === "below-50"
          ? item.new_price < 50
          : priceFilter === "50-100"
          ? item.new_price >= 50 && item.new_price <= 100
          : priceFilter === "above-100"
          ? item.new_price > 100
          : true;
      const matchSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchCategory && matchPrice && matchSearch;
    })
    .sort((a, b) => {
      if (sortOption === "price-asc") return a.new_price - b.new_price;
      if (sortOption === "price-desc") return b.new_price - a.new_price;
      if (sortOption === "name-asc") return a.name.localeCompare(b.name);
      if (sortOption === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <HelmetProvider>
        <title>Product</title>
      </HelmetProvider>
      <div className="shop-category">
        {/* <img className="shop-category-banner" src={props.banner} alt="banner" /> */}
        <div
          className="shop-category-banner-container"
          style={{ fontFamily: "-moz-initial" }}
        >
          <div className="shop-category-banner-content">
            <h2 className="shop-category-banner-title">SALE ??%</h2>
            <p className="shop-category-banner-subtitle">
              <span className="shop-category-highlight">5</span> days left
            </p>
            <div className="shop-category-banner-button-wrapper">
              <button className="shop-category-banner-button">
                Explore now
              </button>
            </div>
          </div>
          <img
            src={props.banner}
            alt="banner"
            className="shop-category-banner-image"
          />
        </div>

        <div className="shop-category-indexSort">
          <p>
            <span>
              Showing{" "}
              <strong>
                {Math.min(visibleCount, filteredAndSortedProducts.length)}
              </strong>{" "}
              products
            </span>
          </p>
          <div className="shop-category-search-container">
            <div className="shop-category-search">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IoMdSearch className="shop-category-search-icon" />
            </div>
          </div>

          {/* Lọc theo giá */}
          <div>
            <label htmlFor="filter">Price: </label>
            <select
              id="filter"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="shop-category-filter"
            >
              <option value="">All</option>
              <option value="below-50">Below $50</option>
              <option value="50-100">From $50 to $100</option>
              <option value="above-100">Above $100</option>
            </select>
          </div>

          {/* Sắp xếp */}
          <div>
            <label htmlFor="sort">Sort: </label>
            <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="shop-category-sort"
            >
              <option value="">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
            </select>
          </div>
        </div>
        <div className="shop-category-products">
          {filteredAndSortedProducts.slice(0, visibleCount).map((item, i) => (
            <Item
              key={i}
              id={item._id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
        </div>
        {visibleCount < filteredAndSortedProducts.length && (
          <div
            className="shop-category-more"
            onClick={() => setVisibleCount((prev) => prev + 4)}
          >
            Explore More
          </div>
        )}
      </div>
    </>
  );
};

export default ShopCategory;
