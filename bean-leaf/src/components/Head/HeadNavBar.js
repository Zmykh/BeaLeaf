  import styles from "./HeadNavBar.module.css";
  import React, { useState } from "react";
  import BasketHead from "../Basket/BasketHead";
  import LikeListHead from "../LikeListHead/LikeListHead";
  import MultiRangeSlider from "./Slider";
  const HeadNavBar = ({
    toggleUserAuth,
    updateProductBasket,
    removeItem,
    updateQuantity,
    productBasket,
    products,
    showDetailedProduct,
    setProductBasket,
    CurentUser,
    likeList,
    removeItemFromLikeList,
    priceRange,
    updateDisplayProducts,
  }) => {
    const [showUserCart, setShowCart] = useState(false);
    const [showLikeList, setShowList] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [filterRange, setFilterRange] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [priceSortMethod, setPriceSortMethod] = useState("default");
    const [nameSortMethod, setNameSortMethod] = useState("default");
    const [sortSettings, setSortSettings] = useState({
      priceSortMethod: "default",
      nameSortMethod: "default",
      selectedCategory: null,
      selectedSubcategory: null,
      filterRange: { filterRange },
    });

    const defaultSortSettings = {
      priceSortMethod: "default",
      nameSortMethod: "default",
      selectedCategory: null,
      selectedSubcategory: null,
      filterRange: { filterRange },
    };
    const userCheckCart = (user) => {
      if (user.id != null) {
        setShowCart(!showUserCart);
      } else alert("Войдите или зарагестрирйтесь");
    };

    const userCheckLikes = (user) => {
      if (user.id != null) {
        setShowList(!showLikeList);
      } else alert("Войдите или зарагестрирйтесь");
    };

    const toggleCard = () => {
      if (showLikeList) {
        userCheckLikes(CurentUser);
      }
      userCheckCart(CurentUser);
    };

    const toggleLikes = () => {
      if (showUserCart) {
        userCheckCart(CurentUser);
      }
      userCheckLikes(CurentUser);
    };

    let categories = ["Чай", "Кофе", "Атрибутика"];
    let childCategories = [
      ["Черный", "Зеленый", "Шу Пуэр", "Улун", "Красный", "Белый", "Травяной"],
      ["Арабика", "Робуста", "Либерика", "Эксцельеза"],
      [
        "Чайный набор",
        "Посуда для чая",
        "Посуда для кофе",
        "Термокружка",
        "Кофемашина",
        "Чайник",
      ],
    ];

    const handleSliderChange = React.useCallback(({ min, max }) => {
      setSortSettings((oldSettings) => {
        if (
          oldSettings.filterRange.min === min &&
          oldSettings.filterRange.max === max
        ) {
          return oldSettings;
        }
        return { ...oldSettings, filterRange: { min, max } };
      });
    }, []);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
      <div className={styles.navBar}>
      <div className={styles.dropdown}>
        <button className={styles.dropbtn} onClick={toggleDropdown}>
          Фильтры
        </button>
      </div>
    
      {dropdownOpen && (
        <div className={styles["sort-container"]}>
          <p className={styles["sort-header"]}>Сортировка по:</p>
          <div className={styles.sort}>
            <div className={styles.column}>
              <label>
                <select
                  className={styles["sort-select"]}
                  value={priceSortMethod}
                  onChange={(e) => {
                    const newPriceSortMethod = e.target.value;
                    setPriceSortMethod(newPriceSortMethod);
                    setSortSettings({
                      ...sortSettings,
                      priceSortMethod: newPriceSortMethod,
                    });
                  }}
                >
                  <option value="default">Цена</option>
                  <option value="priceUp">По возрастанию</option>
                  <option value="priceDown">По убыванию</option>
                </select>
              </label>
    
              <select
                className={styles["sort-select"]}
                value={nameSortMethod}
                onChange={(e) => {
                  const newNameSortMethod = e.target.value;
                  setNameSortMethod(newNameSortMethod);
                  setSortSettings({
                    ...sortSettings,
                    nameSortMethod: newNameSortMethod,
                  });
                }}
              >
                <option value="default">Название</option>
                <option value="A-z">A-z</option>
                <option value="Z-a">Z-a</option>
              </select>
            </div>
    
            <div className={styles.column}>
              <select
                className={styles["sort-select"]}
                value={selectedCategory || ""}
                onChange={(e) => {
                  const newCategory = e.target.value;
                  setSelectedCategory(newCategory);
                  setSortSettings({
                    ...sortSettings,
                    selectedCategory: newCategory,
                  });
                }}
              >
                <option value="">Категория</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
    
              {selectedCategory ? (
                <select
                  className={styles["sort-select"]}
                  value={selectedSubcategory || ""}
                  onChange={(e) => {
                    const newSubcategory = e.target.value;
                    setSelectedSubcategory(newSubcategory);
                    setSortSettings({
                      ...sortSettings,
                      selectedSubcategory: newSubcategory,
                    });
                  }}
                >
                  <option value="">Подкатегория</option>
                  {childCategories[categories.indexOf(selectedCategory)].map(
                    (subcategory) => (
                      <option key={subcategory} value={subcategory}>
                        {subcategory}
                      </option>
                    )
                  )}
                </select>
              ) : (
                <select className={styles["sort-select"]}>
                  <option value="">Подкатегория</option>
                </select>
              )}
            </div>
          </div>
    
          <p className={styles["sort-header"]}>Цена:</p>  {priceRange.minPrice && priceRange.maxPrice && (
      <MultiRangeSlider
        min={priceRange.minPrice - 1}
        max={priceRange.maxPrice + 1}
        onChange={handleSliderChange}
      />
    )}

    <div className={styles.sort}>
      <button onClick={() => {
        setSortSettings(defaultSortSettings);
        setSelectedCategory(null);
        setSelectedSubcategory(null);
        setNameSortMethod("default");
        setPriceSortMethod("default");
        updateDisplayProducts(defaultSortSettings)
      }}>
        Очистить Фильтры
      </button>

      <button onClick={() => updateDisplayProducts(sortSettings)}>
        Поиск
      </button>
    </div>
  </div>
  )}

  <div className={styles.usersElements}>
    <img
      onClick={toggleLikes}
      src="https://www.svgrepo.com/show/524063/heart.svg"
      width={24}
      className={styles.userBar}
    />

    <img
      onClick={toggleCard}
      src="https://www.svgrepo.com/show/524266/bag-2.svg"
      width={24}
      className={styles.userBar}
    />

    <img
      onClick={toggleUserAuth}
      src="https://www.svgrepo.com/show/524211/user.svg"
      width={24}
      className={styles.userBar}
    />
  </div>

  {showUserCart && (
    <BasketHead
      removeItem={removeItem}
      updateQuantity={updateQuantity}
      productBasket={productBasket}
      products={products}
      updateProductBasket={updateProductBasket}
      showDetailedProduct={showDetailedProduct}
      setProductBasket={setProductBasket}
    />
  )}

  {showLikeList && (
    <LikeListHead
      likeList={likeList}
      products={products}
      showDetailedProduct={showDetailedProduct}
      removeItemFromLikeList={removeItemFromLikeList}
    />
  )}
  </div>
    );
  };

  export default HeadNavBar;
