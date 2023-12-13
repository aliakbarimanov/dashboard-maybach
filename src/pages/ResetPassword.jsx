// import images
import BackgroundImage from "../assets/images/background.webp";

// import sweet alert
import Swal from "sweetalert2";

// import react hooks
import { useState } from "react";

// import api provider
import { postResetPassword } from "../api/ApiProvider";
import { postOtp } from "../api/ApiProvider";
import { sendNewPass } from "../api/ApiProvider";

const ResetPassword = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [userPass, setUserPass] = useState("");
  const [step, setStep] = useState("email");

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));

    if (step === "email") {
      const body = {
        token: token,
        email: userEmail,
      };

      await postResetPassword(body)
        .then((res) => {
          setStep("otp");
        })
        .catch((err) => {
          console.warn(err);
        });
    } else if (step === "otp") {
      const body = {
        token: token,
        otp: userOtp,
      };

      await postOtp(body)
        .then((res) => {
          setStep("password");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const body = {
        token: token,
        password: userPass,
      };

      await sendNewPass(body)
        .then((res) => {
          localStorage.removeItem("token");
          Swal.fire({
            title: "Şifrə uğurla dəyişdirildi!",
            icon: "success",
          });
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="resetPass">
      <div className="backgroundImage">
        <img src={BackgroundImage} alt="Background img" />
      </div>
      <div className="container">
        <div className="row">
          {step === "email" ? (
            <form className="resetPassForm" onSubmit={onSubmit}>
              <input
                type="text"
                name="email"
                className="input"
                id="email"
                placeholder="Mail"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <button className="btn">Submit email</button>
            </form>
          ) : step === "otp" ? (
            <form className="resetPassForm" onSubmit={onSubmit}>
              <input
                type="text"
                name="otp"
                className="input"
                id="otp"
                placeholder="OTP Code"
                value={userOtp}
                onChange={(e) => setUserOtp(e.target.value)}
              />
              <button className="btn">Submit OTP code</button>
            </form>
          ) : (
            <form className="resetPassForm" onSubmit={onSubmit}>
              <input
                type="password"
                name="password"
                className="input"
                id="password"
                placeholder="Password"
                value={userPass}
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
