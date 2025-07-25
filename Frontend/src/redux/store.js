import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slice";

const store = configureStore({
    reducer: {
        // Define your reducers here
        auth: authReducer
    }
})

export default store;