import React from "react";
import styles from "./info.module.css";
import { Map, YMaps } from "@pbe/react-yandex-maps";

const Info = () => {
  return (
    <div className={styles.infoContaier}>
      <div className={styles.developerInfo}>
        <h2>Контактная информация:</h2>
        <p><strong>Разработал: </strong> Житков Дмитрий 53ТП</p>
        <p><strong>Номер телефона:</strong> +375 (33) 123-12-12 </p>
        <p><strong>Email:</strong> someemail@gmail.com</p>
        <p><strong>Дополнительная информация:</strong> Любые дополнительные сведения, которые вы хотите добавить.</p>
      </div>
      <div>
        <YMaps>
            <Map
            defaultState={{ center: [53.912, 27.5486], zoom: 9 }}
            width="600px"
            height="500px"
            />
        </YMaps>
      </div>
    </div>
  );
};

export default Info;