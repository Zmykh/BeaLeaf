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
      <div className="product-modal">
      <div className="user-card">
      <div className="user-info-grid">
        <div className="user-info-labels">
          <p>Имя:</p>
          <p>Email:</p>
          <p>Телефон:</p>
          <p>Адрес:</p>
          <p>Роль:</p>
          <p>Создан:</p>
          {/* {selectedUser.updatedAt && <p>Обновлен:</p>} */}
        </div>
        <div className="user-info-data">
          <p>{selectedUser.name}</p>
          <p>{selectedUser.email}</p>
          <p>{selectedUser.telNumber}</p>
          <p>{selectedUser.adress}</p>
          <select value={selectedUser.admin ? "admin" : "user"} >
            <option value="user">Пользователь</option>
            <option value="admin">Администратор</option>
          </select>
          <p>{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
          {/* {selectedUser.updatedAt && (
            // <p>{new Date(selectedUser.updatedAt).toLocaleDateString()}</p>
          )} */}
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default UserDetails;
