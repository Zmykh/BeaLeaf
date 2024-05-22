import React, { useState } from 'react';
import axios from "axios";
import "./Auth.css";

const Auth = ({ toggleReg, onResponseReceived }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // новое состояние для сообщения об ошибке

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            email: email,
            password: password
        };

        // Отправляем данные на сервер
        axios.post('http://localhost:5000/auth/login', data)
            .then((response) => {

                onResponseReceived(response.data); 
            })
            .catch((error) => {
                // Обработка ошибки
                if (error.response && error.response.status === 401) {
                    setErrorMessage("Неправильный логин или пароль"); // установка сообщения об ошибке
                } else {
                    setErrorMessage("Произошла ошибка");
                }
            });
    };

    return (
        <div className="AuthContainer">
            <form onSubmit={handleSubmit}>
                <h2 className='labels'>Вход</h2>
                <input type="email" placeholder="Email" value={email} onChange={handleEmailChange}></input>
                <input type="password" placeholder="Пароль" value={password} onChange={handlePasswordChange}></input>
                <button type="submit">Войти</button>
                {errorMessage && <p className="error">{errorMessage}</p>} {/* отображение сообщения об ошибке */}
                <p className='labels' onClick={toggleReg}>или <b>Зарегистрироваться</b></p>
            </form>
        </div>
    );
};

export default Auth;
