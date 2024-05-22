import "./BasketHead.css";
import BasketHeadItem from "./BasketHeadItem";

const BasketHead = ({ removeItem, updateQuantity, productBasket, products, showDetailedProduct, setProductBasket}) => {
  const itemsIn = productBasket.items
  const totalPrice = itemsIn.reduce((total, item) => {
    const product = products.find((product) => product.id === item.productId);
    return total + (item.quantity * product.price);
  }, 0);
  console.log(products)
  console.log(itemsIn)
  return (
    <div className="BasketHeadContainer">
        
      {itemsIn.length > 0 ? (
        <>    <p>Корзина</p>
        
          {itemsIn.map((item) => {
            const product = products.find((product) => product.id === item.productId);
            return  <BasketHeadItem productBasket = {productBasket} item={item} product={product} removeItem={removeItem} 
            updateQuantity={updateQuantity} showDetailedProduct={showDetailedProduct} setProductBasket = {setProductBasket}/>;
          })}
          <div className="basketFooter">
          <div className="totalPrice">Итого: {totalPrice} BYN</div>
          <button>Оплатить</button>
          </div>
        </>
      ) : (
        <p>Ваша корзина пуста</p>
      )}
    </div>
  );
};

export default BasketHead;
