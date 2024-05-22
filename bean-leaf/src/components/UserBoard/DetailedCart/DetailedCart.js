import React from "react";
import "./DetailedCart.css";
import CartItem from "./CartItem/CartItem";
import axios from "axios";


const DetailedCart = ({
  productBasket,
  products,
  showDetailedProduct,
  removeItem,
  updateQuantity,
}) => {
  const itemsIn = productBasket.items;
  return (
    <div className="cart-container">
      <h2>Корзина</h2>
      {itemsIn.length === 0 ? (
        <h2>Ваша корзина пуста</h2>
      ) : (
        <div>
        <div className="items-row">
          {itemsIn.map((item) => {
            const product = products.find((product) => product.id === item.productId);
            return  <CartItem productBasket = {productBasket} item={item} product={product} removeItem={removeItem} 
            updateQuantity={updateQuantity} showDetailedProduct={showDetailedProduct} />;
          })}
          
        </div>
        
        </div>
      )}
    </div>
  );
};

export default DetailedCart;
