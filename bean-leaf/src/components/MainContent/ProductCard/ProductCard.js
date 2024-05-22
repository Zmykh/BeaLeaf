import React from "react";
import "./ProductCard.css";

const ProductCard = ({
  product,
  addToBasket,
  showDetailedProduct,
  CurentUser,
  addToLikeList,
}) => {
  const handleProductClick = () => {
    showDetailedProduct(product.id);
  };
  const handleLikeClick = () => {
    addToLikeList(CurentUser.id, product.id);
  };
  
  return (
    <div className="productCard">
      {/* <img
          src="https://www.svgrepo.com/show/524063/heart.svg"
          width={24}
          className="addToLikeList"
          onClick = {handleLikeClick}
        /> */}
        <div className="image-container">
      <img
        src={product.imageUrl[0]}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/images/placeholders/image.png';
        }}
        onClick={handleProductClick}
      /></div>
      <div className="productInfo">
        <b>
          <p className="productName" onClick={handleProductClick}>
            {product.name}
          </p>
        </b>
        <div className="row">
          <div>
          <p className="productCountry" onClick={handleProductClick}>
            {product.country}
          </p></div><div>
          <p className="weigth">{product.quantity} гр</p>
          <p className="weigth">{product.availability} шт</p>
          </div>
          
        </div>
      </div>
      <div className="productPriceCart">
        <p>BYN {product.price}</p>
        <button
          className="addToCart"
          onClick={() => addToBasket(product.id, 1, CurentUser.id)}
        >
          В корзину
        </button>
        
      </div>
    </div>
  );
};

export default ProductCard;
