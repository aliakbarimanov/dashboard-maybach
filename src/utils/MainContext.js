// import react hooks
import { createContext, useEffect, useState } from "react";

// import axios
import axios from "axios";

// import react-router-dom
import { useNavigate } from "react-router-dom";

export const Context = createContext();

export const MainContext = ({ children }) => {

    const navigate = useNavigate();

    const [userIn, setUserIn] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = async () => {
        const body = {
            token: JSON.parse(localStorage.getItem("token")),
        }

        await axios.post("http://localhost:8000/api/check-login", body)
            .then(res => {
                setUserIn(true);
                setUser(res.data);
                navigate("/");
            })
            .catch(err => {
                console.warn(err);
                setUserIn(false);
            });
    }

    const exitUser = () => {
        localStorage.removeItem("token");
        setUserIn(false);
    }

    const globalStates = {
        userIn,
        setUserIn,
        checkLogin,
        exitUser,
        user,
        setUser,
    };

    return <Context.Provider value={globalStates}>{children}</Context.Provider>
}