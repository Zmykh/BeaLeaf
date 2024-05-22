import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Review.css";

const Review = (props) => {
  const [userData, setUserData] = useState(null);
  console.log(props)
  useEffect(() => {
    if (!userData) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/users/byId/${props.review.userId}`);
          console.log(response.data.name)
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }

      fetchUserData();
    }
  }, [props.review.userId, userData]); // Зависимости для запуска эффекта

  return (
    <div className="review-container">
      <div className="user-info">
        <b><p>{userData ? userData.name : 'Loading...'}</p></b>
      </div>
      <div className="review-text">
        <p>{props.review.reviewText}</p>
      </div>
    </div>
  );
};

export default Review;
