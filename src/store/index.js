import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import newsReducer from "./newsReducer";

const store = configureStore({
    reducer: {
        userReducer,
        newsReducer
    }
});

export default store;