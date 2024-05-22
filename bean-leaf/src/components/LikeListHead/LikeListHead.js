import LikeListItem from "./LikeListHeadItem";
import "./LikeListHead.css"

const LikeListHead = ({ likeList, products, showDetailedProduct,removeItemFromLikeList}) => {

   
    const itemsIn = likeList.items;
    console.log(products);
    console.log(itemsIn);
  
    return (
      <div className="BasketHeadContainer">        
        {itemsIn.length > 0 ? (
          <>
            <p>Избранное</p>
            {
            itemsIn.map((item) => {
              const product = products.find((product) => product.id === item.productId);
              return (
                <LikeListItem
                  likeList={likeList}
                  product={product}
                  showDetailedProduct={showDetailedProduct}
                  removeItemFromLikeList ={removeItemFromLikeList}
                />
              );
            })
            
            }
          </>
        ) : (
          <p>Ваш список пуст</p>
        )}
      </div>
    );
};

export default LikeListHead;
