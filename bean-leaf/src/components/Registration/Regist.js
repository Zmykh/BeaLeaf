import React, { useState } from 'react';
import axios from "axios";
import "./Regist.css";

const Regist = ({ toggleAuth, onResponseReceived }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Пароли не совпадают");
            return;
        } else{
        const data = {
            email: email,
            password: password
        };

        // Отправляем данные на сервер
        axios.post('http://localhost:5000/auth/registration', data)
            .then((response) => {
                onResponseReceived(response.data); 
            })
            .catch((error) => {
                // Обработка ошибки
                alert(error);
            });
        }
        };

    return (
        <div className="AuthContainer">
            <form onSubmit={handleSubmit}>
                <h2>Регистрация</h2>
                <input type="email" placeholder="Email" value={email} onChange={handleEmailChange}></input>
                <input type="password" placeholder="Пароль" value={password} onChange={handlePasswordChange} minLength={6}></input>
                <input type="password" placeholder="Повторите пароль" value={confirmPassword} onChange={handleConfirmPasswordChange} minLength={6}></input>
                <button type="submit">Зарегистрироваться</button>
                <p className='labels' onClick={toggleAuth}>или <b>Войти в аккаунт</b></p>
            </form>
        </div>
    );
};

export default Regist;
