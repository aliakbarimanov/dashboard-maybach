// import react hooks
import { useState } from "react";

// import react hook form
import { useNavigate } from "react-router-dom";

// import react-hook-form
import { useForm } from "react-hook-form";

// import axios
import axios from "axios";

// import yup
import { object, string } from "yup";

// import
import { yupResolver } from "@hookform/resolvers/yup";

// import sweet alert
import Swal from "sweetalert2";

const CreateProduct = () => {
  const navigate = useNavigate();

  const [productImage, setProductImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const createImage = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  };

  const onSubmit = async (data) => {
    const body = new FormData();

    body.append("name", data.name);
    body.append("details", data.details);
    body.append("price", data.price);
    body.append("productImage", productImage);

    await axios
      .post("http://localhost:5000/api/v1/maybach", body)
      .then((res) => {
        Swal.fire({
          title: "Məhsul uğurla yaradıldı",
          icon: "success",
        });
        navigate("/products");
      })
      .catch((err) => console.log(err));
  };

  const createSchema = object({
    name: string().trim().required("Name is empty!"),
    price: string().trim().required("Price is empty!").matches(/^\d+$/, "Price is not correct!"),
    details: string().trim().required("Details is empty!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createSchema),
  });

  return (
    <section className="createPage">
      <h2 className="createPageTitle">Create new product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
      {errors.name && <span className="errorMsg">{errors.name.message}</span>}
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          className="input"
          placeholder="Product name"
          {...register("name")}
        />
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          name="image"
          id="image"
          className="input"
          onChange={createImage}
        />
        {preview && (
          <div className="newImageBox">
            <img src={preview} alt="New product image" />
          </div>
        )}
        {errors.price && <span className="errorMsg">{errors.price.message}</span>}
        <label htmlFor="price">Price:</label>
        <input
          type="text"
          name="price"
          id="price"
          className="input"
          placeholder="Product price"
          {...register("price")}
        />
        {errors.details && <span className="errorMsg">{errors.details.message}</span>}
        <label htmlFor="details">Details:</label>
        <input
          type="text"
          name="details"
          id="details"
          className="input"
          placeholder="Product details"
          {...register("details")}
        />
        <button className="btn">Create</button>
      </form>
    </section>
  );
};

export default CreateProduct;
