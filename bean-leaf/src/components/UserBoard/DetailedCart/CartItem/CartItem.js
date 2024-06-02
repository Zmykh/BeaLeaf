import React from "react";
import styles from "./CartItem.module.css";

const CartItem = ({
  productBasket,
  item,
  product,
  removeItem,
  updateQuantity,
  showDetailedProduct,
}) => {
  const handleQuantityChange = (event) => {
    let newValue = parseInt(event.target.value);
    if (newValue > 0) {
      updateQuantity(productBasket.id, product.id, newValue);
    } else {
      removeItem(productBasket.id, product.id);
    }
  };

  const increaseQuantity = () => {
    updateQuantity(productBasket.id, product.id, item.quantity + 1);
  };

  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(productBasket.id, product.id, item.quantity - 1);
    } else {
      removeItem(productBasket.id, product.id);
    }
  };

  const handleRemoveClick = () => {
    removeItem(productBasket.id, product.id);
  };
  const showDetailedProductHandler = () => {
    showDetailedProduct(product.id);
  };

  return (
    <div className={styles.CartItem}>
      <img
        src={product.imageUrl[0]}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/images/placeholders/image.png";
        }}
      />
      <div className={styles.itemDetails}>
        <div className={styles.nameAndRemoveButton}>
          <p>{product.name}</p>
          <div className={styles.removeButton} onClick={handleRemoveClick}>
            ✕
          </div>
        </div>

        <div className={styles.quantityAndPrice}>
          <div className={styles.quantityAndCost}>
          <button className={styles.decreaseButton} onClick={decreaseQuantity}>-</button>
            {/* <input
              type="number"
              min="1"
              step="1"
              value={item.quantity}
              onChange={handleQuantityChange}
            /> */}
            <p>{item.quantity}</p>
            <button className={styles.increaseButton} onClick={increaseQuantity}>+</button>
            <p>{(item.quantity * product.price).toFixed(2)} BYN</p>
          </div>
          <button onClick={showDetailedProductHandler}>К товару</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;