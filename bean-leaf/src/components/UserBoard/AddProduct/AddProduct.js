import axios from "axios";
import { useEffect, useState } from "react";
import "./AddProduct.css";
import AddSlider from "./Slider";
const AddProduct = ({ fetchProducts = { fetchProducts } }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    availability: "",
    category: "",
    categorychild: "",
    imageUrl: [],
    quantity: "",
    country: "",
  });
  const [images, setImages] = useState([]);
  const [currentImageUrls, setCurrentImageUrls] = useState([]);

  const [parentCategory, setParentCategory] = useState();
  const [childCategory, setChildCategory] = useState();

  useEffect(() => {
    console.log(product);
  }, [product]);

  const parentCategoryHandler = (e) => {
    setParentCategory(e.target.value);
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const childCategoryHandler = (e) => {
    setChildCategory(e.target.value);
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProduct({ ...product, imageUrl: currentImageUrls });
    if (product.category == "") {
      alert("Введите категорию товара");
    } else {
      if (product.categorychild == "") {
        alert("Введите подкатегорию товара");
      } else {
        const response = await axios.post(
          "http://localhost:5000/products",
          product
        );
        fetchProducts();
        console.log(response.data);
      }
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const sendImages = async () => {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("image", image);
      });

      try {
        const response = await axios.post(
          "http://localhost:5000/products/images",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setCurrentImageUrls(response.data);
        setProduct({ ...product, imageUrl: response.data });
        console.log("Images successfully uploaded", response.data);
      } catch (error) {
        console.error("An error occurred while uploading the image", error);
      }
    };

    if (images.length > 0) {
      sendImages();
    }
  }, [images]);

  const handleInputClick = () => {
    const fileInput = document.getElementById("file-input");
    fileInput.click();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    const imageFiles = droppedFiles.filter((file) =>
      file.type.startsWith("image/")
    );
    setImages((prev) => [...prev, ...imageFiles]);
  };

  const handleImageSelect = (event) => {
    const selectedImages = Array.from(event.target.files).filter((file) =>
      file.type.startsWith("image/")
    );
    setImages((prev) => [...prev, ...selectedImages]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
  };

  const isTea = (cat) => {
    return cat === "Чай";
  };

  const isCoffe = (cat) => {
    return cat === "Кофе";
  };
  function handleDelete(index) {
    const newImages = [...currentImageUrls];
    newImages.splice(index, 1);
    setCurrentImageUrls(newImages);
  }
  const isAttr = (cat) => {
    return cat === "Атрибутика";
  };

  return (
    <form onSubmit={handleSubmit} className="createProduct">
      <h1>Добавить новый товар</h1>
      <div className="form-container">
        <div className="image-container">
          <input
            type="file"
            id="file-input"
            name="image"
            multiple
            hidden
            onChange={handleImageSelect}
          />
          {currentImageUrls.length ? (
            <>
              <AddSlider
                images={currentImageUrls}
                onSliderClick={handleInputClick}
                onSliderDrop={handleDrop}
                onSliderDragOver={handleDragOver}
                onSliderDragEnter={handleDragEnter}
                handleDelete={handleDelete}
              />
            </>
          ) : (
            <img
              className="img-input"
              onClick={handleInputClick}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              src="/images/placeholders/image.png"
              alt="placeholder"
            />
          )}
        </div>
        <div className="info-container">
          <input
            name="name"
            className="name"
            type="text"
            placeholder="Название товара"
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            className="description"
            type="text"
            placeholder="Описание"
            onChange={handleChange}
            required
          />

          <div className="column-container">
            <div className="column">
              <select
                name="category"
                className="category"
                onChange={parentCategoryHandler}
              >
                <option disabled selected="selected">
                  Категория товара
                </option>
                <option value="Чай">Чай</option>
                <option value="Кофе">Кофе</option>
                <option value="Атрибутика">Атрибутика</option>
              </select>
            </div>

            <div className="column">
              {isTea(parentCategory) ? (
                <select
                  name="categorychild"
                  className="category"
                  onChange={childCategoryHandler}
                  required
                >
                  <option disabled selected="selected">
                    Вид чая
                  </option>
                  <option value="Черный">Черный</option>
                  <option value="Зеленый">Зеленый</option>
                  <option value="Шу Пуэр">Шу Пуэр</option>
                  <option value="Улун">Улун</option>
                  <option value="Красный">Красный</option>
                  <option value="Белый">Белый</option>
                  <option value="Травяной">Травяной</option>
                </select>
              ) : null}

              {isCoffe(parentCategory) ? (
                <select
                  name="categorychild"
                  className="category"
                  onChange={childCategoryHandler}
                  required
                >
                  <option disabled selected="selected">
                    Вид Зерен
                  </option>
                  <option value="Арабика">Арабика</option>
                  <option value="Робуста">Робуста</option>
                  <option value="Либерика">Либерика</option>
                  <option value="Эксцельеза">Эксцельеза</option>
                </select>
              ) : null}

              {isAttr(parentCategory) ? (
                <select
                  name="categorychild"
                  className="category"
                  onChange={childCategoryHandler}
                  required
                >
                  <option disabled selected="selected">
                    Вид атрибута
                  </option>
                  <option value="Чайный наор">Чайный набор</option>
                  <option value="Посуда для чая">Посуда для чая</option>
                  <option value="Посуда для кофе">Посуда для кофе</option>
                  <option value="Кофемашина">Бытовая техника</option>
                </select>
              ) : null}
            </div>
          </div>

          <div className="column-container">
            <div className="column">
              <input
                name="country"
                type="text"
                placeholder="Страна производства"
                onChange={handleChange}
                required
              />

              <input
                name="availability"
                type="number"
                placeholder="Наличие на складе"
                onChange={handleChange}
                required
              />
            </div>
            <div className="column">
              <input
                name="quantity"
                type="number"
                placeholder="Вес"
                onChange={handleChange}
                required
              />
              <input
              step={0.01}
                name="price"
                type="number"
                placeholder="Цена"
                onChange={handleChange}
                required
              />
            </div>
          </div><button type="submit" className="create">Добавить товар</button>
        
      </div>
      </div>
    </form>
  );
};

export default AddProduct;
