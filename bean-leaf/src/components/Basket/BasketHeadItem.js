import "./BasketHeadItem.css"
const BasketHeadItem = ({productBasket, removeItem, updateQuantity, item, product, showDetailedProduct}) => {
    
    const handleQuantityChange = (event) => {
        if(event.target.value>0){ 
        updateQuantity(productBasket.id ,product.id, event.target.value)
        }
        else{
            removeItem(productBasket.id ,product.id)
        }
    };

    const handleRemoveClick = () => {
        removeItem(productBasket.id ,product.id);
    };
    const showDetailedProductHandler = (event) =>{
        showDetailedProduct(product.id)}
    
    return(
        <div className="BasketItem">
            <img src={product.imageUrl[0]}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 
          '/images/placeholders/image.png'
          ;
        }}></img>
            <div className="itemDetails">
                <p>{product.name}</p>
                <div className="quantityAndPrice">
                    <input type="number" step={1} value={item.quantity} onChange={handleQuantityChange}></input>
                    <p>{item.quantity*product.price} BYN</p>
                    <button onClick={showDetailedProductHandler}>К товару</button>
                </div>
            </div>
            <div className="removeButton" onClick={handleRemoveClick}>
                ✕
            </div>
        </div>
    )
}
export default BasketHeadItem
