// import images
import BackgroundImage from "../assets/images/background.webp";

// import react-router-dom
import { Link, useNavigate } from "react-router-dom";

// import axios
import axios from "axios";

// import react-hook-form
import { useForm } from "react-hook-form";

// import yup
import { object, string } from "yup";

// import
import { yupResolver } from "@hookform/resolvers/yup";

const Registration = () => {
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await axios
      .post("http://localhost:8000/api/register", data)
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.warn(err));
  };

  const registerSchema = object({
    userName: string().trim().required("Name is empty!"),
    surname: string().trim().required("Surname is empty!"),
    mail: string().trim().required("Mail is empty!"),
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
    resolver: yupResolver(registerSchema),
  });

  return (
    <div className="registration">
      <div className="backgroundImage">
        <img src={BackgroundImage} alt="Background img" />
      </div>
      <div className="container">
        <div className="row">
          <form className="registrationBox" onSubmit={handleSubmit(onSubmit)}>
            {errors.userName && (
              <span className="inputErrorMessage">
                {errors.userName.message}
              </span>
            )}
            <input
              type="text"
              name="userName"
              className="input"
              id="name"
              placeholder="Name"
              {...register("userName")}
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
            {errors.mail && (
              <span className="inputErrorMessage">{errors.mail.message}</span>
            )}
            <input
              type="email"
              name="mail"
              className="input"
              id="mail"
              placeholder="Mail / Username"
              {...register("mail")}
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
            <button className="btn">Register</button>
            <div className="links">
              <Link to="/login">Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
