import "./Head.css";
import HeadNavBar from "./HeadNavBar.js";
import { ReactComponent as Logo } from "./BeanLeafLogo.svg";

const Head = ({
  toggleUserAuth,
  updateProductBasket,
  removeItem,
  updateQuantity,
  productBasket,
  products,
  showDetailedProduct,
  setProductBasket,
  CurentUser,
  SearchProducts,
  likeList,
  removeItemFromLikeList, 
  priceRange,
  updateDisplayProducts
}) => {
  const searchProductHandler = (e) =>{
    console.log(e.target.value)
    const name = e.target.value
    console.log(name)
    SearchProducts(name)
  }

  return (
    <header className="head">
      <div className="upper">
        <div className="logo">
          <Logo />
          <b> BeanLeaf</b>
        </div>
        <div className="search">
          <input className="searchInput" placeholder="Поиск" onChange={searchProductHandler}></input>
          <button className="searchButton"> Поиск</button>
        </div>
        <div>
          <button className="contacts">Контакты</button>
        </div>
      </div>
      <HeadNavBar
        toggleUserAuth={toggleUserAuth}
        updateProductBasket={updateProductBasket}
        removeItem={removeItem}
        updateQuantity={updateQuantity}
        productBasket={productBasket}
        products={products}
        showDetailedProduct={showDetailedProduct}
        setProductBasket={setProductBasket}
        CurentUser = {CurentUser}
        likeList = {likeList}
        removeItemFromLikeList = {removeItemFromLikeList}
        priceRange = {priceRange}
        updateDisplayProducts = {updateDisplayProducts}
      />
    </header>
  );
};

export default Head;
