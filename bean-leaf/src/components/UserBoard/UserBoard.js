import "./UserBoard.css";
import UserMenu from "./UserMenu/UserMenu";
import UserSettings from "./UserSettings/UserSettings";
import React, { useState } from "react";
import DetailedCart from "./DetailedCart/DetailedCart";
import AddProduct from "./AddProduct/AddProduct";
import DetailedList from "./LikeList/DetailedList";
import DetailedProduct from "../DetailedProduct/DetailedProduct";
import VerRev from "./Revierws/VerifyRev";
import CreateOrder from "./DetailedCart/CreateOrder/CreateOrder";
import Orders from "./Orders/Orders";
import Users from "./Users/Users";
import Info from "./Info/Info";
const UserBoard = ({
  CurentUser,
  updateUser,
  productBasket,
  products,
  showDetailedProduct,
  removeItem,
  updateQuantity,
  setProductBasket,
  likeList,
  removeItemFromLikeList,
  hideDetailedProduct,
  addToBasket,
  Reviews,
  createReview,
  GetReviews,
  addToLikeList,
  selectedProduct,
  fetchProducts,
  setCurentUser,
  Guest,
  LogOut, 
}) => {
  const [activeTab, setActiveTab] = useState("Корзина");
  
  const userSet = (activeTab) => {
    return activeTab === "Настройки профиля";
  };

  const userCart = (activeTab) => {
    return activeTab === "Корзина";
  };

  const addProd = (activeTab) => {
    return activeTab === "Добавить товар";
  };

  const likedProducts = (activeTab) => {
    return activeTab === "Список желаемого";
  };
  const reviews = (activeTab) => {
    return activeTab === "Отзывы";
  };
  const orders = (activeTab) =>{
    return activeTab === "Заказы"
  }
  const allUsers = (activeTab) =>{
    return activeTab === "Пользователи"
  }
  const MyOrders = (activeTab) =>{
    return activeTab ==="Мои заказы"
  }
  const info = (activeTab) =>{
    return activeTab ==="Контакты"
  }
  // console.log(allUsers(activeTab))
  console.log(CurentUser)
  return (
    <div className="BoardContainer">
      {selectedProduct ? (
        <DetailedProduct
          product={selectedProduct}
          hideDetailedProduct={hideDetailedProduct}
          addToBasket={addToBasket}
          CurentUser={CurentUser}
          Reviews={Reviews}
          createReview={createReview}
          GetReviews={GetReviews}
          addToLikeList={addToLikeList}
        />
      ) : null}
      <UserMenu
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        CurentUser={CurentUser}
      />
      <div className="WindowContainer">
        {userSet(activeTab) ? (
          <UserSettings CurentUser={CurentUser} updateUser={updateUser} setCurentUser = {setCurentUser}
          Guest = {Guest} LogOut={LogOut}/>
        ) : null}
        {userCart(activeTab) ? (
          <>
            <DetailedCart
              productBasket={productBasket}
              products={products}
              showDetailedProduct={showDetailedProduct}
              removeItem={removeItem}
              updateQuantity={updateQuantity}
              setProductBasket={setProductBasket}
              CurentUser={CurentUser}
            />
            <CreateOrder
              CurentUser={CurentUser}
              productBasket={productBasket}
              products={products}
              setProductBasket = {setProductBasket}
            ></CreateOrder>
          </>
        ) : null}
        {addProd(activeTab) ? (
          <AddProduct fetchProducts={fetchProducts} />
        ) : null}
        {likedProducts(activeTab) ? (
          <DetailedList
            likeList={likeList}
            products={products}
            showDetailedProduct={showDetailedProduct}
            removeItemFromLikeList={removeItemFromLikeList}
          />
        ) : null}
        {reviews(activeTab) ? <VerRev products={products} /> : null}
        {orders(activeTab)? <Orders CurentUser = {CurentUser}  forAdmin = {true}/> : null}
        {MyOrders(activeTab)? <Orders CurentUser = {CurentUser}  forAdmin = {false}/> : null}
        {allUsers(activeTab)? <Users/>: null}
        {info(activeTab)?(<Info/>):null}
      </div>
    </div>
  );
};

export default UserBoard;
