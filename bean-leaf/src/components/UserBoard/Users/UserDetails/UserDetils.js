import React, { useState, useEffect } from "react";
// import Review from "./Review/Review";
import "./UserDetails.css";
// import EditProduct from "./EditProduct/EditProduct";

const UserDetails= ({selectedUser, hideDetailedUser})=>{
 console.log(selectedUser)
  return (
    <div>
      <div
        onClick={hideDetailedUser}
        className="product-modal-background"
      ></div>
      <div className="user-modal">
      <div className="user-card">
      <div className="user-info-grid">
        <div className="user-info-labels">
          <p>Имя:</p>
          <p>Email:</p>
          <p>Телефон:</p>
          <p>Адрес:</p>
          <p>Роль:</p>
          <p>Создан:</p>
         
        </div>
        <div className="user-info-data">
          <p>{selectedUser.name}</p>
          <p>{selectedUser.email}</p>
          <p>{selectedUser.telNumber}</p>
          <p>{selectedUser.adress}</p>
          {selectedUser.admin ? (<p>Администратор</p>):(<p>Пользователь</p>)}
          <p>{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default UserDetails;
