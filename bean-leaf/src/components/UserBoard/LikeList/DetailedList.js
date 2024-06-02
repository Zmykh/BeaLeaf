import React from "react";
import "./DetailedList.css";
import ListItem from "./ListItem/ListItem";


const DetailedList = ({
  likeList,
  products,
  showDetailedProduct, 
  removeItemFromLikeList
}) => {
  const itemsIn = likeList.items;

  return (
    <div className="list-container">
      <h2>Список избранных товаров</h2>
      {itemsIn.length === 0 ? (
        <h2>Тут пока ничего</h2>
      ) : (
        <div>
        <div className="items-row">
          {itemsIn.map((item) => {
            const product = products.find((product) => product.id === item.productId);
            return  <ListItem likeList = {likeList} item={item} product={product} 
             showDetailedProduct={showDetailedProduct} removeItemFromLikeList={removeItemFromLikeList}/>;
          })}  
        </div>
        </div>
      )}
    </div>
  );
};

export default DetailedList;
