import React from "react";
import "./ListItem.css";
const ListItem = ({likeList,product, showDetailedProduct , removeItemFromLikeList}) => {
  const handleRemoveClick = () => {
    removeItemFromLikeList(likeList.id, product.id)
  };
  const showDetailedProductHandler = (event) => {
    showDetailedProduct(product.id);
  };

  return (
    <div className="CartItem">
      <img
        src={product.imageUrl[0]}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
          '/images/placeholders/image.png'
          ;
        }}
      ></img>
      <div className="itemDetails">
        <p>{product.name}</p>
        <div className="quantityAndPrice">
          <p>{product.price} BYN</p>
          <button onClick={showDetailedProductHandler}>К товару</button>
        </div>
      </div>
      <div className="removeButton" onClick={handleRemoveClick}>
        ✕
      </div>
    </div>
  );
};

export default ListItem;
