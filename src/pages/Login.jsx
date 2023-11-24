// import images
import BackgroundImage from "../assets/images/background.webp";

// import Link
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="login">
            <div className="backgroundImage">
                <img src={BackgroundImage} alt="Background img" />
            </div>
            <div className="container">
                <div className="row">
                    <form className="loginBox">
                        <input type="text" name="userName" className="input" id="userName" placeholder="Mail / Username" />
                        <input type="password" name="password" className="input" id="password" placeholder="Password" />
                        <button className="btn">Sign In</button>
                        <div className="links">
                            <Link to="/">Forgot password</Link>
                            <Link to="/">Register</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;