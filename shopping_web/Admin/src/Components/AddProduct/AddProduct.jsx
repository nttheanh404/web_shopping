import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import image from "../../assets/hero_image.png";
import {
  uploadImage,
  createProduct,
  updateProduct,
} from "../../services/product";

function AddProduct() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const location = useLocation();
  const { productToUpdate } = location.state || {};

  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    old_price: "",
    new_price: "",
    category: "women",
    size: [],
    description: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (productToUpdate) {
      // Nếu có dữ liệu sản phẩm để cập nhật, gán vào state
      setProductDetails({
        name: productToUpdate.name,
        image: productToUpdate.image,
        old_price: productToUpdate.old_price,
        new_price: productToUpdate.new_price,
        category: productToUpdate.category,
        size: productToUpdate.size,
        description: productToUpdate.description,
      });
      setImagePreview(productToUpdate.image);
    }
  }, [productToUpdate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value, selectedOptions } = e.target;

    if (name === "size") {
      const selectedSizes = Array.from(
        selectedOptions,
        (option) => option.value
      );
      setProductDetails({
        ...productDetails,
        [name]: selectedSizes,
      });
    } else {
      setProductDetails({ ...productDetails, [name]: value });
    }
  };

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;

    setProductDetails((prevDetails) => {
      const updatedSize = checked
        ? [...prevDetails.size, value]
        : prevDetails.size.filter((size) => size !== value);

      return { ...prevDetails, size: updatedSize };
    });
  };

  // const uploadImage = async () => {
  //   const formData = new FormData();
  //   formData.append("image", imageFile);

  //   try {
  //     const res = await fetch(`${authUrl}/upload`, {
  //       method: "POST",
  //       body: formData,
  //     });
  //     return await res.json();
  //   } catch (err) {
  //     console.error("Error uploading image:", err);
  //     return { success: false };
  //   }
  // };

  const addOrUpdateProduct = async () => {
    if (!imageFile && !productDetails.image) {
      alert("Please choose the image!");
      return;
    }

    const uploadResult = imageFile
      ? await uploadImage(imageFile)
      : { success: true, url: productDetails.image };

    if (uploadResult.success) {
      const product = {
        ...productDetails,
        image: uploadResult.url,
      };

      try {
        const result = productToUpdate
          ? await updateProduct(productToUpdate._id, product)
          : await createProduct(product);

        if (result.success) {
          alert(`${productToUpdate ? "Update" : "Add"} product successfully!`);
          navigate("/admin/listproduct");
        } else {
          alert(`${productToUpdate ? "Update" : "Add"} product failed!`);
        }
      } catch (err) {
        console.error("Error while processing product:", err);
        alert("An error occurred.");
      }
    } else {
      alert("Upload image failed.");
    }
  };

  return (
    <>
      <div className="add-product">
        <div className="add-product-item-field">
          <p>Product title</p>
          <input
            value={productDetails.name}
            onChange={handleChange}
            type="text"
            name="name"
            placeholder="Enter the product name"
          />
        </div>

        <div className="add-product-price">
          <div className="add-product-item-field">
            <p>Price</p>
            <input
              value={productDetails.old_price}
              onChange={handleChange}
              type="text"
              name="old_price"
              placeholder="Enter the price"
            />
          </div>
          <div className="add-product-item-field">
            <p>Offer Price</p>
            <input
              value={productDetails.new_price}
              onChange={handleChange}
              type="text"
              name="new_price"
              placeholder="Enter the offer price"
            />
          </div>
        </div>

        <div className="add-product-item-field">
          <p>Size</p>
          <div className="size-options">
            <label>
              <input
                type="checkbox"
                value="S"
                onChange={handleSizeChange}
                checked={productDetails.size.includes("S")}
              />
              S
            </label>
            <label>
              <input
                type="checkbox"
                value="M"
                onChange={handleSizeChange}
                checked={productDetails.size.includes("M")}
              />
              M
            </label>
            <label>
              <input
                type="checkbox"
                value="L"
                onChange={handleSizeChange}
                checked={productDetails.size.includes("L")}
              />
              L
            </label>
            <label>
              <input
                type="checkbox"
                value="XL"
                onChange={handleSizeChange}
                checked={productDetails.size.includes("XL")}
              />
              XL
            </label>
            <label>
              <input
                type="checkbox"
                value="XXL"
                onChange={handleSizeChange}
                checked={productDetails.size.includes("XXL")}
              />
              XXL
            </label>
          </div>
        </div>

        <div className="add-product-item-field">
          <p>Product Category</p>
          <select
            value={productDetails.category}
            onChange={handleChange}
            name="category"
            className="add-product-selector"
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
          </select>
        </div>
        <div className="add-product-item-field">
          <p>Description</p>
          <textarea
            value={productDetails.description}
            onChange={handleChange}
            name="description"
            placeholder="Enter the description"
            rows="4"
          />
        </div>

        <div className="add-product-item-field">
          <label htmlFor="file-input">
            <img
              src={imagePreview || upload_area}
              className="add-product-thumbnail-img"
              alt="Thumbnail"
            />
          </label>
          <input
            onChange={handleFileChange}
            type="file"
            name="image"
            id="file-input"
            hidden
            accept="image/*"
          />
        </div>

        <button onClick={addOrUpdateProduct} className="add-product-btn">
          {productToUpdate ? "UPDATE" : "ADD"}
        </button>
      </div>
      <div className="add-product-image-preview">
        <img src={image} alt="" />
      </div>
    </>
  );
}

export default AddProduct;
