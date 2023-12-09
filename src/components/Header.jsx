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
import { useContext, useState } from "react";

// import Context
import { Context } from "../utils/MainContext";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const { exitUser, userIn } = useContext(Context);

  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div
            className="burgerIcon"
            onClick={() => {
              setMobileMenu(true);
            }}
          >
            <RxHamburgerMenu />
          </div>
          <Link to="/" className="logo">
            <img src={Logo} alt="Logo" />
          </Link>
          {userIn && (
            <>
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
                <Link to="/profile">
                  <CiUser className="icon" />
                  <span>Profile</span>
                </Link>
                <button className="exitBtn" onClick={exitUser}>
                  <LuDoorOpen className="icon" />
                  <span>Exit</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <div className={mobileMenu ? "mobileMenu active" : "mobileMenu"}>
        <button
          className="closeButton"
          onClick={() => {
            setMobileMenu(false);
          }}
        >
          <span>close menu</span>
          <IoMdClose className="closeIcon" />
        </button>
        <ul className="menuList">
          {userIn && (
            <>
              <li className="menuItem">
                <Link to="/">Home</Link>
              </li>
              <li className="menuItem">
                <Link to="/products">Product list</Link>
              </li>
              <li className="menuItem">
                <Link to="/create-product">Create product</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
