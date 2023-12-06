// import redux toolkit
import { createSlice } from "@reduxjs/toolkit";

// import react hook
import { useEffect } from "react";

// import axios
import axios from "axios";

const initialState = {
    userIn: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        checkLogin: async (state, action) => {
            const token = JSON.parse(localStorage.getItem("token"));
            const body = {
                token,
            }

            await axios.post("http://localhost:8000/api/check-login", body)
                .then(res => {
                    state.userIn=true;
                })
                .catch(err => console.warn(err));
        }
    },
});

export const { checkLogin } = userSlice.actions;

export default userSlice.reducer;