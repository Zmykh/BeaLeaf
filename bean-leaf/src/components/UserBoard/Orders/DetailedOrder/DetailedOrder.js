import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DetailedOrder.css";

const DetailedOrder = ({ selectedOrder, hideDetailedOrder, fetchOrders, forAdmin }) => {
  const [status, setStatus] = useState(selectedOrder.status);
  const [detailedItems, setDetailedItems] = useState([]);
  const [userName, setUserName] = useState();
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    console.log(e.target.value);
    console.log(status);
  };
  const fetchUserName = async () => {
    try {
      const users = await axios.get("http://localhost:5000/users/");
      console.log("ABOBA", users);
      const user = users.data.find((user) => user.id === selectedOrder.userId);
      console.log("User", user);
      setUserName(user.name);
    } catch (error) {
      console.log("Err fetching userName", error);
    }
  };
  const fetchOrderItems = async (items) => {
    try {
      // 1. Получить данные о всех продуктах
      const response = await axios.get("http://localhost:5000/products");
      const productsData = response.data;
      // 2. Создать массив с информацией о товарах заказа
      const orderProductsList = items.map((item) => {
        // Найти соответствующий продукт по id
        const product = productsData.find((p) => p.id === item.productId);
        // Вернуть объект с информацией о продукте и количестве
        return { ...product, quantityInOrder: item.quantity };
      });

      return orderProductsList;
    } catch (error) {
      console.log("Error fetching items", error);
      return []; // Вернуть пустой массив в случае ошибки
    }
  };

  useEffect(() => {
    if (selectedOrder.items.length) {
      fetchOrderItems(selectedOrder.items).then((detailedItems) => {
        setDetailedItems(detailedItems);
      });
    }
    fetchUserName();
  }, [selectedOrder.items]);
  const dateString = selectedOrder.deliveryDate.slice(0, 10); // Извлекаем дату: "2024-04-17"
const timeString = selectedOrder.deliveryTime; // Время: "02:58:00"
  const date = new Date(dateString + "T" + timeString); // Создаем объект Date

  const options = {
    weekday: "long", // День недели (например, "Понедельник")
    year: "numeric", // Год (например, "2023")
    month: "long", // Месяц (например, "Декабрь")
    day: "numeric", // День месяца (например, "15")
    hour: "numeric", // Часы (например, "14")
    minute: "numeric", // Минуты (например, "30")
  };

  const formattedDate = date.toLocaleDateString("ru-RU", options); // Форматируем дату на русском языке
  console.log(formattedDate); // Вывод: "Понедельник, 15 декабря 2023 г., 14:30"

  //   console.log(detailedItems);
  const statusOptions = [
    "Обрабатывается",
    "Сборка",
    "Готов к отправке",
    "В Пути",
    "Доставлено",
  ];
  const changeOrderStatus = async () => {
    const statusObj = {
      status: status,
    };
    console.log(statusObj);
    try {
      const response = await axios.patch(
        `http://localhost:5000/order/${selectedOrder.id}/status`,
        statusObj
      );
      fetchOrders();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(selectedOrder);
  return (
    <div>
      <div className="order-modal-background" onClick={hideDetailedOrder}></div>
      <div className="order-modal">
        <div className="order">
          <div className="order-items">
            <div className="scrollableTable">
              <table>
                <thead>
                  <tr>
                    <th>Товар</th>
                    <th>Название</th>
                    <th>Цена</th>
                    <th>количество</th>
                  </tr>
                </thead>
                <tbody>
                  {detailedItems.map((item) => (
                    <tr>
                      <td>
                        <img
                          src={item.imageUrl[0]}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "BeanLeaf/bean-leaf/public/images/placeholders/image.png";
                          }}
                          className="item-img"
                        />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.quantityInOrder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="order-info">
            <h2>Заказ № {selectedOrder.id}</h2>
            <p>Клиент: {userName}</p>
            <p>Контакт: {selectedOrder.contact}</p>
            <p>Адрес: {selectedOrder.address}</p>
            <p>
              Дата доставки: {formattedDate}
            </p>

            <p>Сумма: {selectedOrder.total}</p>
            {forAdmin? (
            <p>Статус: 
            <select value={status} onChange={handleStatusChange}>
  {statusOptions.map((option, index) => (
    <option key={option} value={option} disabled={index < statusOptions.indexOf(status)}>
      {option}
    </option>
  ))}
</select>

            <button onClick={changeOrderStatus}>Изменить Статус</button></p>):(<p>Статус: {status}</p>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedOrder;
