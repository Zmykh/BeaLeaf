import React, { useState, useEffect } from 'react';
import ValidationTooltip from '../../ModalMessage/ModalMessage';
import InputMask from 'react-input-mask';
import "./UserSettings.css"

const UserSettings = ({CurentUser, updateUser, LogOut}) => {

  const [formData, setFormData] = useState({
    email: CurentUser.email,
    password: CurentUser.password,
    name: CurentUser.name,
    adress: CurentUser.adress,
    telNumber: CurentUser.telNumber
  });

  const [isPhoneValid, setPhoneValidity] = useState(false);

  useEffect(() => {
    // Detect if phone number is valid during initialization and updates
    setPhoneValidity(/^\+375 \((29|25|44|33)\) \d{3}-\d{2}-\d{2}$/.test(formData.telNumber || ''));
    console.log(isPhoneValid)
    console.log(formData.telNumber)
  }, [formData.telNumber]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isPhoneValid) { 
      return; 
    }

    updateUser(CurentUser.id, formData);
  };

  const handleLogOut = () =>{
    LogOut();
  }

  return (
    <form onSubmit={handleSubmit} className='user-edit'>
      <h1>Ваши данные</h1>
      <div>
        <label>Имя пользователя:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label>Адрес доставки:</label>
        <input type="text" name="adress" value={formData.adress} onChange={handleChange} />
      </div>
      <div>
        <label>Номер телефона:</label>
     
        <InputMask mask="+375 (99) 999-99-99" placeholder="+375 (__) ___-__-__" type="text" name="telNumber" value={formData.telNumber} onChange={handleChange}>
            </InputMask>
        <ValidationTooltip message="Номер телефона введен неверно" isActive = {!isPhoneValid}/>
      </div>
      <button type="submit">Применить изменения</button>
      <button onClick={handleLogOut}>Выйти из учетной записи</button>
    </form>
  );
};

export default UserSettings;