import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../slice/todoslice";
const store = configureStore ({
    reducer: {
        todo: todoReducer,
    }
})
export default store;