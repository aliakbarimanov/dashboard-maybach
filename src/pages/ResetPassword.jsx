// import images
import BackgroundImage from "../assets/images/background.webp";

// import react hooks
import { useState } from "react";

// import axios
import axios from "axios";

// import sweet alert
import swal from "sweetalert";

const ResetPassword = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [userPass, setUserPass] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [step, setStep] = useState("email");


  const onSubmit = async (e) => {
    e.preventDefault();

    if (step === "email") {
      if (userEmail.trim() === "" || !userEmail.includes("@")) {
        setErrorMessage(true);
      } else {
        setErrorMessage(false);

        const body = {
          token: JSON.parse(localStorage.getItem("token")),
          email: userEmail,
        };

        await axios
          .post("http://localhost:8000/api/reset-password", body)
          .then((res) => {
            setStep("otp");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    if (step === "otp") {
      if (userOtp.trim() === "") {
        setErrorMessage(true);
      } else {
        setErrorMessage(false);

        const body = {
          token: JSON.parse(localStorage.getItem("token")),
          otp: userOtp,
        };

        await axios
          .post("http://localhost:8000/api/users/verify-otp", body)
          .then((res) => {
            setStep("password");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    if (step === "password") {
      if (userPass.trim() === "") {
        setErrorMessage(true);
      } else {
        setErrorMessage(false);

        const body = {
          token: JSON.parse(localStorage.getItem("token")),
          password: userPass,
        };

        await axios
          .post("http://localhost:8000/api/change-password", body)
          .then((res) => {
            // swal(
            //   <div>
            //     <h1>Hello world!</h1>
            //     <p>This is now rendered with JSX!</p>
            //   </div>
            // );
            localStorage.removeItem("token");
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  return (
    <div className="resetPass">
      <div className="backgroundImage">
        <img src={BackgroundImage} alt="Background img" />
      </div>
      <div className="container">
        <div className="row">
          {step === "email" && (
            <form className="resetPassForm" onSubmit={onSubmit}>
              <span className="inputErrorMessage">
                {errorMessage && "Email daxil etmədiniz!"}
              </span>
              <input
                type="text"
                name="email"
                className="input"
                id="email"
                placeholder="Mail"
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <button className="btn">Submit email</button>
            </form>
          )}
          {step === "otp" && (
            <form className="resetPassForm" onSubmit={onSubmit}>
              <span className="inputErrorMessage">
                {errorMessage && "OTP kodu daxil etmədiniz!"}
              </span>
              <input
                type="text"
                name="otp"
                className="input"
                id="otp"
                placeholder="OTP Code"
                onChange={(e) => setUserOtp(e.target.value)}
              />
              <button className="btn">Submit OTP code</button>
            </form>
          )}
          {step === "password" && (
            <form className="resetPassForm">
              <span className="inputErrorMessage">
                {errorMessage && "Parolu daxil etmədiniz!"}
              </span>
              <input
                type="password"
                name="password"
                className="input"
                id="password"
                placeholder="Password"
                onChange={(e) => setUserPass(e.target.value)}
              />
              <button className="btn">Submit new password</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
