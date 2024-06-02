import React, { useState } from "react";
import "./UserMenu.css";
const UserMenu = ({ activeTab, setActiveTab, CurentUser }) => {
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  const isAdmin = (CurentUser) => { 
    let admin = false; 
    // console.log(CurentUser.admin)
    if (CurentUser.admin){
    return CurentUser.admin;}
  }
  
  return (
    <div>
      <div className="navigation-tabs">
        <div className="nav">Навигация</div>
        {/* <div
          className={activeTab === "Главная" ? "active" : ""}
          onClick={() => handleTabClick("Главная")}
        >
          Главная
        </div> */}
        <div
          className={activeTab === "Корзина" ? "active" : ""}
          onClick={() => handleTabClick("Корзина")}
        >
          Корзина
        </div>
        <div
          className={activeTab === "Мои заказы" ? "active" : ""}
          onClick={() => handleTabClick("Мои заказы")}
        >
          Мои заказы
        </div>
        <div
          className={activeTab === "Список желаемого" ? "active" : ""}
          onClick={() => handleTabClick("Список желаемого")}
        >
          Избранные товары
        </div>
        <div
          className={activeTab === "Настройки профиля" ? "active" : ""}
          onClick={() => handleTabClick("Настройки профиля")}
        >
          Настройки профиля
        </div>
        {isAdmin(CurentUser) ? (
          <>
          <div
            className={activeTab === "Добавить товар" ? "active" : ""}
            onClick={() => handleTabClick("Добавить товар")}
          >
            Добавить товар
          </div>
          <div
            className={activeTab === "Отзывы" ? "active" : ""}
            onClick={() => handleTabClick("Отзывы")}
          >
            Отзывы
          </div>
          <div
            className={activeTab === "Пользователи" ? "active" : ""}
            onClick={() => handleTabClick("Пользователи")}
          >
            Пользователи
          </div>
          <div
            className={activeTab === "Заказы" ? "active" : ""}
            onClick={() => handleTabClick("Заказы")}
          >
            Заказы
          </div>
          </>
        ) : null}
        <div
          className={activeTab === "Контакты" ? "active" : ""}
          onClick={() => handleTabClick("Контакты")}
        >
          Контакты
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
