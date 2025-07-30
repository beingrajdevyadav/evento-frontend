import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
// import eventReducer from "../features/event/eventSlice.js"


const store = configureStore({
    reducer:{
        auth:authReducer,
        // event: eventReducer,
    }
});


export default store;