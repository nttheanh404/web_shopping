import React from "react";
import Hero from "../components/Hero/hero";
import Popular from "../components/Popular/popular";
import Offers from "../components/Offers/offers";
import NewCollections from "../components/NewCollections/newCollections";
import NewsLetter from "../components/NewsLetter/newsLetter";
const Shop = () => {
  return (
    <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
      <NewsLetter />
    </div>
  );
};

export default Shop;
