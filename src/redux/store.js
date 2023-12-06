// import redux toolkit
import { configureStore } from "@reduxjs/toolkit";

// import slice
import { userSlice } from "./slice/userSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
    }
});