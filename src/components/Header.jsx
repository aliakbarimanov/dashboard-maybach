// import images
import Logo from "../assets/images/maybach-logo.svg";

// import react-icons
import { RxHamburgerMenu } from "react-icons/rx";
import { CiUser } from "react-icons/ci";
import { LuDoorOpen } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";

// import Link
import { Link } from "react-router-dom";

// import react hooks
import { useState } from "react";

const Header = () => {

    const [mobileMenu, setMobileMenu] = useState(false);

    return (
        <header className="header">
            <div className="container">
                <div className="row">
                    <div className="burgerIcon" onClick={()=>{setMobileMenu(true)}}><RxHamburgerMenu /></div>
                    <Link to="/" className="logo">
                        <img src={Logo} alt="Logo" />
                    </Link>
                    <nav className="navBar">
                        <ul className="navList">
                            <li className="navItem">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="navItem">
                                <Link to="/products">Product list</Link>
                            </li>
                            <li className="navItem">
                                <Link to="/create-product">Create product</Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="accountLinks">
                        <Link to="/login">
                            <CiUser className="icon" />
                            <span>Profile</span>
                        </Link>
                        <Link to="/registration">
                            <LuDoorOpen className="icon" />
                            <span>Exit</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={mobileMenu ? "mobileMenu active" : "mobileMenu"}>
                <button className="closeButton" onClick={()=>{setMobileMenu(false)}}>
                    <span>close menu</span>
                    <IoMdClose className="closeIcon" />
                </button>
                <ul className="menuList">
                    <li className="menuItem">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="menuItem">
                        <Link to="/products">Product list</Link>
                    </li>
                    <li className="menuItem">
                        <Link to="/create-product">Create product</Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header;