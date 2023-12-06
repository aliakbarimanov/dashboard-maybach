// import images
import BackgroundImage from "../assets/images/background.webp";

// import axios
import axios from "axios";

// import react-hook-form
import { useForm } from "react-hook-form";

// import yup
import { object, string } from "yup";

// import yupResolver
import { yupResolver } from "@hookform/resolvers/yup";

// import Link
import { Link } from "react-router-dom";

const Login = () => {
  const onSubmit = async (data) => {
    await axios
      .post("http://localhost:8000/api/login", data)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.token));
      })
      .catch((err) => console.warn(err));
  };

  const loginSchema = object({
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
    resolver: yupResolver(loginSchema),
  });

  return (
    <div className="login">
      <div className="backgroundImage">
        <img src={BackgroundImage} alt="Background img" />
      </div>
      <div className="container">
        <div className="row">
          <form className="loginBox" onSubmit={handleSubmit(onSubmit)}>
            {errors.email && (
              <span className="inputErrorMessage">{errors.email.message}</span>
            )}
            <input
              type="email"
              name="email"
              className="input"
              id="email"
              placeholder="Mail"
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
            <button className="btn">Sign In</button>
            <div className="links">
              <Link to="/">Forgot password</Link>
              <Link to="/registration">Register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
