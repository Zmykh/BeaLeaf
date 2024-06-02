import React, { useState, useEffect, useRef } from "react";
import "./CreateOrder.css";
import axios from "axios";
import ValidationTooltip from "../../../ModalMessage/ModalMessage";
import InputMask from "react-input-mask";
function CreateOrder({
  CurentUser,
  productBasket,
  products,
  setProductBasket,
}) {
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("00:00");
  const [deliveryAddress, setDeliveryAddress] = useState(
    CurentUser.adress || ""
  );
  const [deliveryContact, setDeliveryContact] = useState(
    CurentUser.telNumber || ""
  );
  const [oddAddr, setOddAddr] = useState(false);
  const [oddContact, setOddContact] = useState(false);
  const [customAddress, setCustomAddress] = useState(false);
  const [customContact, setCustomContact] = useState(false);
  const [isDateValid, setIsDateValid] = useState(true);
  const [isDateEmpty, setIsDateEmpty] = useState(true);
  const [orderSuccessful, setOrderSuccessful] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(true);

  const addressInputRef = useRef(null);
  const contactInputRef = useRef(null);
  const dateInputRef = useRef(null);

  const CheckUserInfo = (user) => {
    setOddAddr(user.adress === null || user.adress === "");
    setOddContact(user.telNumber === null || user.telNumber === "");
  };

  useEffect(() => {
    CheckUserInfo(CurentUser);
  }, [CurentUser]);

  const itemsIn = productBasket.items;
  const totalPrice = itemsIn.reduce((total, item) => {
    const product = products.find((product) => product.id === item.productId);
    return total + item.quantity * product.price;
  }, 0);

  const handleDateChange = (e) => {
    setDeliveryDate(e.target.value);
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setIsDateEmpty(false);
    setIsDateValid(selectedDate >= today);
  };

  // const handleTimeChange = (e) => { //обрабатывает изменения времени доставки
  //   setDeliveryTime(e.target.value);
  // }
  const handleTimeChange = (value) => {
    //обрабатывает изменения времени доставки
    setDeliveryTime(value);
  };

  const handleAddressChange = (e) => {
    let value = e.target.value;
    setDeliveryAddress(value);
    let isAddressEmpty = value === "";
    if (customAddress) setOddAddr(isAddressEmpty);
    if (isAddressEmpty) setShowValidation(true);
    setCustomAddress(value === "other");
  };

  const handleContactChange = (e) => {
    let value = e.target.value;
    setDeliveryContact(value);
    const isPhoneNumberValid = (num) => {
      const pattern = /^(\+375)(29|44|33|25)(\d{3})(\d{2})(\d{2})$/;
      return pattern.test(num);
    };
    setIsPhoneValid(isPhoneNumberValid(deliveryContact));
    let isContactEmpty = value === "";
    if (customContact) setOddContact(isContactEmpty);
    if (isContactEmpty) setShowValidation(true);
    if (customContact == false) {
      setCustomContact(value === "other");
    }
  };

  const handlePlaceOrder = async () => {
    if (
      (oddAddr && deliveryAddress === "") ||
      (oddContact && deliveryContact === "") ||
      !isDateValid
    ) {
      setShowValidation(true);
      return;
    }

    const orderData = {
      userId: CurentUser.id,
      items: itemsIn,
      total: totalPrice.toFixed(2),
      status: "Обрабатывается",
      address: deliveryAddress,
      contact: deliveryContact,
      deliveryDate: deliveryDate,
      deliveryTime: deliveryTime,
    };
    console.log(orderData);
    try {
      const response = await axios.post(
        "http://localhost:5000/order",
        orderData
      );
      console.log("Заказ успешно создан:", response.data);
      await axios.delete(`http://localhost:5000/carts/${productBasket.id}`);
      const newCart = await axios.get(
        `http://localhost:5000/carts/getByUserId/${CurentUser.id}`
      );
      console.log("Новая корзина:", newCart.data);
      setProductBasket(newCart.data);
      setOrderSuccessful(true);
      setTimeout(() => {
        setOrderSuccessful(false);
      }, 3000);
    } catch (error) {
      console.error("Ошибка при создании заказа:", error);
    }
  };

  
  const hours = Array.from({length: 13}, (_, i) => String(i + 8).padStart(2, '0'));
  const minutes = ["00", "20", "40"];
  
  const handleHoursChange = (event) => {
    const [_, oldMinutes] = deliveryTime.split(":");
    setDeliveryTime(`${event.target.value}:${oldMinutes}`);
  };
  
  const handleMinutesChange = (event) => {
    const [oldHours, _] = deliveryTime.split(":");
    setDeliveryTime(`${oldHours}:${event.target.value}`);
  };
  return (
    <div className="order-component">
      <div className="order-details">
        <h2>Заказать</h2>

        <div className="date-time-section">
          <label htmlFor="order-address">Адресс:</label>
          {!customAddress ? (
            <select
              id="order-address"
              value={deliveryAddress}
              onChange={handleAddressChange}
            >
              <option value={CurentUser.adress}>{CurentUser.adress}</option>
              <option value="other">Другой</option>
            </select>
          ) : (
            <>
              <input
                onChange={handleAddressChange}
                type="text"
                required
                ref={addressInputRef}
              />
              <ValidationTooltip
                message="Введите адрес доставки."
                isActive={deliveryAddress === "" || deliveryAddress === "other"}
                targetElement={addressInputRef}
                position="right"
              />
            </>
          )}

          <label htmlFor="order-contact">Контакты:</label>
          {!customContact ? (
            <select
              id="order-contact"
              value={deliveryContact}
              onChange={handleContactChange}
            >
              <option value={CurentUser.telNumber}>
                {CurentUser.telNumber}
              </option>
              <option value="other">Другой</option>
            </select>
          ) : (
            <>
              <InputMask
                mask="+375 (99) 999-99-99"
                placeholder="+375 (__) ___-__-__"
                onChange={handleContactChange}
                type="text"
                required
                ref={contactInputRef}
              ></InputMask>
              {/* <input
                onChange={handleContactChange}
                type="text"
                required
                ref={contactInputRef}
              /> */}
              <ValidationTooltip
                message="Введите контактный телефон."
                isActive={deliveryContact === "" || deliveryContact === "other"}
              />
              <ValidationTooltip
                message="Номер телефона не соответствует формату."
                isActive={isPhoneValid}
                targetElement={contactInputRef}
                position="bottom"
              />
            </>
          )}

          <label htmlFor="delivery-date">Дата доставки:</label>
          <input
            type="date"
            id="delivery-date"
            value={deliveryDate}
            onChange={handleDateChange}
            ref={dateInputRef}
          />
          <ValidationTooltip
            message="Выберите дату не раньше сегодняшней."
            isActive={!isDateValid}
            position="right"
          />
          <ValidationTooltip
            message="Выберите дату."
            isActive={isDateEmpty}
            position="right"
          />

          <label htmlFor="delivery-time">Время доставки:</label>
          <div>
          <select value={deliveryTime.split(":")[0]} onChange={handleHoursChange}>
        {hours.map((hour, index) => (
          <option key={index} value={hour}>
            {hour}
          </option>
        ))}
      </select>
      <span>:</span>
      <select value={deliveryTime.split(":")[1]} onChange={handleMinutesChange}>
        {minutes.map((minute, index) => (
          <option key={index} value={minute}>
            {minute}
          </option>
        ))}
      </select>
      </div>
        </div>

        <p>Общая стоимость: {totalPrice.toFixed(2)} BYN</p>
        <button onClick={handlePlaceOrder} className="place-order-button">
          Оформить заказ
        </button>
        {orderSuccessful && (
          <div className="success-message">Заказ успешно оформлен!</div>
        )}
      </div>
    </div>
  );
}

export default CreateOrder;
