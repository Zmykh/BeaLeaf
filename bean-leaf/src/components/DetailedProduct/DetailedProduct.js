import React, { useState, useEffect } from "react";
import Review from "./Review/Review";
import EditProduct from "./EditProduct/EditProduct";
import styles from "./DetailedProduct.module.css";
import ImageSlider from "./ImageSlider";

const DetailedProduct = ({
  product,
  hideDetailedProduct,
  addToBasket,
  CurentUser,
  Reviews,
  createReview,
  GetReviews,
  fetchProducts,
  addToLikeList,
  removeItemFromLikeList,
  likeList,
}) => {
  const [count, setCount] = useState(1);
  const [openEdidMenu, setOpenEdidMenu] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const openEditMenuHandler = () => {
    setOpenEdidMenu(!openEdidMenu);
  };

  useEffect(() => {
    setIsFavourite(
      likeList.items.some((item) => item.productId === product.id)
    );
    GetReviews(product.id);
    Reviews = Reviews.filter((review) => review.verified === false);

    const avail = product.availability;
    if (avail <= 0) {
      setIsDisabled(true);
      setAvailabilityStatus("Нет в наличии");
    } else if (avail <= 5) {
      setAvailabilityStatus("Заканчивается");
    } else {
      setAvailabilityStatus("В наличии");
    }
  }, [likeList, product.id]);

  const handleAddToCart = () => {
    if (!isDisabled) addToBasket(product.id, count, CurentUser.id);
  };

  const handleToggleFavourites = () => {
    if (isFavourite) {
      removeItemFromLikeList(likeList.id, product.id);
    } else {
      addToLikeList(CurentUser.id, product.id);
    }
  };

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increaseCount = () => {
    if (count < product.availability) {
      setCount(count + 1);
    }
  };

  const handleReviewChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    createReview(CurentUser.id, product.id, reviewText, 0, false);
    setReviewText("");
  };

  return (
    <div>
      <div
        className={styles.productModalBackground}
        onClick={hideDetailedProduct}
      />
      <div className={styles.productModal}>
        {openEdidMenu ? (
          <EditProduct edproduct={product} fetchProducts={fetchProducts} />
        ) : (
          <>
            <div className={styles.detailedProductContainer}>
              <div className={styles.productImageContainer}>
                <ImageSlider images={product.imageUrl} />
              </div>
              <div className={styles.productInfoContainer}>
                <h1>{product.name}</h1>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ flex: 1 }}>
                    <p className={styles.priceDetail}>{product.price} BYN </p>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p className={styles.priceDetail}>{availabilityStatus}</p>
                  </div>
                </div>
                <p className={styles.countryDetail}>
                  Страна производства:{" "}
                  <span className={styles.dataDetail}>{product.country}</span>
                </p>
                <p className={styles.descriptionDetail}>
                  {product.description}
                </p>
                <p>{availabilityStatus}</p>
                <div className={styles.cartActions}>
                  <div className={styles.qnt}>
                    <button
                      disabled={isDisabled}
                      onClick={decreaseCount}
                      className={styles.quantityButton}
                    >
                      -
                    </button>
                    <span className={styles.quantityDisplay}>{count}</span>
                    <button
                      disabled={isDisabled}
                      onClick={increaseCount}
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>
                  <button
                    disabled={isDisabled}
                    onClick={handleAddToCart}
                    className={
                      isDisabled
                        ? styles.addButtonDisabled
                        : styles.addToCartButton
                    }
                  >
                    В корзину
                  </button>
                  <button
                    onClick={handleToggleFavourites}
                    className={`${styles.favouriteButton} ${
                      isFavourite ? styles.favouriteButtonActive : ""
                    }`}
                  >
                    ♡
                  </button>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ flex: 1 }}>
                  <p className={styles.countryDetail}>
                  Категория:{" "}
                  <span className={styles.dataDetail}>
                    {product.category} {product.categorychild}
                  </span>{" "}
                </p>
                  </div>
                  <div style={{ flex: 1 }}>
                  <p className={styles.countryDetail}>
                  Вес:{" "}
                  <span className={styles.dataDetail}>{product.quantity} гр</span> 
                </p>
                  </div>
                </div>
                
              </div>
            </div>
            <div>
              <form onSubmit={handleReviewSubmit} className={styles.reviewForm}>
                <textarea
                  placeholder="Напишите ваш отзыв здесь..."
                  onChange={handleReviewChange}
                  value={reviewText}
                />
                <button type="submit" className ={styles.sendRev}>Отправить отзыв</button>
              </form>
            </div>
            <div className={styles.reviews}>
              <h3>Отзывы</h3>
              {Reviews.map((review, index) => (
                <Review key={index} review={review} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailedProduct;
