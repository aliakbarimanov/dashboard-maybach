// import images
import BackgroundImage from "../assets/images/background.webp";
import User from "../assets/images/user.png";

// import react hooks
import { useContext } from "react";

// import react-router-dom
import { Link } from "react-router-dom";

// import axios
import axios from "axios";

// import Context
import { Context } from "../utils/MainContext";

const Profile = () => {
  const { user, setUser } = useContext(Context);

  const changeImg = async (e) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const profileImg = e.target.files[0];

    const body = new FormData();
    body.append("token", token);
    body.append("profileImage", profileImg);

    await axios
      .put("http://localhost:8000/api/users/profile", body)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.warn(err));
  };

  return (
    <div className="profile">
      <div className="backgroundImage">
        <img src={BackgroundImage} alt="Background img" />
      </div>
      <div className="container">
        <div className="row">
          <form className="profileBox">
            <h2 className="fullName">
              <span>{user.name}</span>
              <span>{user.surname}</span>
            </h2>
            <h3 className="email">{user.email}</h3>
            <div className="profileImageArea">
              <div className="profileImg">
                {user.profileImage ? (
                  <img
                    src={`http://localhost:8000/${user.profileImage}`}
                    alt="Profile image"
                  />
                ) : (
                  <img className="defaultImg" src={User} alt="Profile image" />
                )}
              </div>
              <input type="file" onChange={changeImg} />
            </div>
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
