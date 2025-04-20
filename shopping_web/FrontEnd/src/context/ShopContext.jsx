import React, { createContext, useState } from "react";
import all_product from "../components/assets/all_product";

export const ShopContext = createContext(null);
const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < all_product.length; i++) {
    cart[i] = 0;
  }
  return cart;
};
const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    console.log(cartItems);
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  // const loadCartFromStorage = () => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user && user._id) {
  //     const storedCart = localStorage.getItem(`cartItems_${user._id}`);
  //     const storedSelected = localStorage.getItem(`selectedItems_${user._id}`);
  //     setCartItems(storedCart ? JSON.parse(storedCart) : {});
  //     setSelectedItems(storedSelected ? JSON.parse(storedSelected) : []);
  //   } else {
  //     setCartItems({});
  //     setSelectedItems([]);
  //   }
  // };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    // loadCartFromStorage,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
