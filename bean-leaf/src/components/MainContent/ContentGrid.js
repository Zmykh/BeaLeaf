import React, { useState } from "react";
import DetailedProduct from "../DetailedProduct/DetailedProduct";
import "./ContentGrid.css";
import ProductCard from "./ProductCard/ProductCard";

const ContentGrid = ({
  products,
  addToBasket,
  showDetailedProduct,
  hideDetailedProduct,
  selectedProduct,
  CurentUser,
  Reviews,
  createReview,
  GetReviews, 
  addToLikeList,
  likeList, 
  fetchProducts,
  removeItemFromLikeList
}) => {
  return (
    <div className="heigth">
      {selectedProduct ? (
        <DetailedProduct 
          product={selectedProduct}
          hideDetailedProduct={hideDetailedProduct}
          addToBasket={addToBasket}
          CurentUser={CurentUser}
          Reviews={Reviews}
          createReview = {createReview}
          GetReviews = {GetReviews}
          addToLikeList = {addToLikeList}
          likeList = {likeList}
          fetchProducts = {fetchProducts}
          removeItemFromLikeList = {removeItemFromLikeList}
        />
      ) : null}
      <div className="contentGrid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToBasket={addToBasket}
            showDetailedProduct={showDetailedProduct}
            CurentUser={CurentUser}
            addToLikeList = {addToLikeList}
            likeList = {likeList}
          />
        ))}
      </div>
    </div>
  );
};

export default ContentGrid;
