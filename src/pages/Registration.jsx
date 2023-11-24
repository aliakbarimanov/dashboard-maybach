// import images
import BackgroundImage from "../assets/images/background.webp";

// import Link
import { Link } from "react-router-dom";

const Registration = () => {
    return (
        <div className="registration">
            <div className="backgroundImage">
                <img src={BackgroundImage} alt="Background img" />
            </div>
            <div className="container">
                <div className="row">
                    <form className="registrationBox">
                        <input type="text" name="name" className="input" id="name" placeholder="Name" />
                        <input type="text" name="surname" className="input" id="surname" placeholder="Surname" />
                        <input type="email" name="mail" className="input" id="mail" placeholder="Mail / Username" />
                        <input type="password" name="password" className="input" id="password" placeholder="Password" />
                        <button className="btn">Register</button>
                        <div className="links">
                            <Link to="/">Sign In</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Registration;