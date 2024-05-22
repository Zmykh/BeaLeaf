import "./VerifyRev.css";
import { useState, useEffect } from "react";
import axios from "axios";

const VerRev = ({}) => {
  const [reviews, setReviews] = useState([]);
  const [userData, setUserData] = useState([]);
  const [products, setProducts] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewsResponse, usersResponse, productsResponse] = await Promise.all([
          axios.get('http://localhost:5000/reviews'),
          axios.get('http://localhost:5000/users/'),
          axios.get('http://localhost:5000/products')
        ]);
  
        setReviews(reviewsResponse.data);
        setUserData(usersResponse.data);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  function combineReviewsData(reviews, products, users) {
    return reviews.map(review => {
      const product = products.find(p => p.id === review.productId);
      const user = users.find(u => u.id === review.userId);
  
      return {
        ...review,
        productUrl: product?.imageUrl, 
        userName: user?.name 
      };
    });
  }
  
  useEffect(() => {
    if (reviews.length && userData.length && products.length) {
      const combinedData = combineReviewsData(reviews, products, userData);
      setCombinedData(combinedData);
      setIsLoading(false);
    }
  }, [reviews, userData, products]);
  
  console.log(combinedData);
  
  const VerifyHandler = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:5000/reviews/${id}/verify`);
      // Обновить данные отзывов (например, добавить поле 'verified')
      setReviews(reviews.map(review => 
        review.id === id ? {...review, verified: true} : review
      ));
    } catch (error) {
      console.error("Error verify:", error);
    }
  };
  
  const DeleteHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/reviews/${id}`);
      // Удалить отзыв из списка
      setReviews(reviews.filter(review => review.id !== id));
    } catch (error) {
      console.error("Error delete:", error);
    }
  };
  
  

  
  return (
    <div className="revCon">
      <h1>Новые отзывы</h1>
     
        {/* </table> */}
      <div class="scrollableTable"> 
      {/* <table> */} <table>
        <thead>
          <tr>
            <th>Фото товара</th>
            <th>Имя пользователя</th>
            <th>Отзыв</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {combinedData.map((review) => (
            <tr key={review.id}>
              <td>
                <img src={review.productUrl[0]} alt="Товар" className="prodImg"/>
              </td>
              <td>{review.userName}</td>
              <td>{review.reviewText}</td>
              <td>
                {review.verified ? (<button onClick={() => VerifyHandler(review.id)} disabled>Одобрен</button>):(<button onClick={() => VerifyHandler(review.id)}>Пропустить</button>)}
                
                <button onClick={() => DeleteHandler(review.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};
export default VerRev;
