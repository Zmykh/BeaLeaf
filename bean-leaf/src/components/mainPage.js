import "..//App.css";
import Auth from "./Authorization/Auth.js";
import Head from "./Head/Head.js";
import ContentGrid from "./MainContent/ContentGrid.js";
import Regist from "./Registration/Regist.js";
import Foot from "./Foot.js";
import React, { useState, useEffect } from "react";
import UserBoard from "./UserBoard/UserBoard.js";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../redux/hooks.ts";
import { setUser, clearUser } from "../redux/features/user.ts";
const MainPage = () => {
  const user = useAppSelector((state) => state.user);
  console.log(user);
  const [Reviews, setReviews] = useState([]);
  const [CurentUser, setCurentUser] = useState(user);
  const [productsList, setProductsList] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [productBasket, setProductBasket] = useState([]);
  const [showUserAuth, setShowUserAuth] = useState(false);
  const [showAuth, setShowAuth] = useState(true);
  const [showUserBar, setShowUserBar] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [likeList, setLikeList] = useState([]);
  const [priceRange, setPriceRange] =useState({})
  const getOrCreateLikeList = async (userId) => {
    if (userId) {
      try {
        // Попытка получить корзину пользователя
        const response = await axios.get(
          `http://localhost:5000/like-list/${userId}`
        );
        console.log("Найден список желаемого :", response.data);
        setLikeList(response.data);
        return response.data;
      } catch (error) {
        try {
          const newListResponse = await axios.post(
            `http://localhost:5000/like-list/${userId}`
          );
          console.log("Создан новый список жлеаемого :", newListResponse.data);
          setLikeList(newListResponse.data);
          return newListResponse.data;
        } catch (error) {
          console.error("Error getting or creating cart:", error);
          throw error;
        }
      }
    }
  };

  const dispatch = useDispatch();

  async function updateUser(id, updateUserDto) {
    console.log(updateUserDto);
    try {
      const response = await axios.put(
        `http://localhost:5000/users/${id}`,
        updateUserDto
      );
      console.log(response.data);
      setCurentUser(response.data);
      dispatch(setUser(response.data));
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  }
  async function GetfullUser(email) {
    try {
      const response = await axios.get(`http://localhost:5000/users/${email}`);
      setCurentUser(response.data);
      setShowUserBar(!showUserBar);
      dispatch(setUser(response.data));
      return response.data;
    } catch (error) {
      console.error("Error getting user:", error);
      throw error;
    }
  }

  const SearchProducts = async (name) => {
    if (name !== "") {
      const findProducts = async (name) => {
        console.log(name);
        try {
          const response = await axios.get(
            `http://localhost:5000/products/${name}`
          );
          setDisplayProducts(response.data);
        } catch (error) {
          console.error("Error finding products:", error);
        }
      };

      findProducts(name);
    } else {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setDisplayProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
  };
  const updateDisplayProducts = async (sortSettings) => {
    try {
      let updatedProducts = productsList;
  
      if (sortSettings.selectedCategory) {
        updatedProducts = updatedProducts.filter((product) => product.category === sortSettings.selectedCategory);
      }
  
      if (sortSettings.selectedSubcategory) {
        updatedProducts = updatedProducts.filter((product) => product.categorychild === sortSettings.selectedSubcategory);
      }
  
      if (sortSettings.filterRange.min && sortSettings.filterRange.max) {
        updatedProducts = updatedProducts.filter((product) => product.price >= sortSettings.filterRange.min && product.price <= sortSettings.filterRange.max);
      }
  
      if (sortSettings.nameSortMethod === 'A-z') {
        updatedProducts = updatedProducts.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortSettings.nameSortMethod === 'Z-a') {
        updatedProducts = updatedProducts.sort((a, b) => b.name.localeCompare(a.name));
      }
  
      if (sortSettings.priceSortMethod === 'priceUp') {
        updatedProducts = updatedProducts.sort((a, b) => a.price - b.price);
      } else if (sortSettings.priceSortMethod === 'priceDown') {
        updatedProducts = updatedProducts.sort((a, b) => b.price - a.price);
      }
      
      setDisplayProducts(updatedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  useEffect(() => {
    if (CurentUser.id != null) {
      setShowUserAuth(false);
      setShowAuth(true);
      setShowUserBar(true);
    }
    getOrCreateCart(CurentUser.id);
    getOrCreateLikeList(CurentUser.id);
  }, [CurentUser]);
  useEffect(() => {}, [productBasket, likeList]);
  useEffect(() => {
    fetchProducts();
  }, []);
  function findMinMaxPrice(items) {
    const prices = items.map(item => item.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const range = {
      minPrice:minPrice,
      maxPrice:maxPrice
    }
    console.log(range)
    return range;
}
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setDisplayProducts(response.data);
      setProductsList(response.data);
      console.log(response.data)
      setPriceRange(findMinMaxPrice(response.data)) // Используйте setPriceRange здесь
      console.log(priceRange)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const addToLikeList = async (userId, itemId) => {
    const list = await getOrCreateLikeList(userId);
    if (list) {
      const items = { productId: itemId };
      try {
        const response = await axios.put(
          `http://localhost:5000/like-list/${list.id}/addItem`,
          {
            items: items,
          }
        );
        console.log("Response data:", response.data);

        setLikeList(response.data);
        console.log("Updated like list:", likeList);
      } catch (error) {
        console.error("Error adding to like list:", error);
      }
    }
  };
  const removeItemFromLikeList = async (listId, itemId) => {
    console.log("id: ", itemId);
    try {
      const response = await axios.delete(
        `http://localhost:5000/like-list/remove/${listId}/${itemId}`
      );
      setLikeList(response.data);
    } catch (error) {
      console.error("Error removing item from basket:", error);
      // Обработка ошибки
    }
  };
  const showDetailedProduct = (productId) => {
    const product = productsList.find((product) => product.id === productId);
    GetReviews(productId);
    setSelectedProduct(product);
  };
  const hideDetailedProduct = () => {
    setSelectedProduct(null);
  };
  // Функции для управления корзиной
  const addToBasket = async (id, inputQuanity, userId) => {
    const cart = await getOrCreateCart(userId);
    if (cart) {
      const items = [{ productId: id, quantity: inputQuanity }];
      try {
        const response = await axios.post(
          "http://localhost:5000/carts/addItem",
          {
            cartId: cart.id,
            items: items,
          }
        );
        setProductBasket(response.data);
        console.log("работает добавление", productBasket.items);
      } catch (error) {
        console.error("Error adding to basket:", error);
        // Обработка ошибки, например, показ сообщения для пользователя
      }
    }
  };

  const removeItem = async (cartId, itemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/carts/${cartId}/item/${itemId}`
      );
      setProductBasket(response.data);
    } catch (error) {
      console.error("Error removing item from basket:", error);
      // Обработка ошибки
    }
  };
  const createReview = async (
    userId,
    productId,
    reviewText,
    rating,
    verified
  ) => {
    try {
      const response = await axios.post("http://localhost:5000/reviews", {
        userId,
        productId,
        reviewText,
        rating,
        verified,
      });
      console.log("Review created:", response.data);
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  const getOrCreateCart = async (userId) => {
    if (userId) {
      try {
        // Попытка получить корзину пользователя
        const response = await axios.get(
          `http://localhost:5000/carts/getByUserId/${userId}`
        );
        console.log("Найдена корзина :", response.data);
        setProductBasket(response.data);
        return response.data;
      } catch (error) {
        try {
          const newCartResponse = await axios.post(
            "http://localhost:5000/carts/",
            {
              userId: userId,
            }
          );
          console.log("Создана новая корзина :", newCartResponse.data);
          setProductBasket(newCartResponse.data);
          return newCartResponse.data;
        } catch (error) {
          console.error("Error getting or creating cart:", error);
          throw error;
        }
      }
    }
  };

  const updateQuantity = async (cartId, productId, quantity) => {
    const items = [{ productId: productId, quantity: quantity }];
    try {
      const response = await axios.post("http://localhost:5000/carts/editQnt", {
        cartId: cartId,
        items: items,
      });
      setProductBasket(response.data);
      console.log("работает изменение", productBasket.items);
    } catch (error) {
      console.error("Error adding to basket:", error);
    }
  };

  // Остальные функции

  const toggleUserAuth = () => {
    setShowUserAuth(!showUserAuth);
  };

  const toggleAuth = () => {
    setShowAuth(!showAuth);
  };

  const handleResponse = (UserData) => {
    const decoded = jwtDecode(UserData.token);
    setShowUserAuth(!showUserAuth);
    console.log(GetfullUser(decoded.email));
  };
  const GetReviews = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/reviews/product/${productId}`
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error: ", error);
      throw error;
    }
  };
  const LogOut = () => {
    dispatch(clearUser())
    setShowUserAuth(false);
    setShowAuth(true);
    setShowUserBar(false);
  };
  return (
    <div className="App">
      <Head
        toggleUserAuth={toggleUserAuth}
        removeItem={removeItem}
        updateQuantity={updateQuantity}
        productBasket={productBasket}
        products={productsList}
        showDetailedProduct={showDetailedProduct}
        setProductBasket={setProductBasket}
        CurentUser={CurentUser}
        SearchProducts={SearchProducts}
        likeList={likeList}
        removeItemFromLikeList={removeItemFromLikeList} 
        priceRange = {priceRange}
        updateDisplayProducts = {updateDisplayProducts}
      />

      {showUserAuth ? (
        showAuth ? (
          showUserBar ? (
            <UserBoard
              CurentUser={CurentUser}
              updateUser={updateUser}
              productBasket={productBasket}
              products={productsList}
              showDetailedProduct={showDetailedProduct}
              removeItem={removeItem}
              updateQuantity={updateQuantity}
              setProductBasket={setProductBasket}
              likeList={likeList}
              removeItemFromLikeList={removeItemFromLikeList}
              hideDetailedProduct={hideDetailedProduct}
              addToBasket={addToBasket}
              Reviews={Reviews}
              createReview={createReview}
              GetReviews={GetReviews}
              addToLikeList={addToLikeList}
              selectedProduct={selectedProduct}
              fetchProducts={fetchProducts}
              LogOut={LogOut}
            />
          ) : (
            <Auth
              toggleReg={toggleAuth}
              onResponseReceived={handleResponse}
              getOrCreateCart={getOrCreateCart}
            />
          )
        ) : (
          <Regist
            toggleAuth={toggleAuth}
            onResponseReceived={handleResponse}
            getOrCreateCart={getOrCreateCart}
          />
        )
      ) : (
        <ContentGrid
          products={displayProducts}
          addToBasket={addToBasket}
          showDetailedProduct={showDetailedProduct}
          hideDetailedProduct={hideDetailedProduct}
          selectedProduct={selectedProduct}
          CurentUser={CurentUser}
          Reviews={Reviews}
          createReview={createReview}
          GetReviews={GetReviews}
          addToLikeList={addToLikeList}
          likeList={likeList}
          fetchProducts={fetchProducts}
          removeItemFromLikeList={removeItemFromLikeList}
        />
      )}

      <Foot />
    </div>
  );
};

export default MainPage;
