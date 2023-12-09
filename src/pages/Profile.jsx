// import images
import BackgroundImage from "../assets/images/background.webp";

// import react-router-dom
import { Link } from "react-router-dom";

// import react-hook-form
import { useForm } from "react-hook-form";

// import yup
import { object, string } from "yup";

// import
import { yupResolver } from "@hookform/resolvers/yup";

const Profile = () => {
  const onSubmit = async (data) => {
    console.log(data);
  };

  const updateSchema = object({
    name: string().trim().required("Name is empty!"),
    surname: string().trim().required("Surname is empty!"),
    email: string().trim().required("Mail is empty!"),
    password: string()
      .trim()
      .required("Password is empty!")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Minimum 8 character, 1 letter and 1 number required!"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateSchema),
  });

  return (
    <div className="profile">
      <div className="backgroundImage">
        <img src={BackgroundImage} alt="Background img" />
      </div>
      <div className="container">
        <div className="row">
          <form className="profileBox" onSubmit={handleSubmit(onSubmit)}>
            {errors.name && (
              <span className="inputErrorMessage">{errors.name.message}</span>
            )}
            <input
              type="text"
              name="name"
              className="input"
              id="name"
              placeholder="Name"
              {...register("name")}
            />
            {errors.surname && (
              <span className="inputErrorMessage">
                {errors.surname.message}
              </span>
            )}
            <input
              type="text"
              name="surname"
              className="input"
              id="surname"
              placeholder="Surname"
              {...register("surname")}
            />
            {errors.email && (
              <span className="inputErrorMessage">{errors.email.message}</span>
            )}
            <input
              type="email"
              name="email"
              className="input"
              id="mail"
              placeholder="Mail / Username"
              {...register("email")}
            />
            {errors.password && (
              <span className="inputErrorMessage">
                {errors.password.message}
              </span>
            )}
            <input
              type="password"
              name="password"
              className="input"
              id="password"
              placeholder="Password"
              {...register("password")}
            />
            <button className="btn">Update</button>
            <div className="links">
              <Link to="/reset-password">Reset password</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
