// import images
import nullImage from "../assets/images/nullImg.png";

// import react hooks
import { useEffect, useState } from "react";

// import  react-router-dom
import { useNavigate, useParams } from "react-router-dom";

// import axios
import axios from "axios";

// import react-hook-form
import { useForm } from "react-hook-form";

// import yup
import { object, string } from "yup";

// import
import { yupResolver } from "@hookform/resolvers/yup";

// import sweet alert
import Swal from "sweetalert2";

const EditProduct = () => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [productImg, setProductImg] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  useEffect(() => getSingleData, [id]);

  const getSingleData = async () => {
    await axios
      .get(`http://localhost:5000/api/v1/maybach/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.warn(err));
  };

  const setImage = (e) => {
    const productImg = e.target.files[0];
    setProductImg(productImg);

    const reader = new FileReader();
    reader.readAsDataURL(productImg);
    reader.onload = () => {
      setPreview(reader.result);
    };
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("details", data.details);
    formData.append("price", data.price);
    formData.append("productImage", productImg);

    await axios
      .put(`http://localhost:5000/api/v1/maybach/${id}`, formData)
      .then((res) => {
        Swal.fire({
          title: "Məhsul uğurla dəyişdirildi!",
          icon: "success",
        });
        navigate("/products");
      })
      .catch((err) => console.warn(err));
  };

  const editSchema = object({
    name: string().trim().required("Name is empty!"),
    price: string().trim().required("Price is empty!").matches(/^\d+$/, "Price is not correct!"),
    details: string().trim().required("Details is empty!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editSchema),
  });

  return (
    <section className="editProductPage">
      <h2 className="pageTitle">Edit product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.name && <span className="errorMsg">{errors.name.message}</span>}
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          className="input"
          placeholder={data.name}
          {...register("name")}
        />
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          name="image"
          id="image"
          className="input"
          onChange={setImage}
        />
        <div className="newImageBox">
          {preview ? (
            <img src={preview} alt="Product image" />
          ) : data.productImage ? (
            <img
              src={`http://localhost:5000/${data.productImage}`}
              alt="Product image"
            />
          ) : (
            <img src={nullImage} alt="Product image" />
          )}
        </div>
        {errors.price && (
          <span className="errorMsg">{errors.price.message}</span>
        )}
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          name="price"
          id="price"
          className="input"
          placeholder={data.price}
          {...register("price")}
        />
        {errors.details && (
          <span className="errorMsg">{errors.details.message}</span>
        )}
        <label htmlFor="details">Details:</label>
        <textarea
          name="details"
          id="details"
          placeholder={data.details}
          {...register("details")}
        >
          {data.details}
        </textarea>
        <button className="btn">Update</button>
      </form>
    </section>
  );
};

export default EditProduct;
