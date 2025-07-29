import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API = axios.create({ baseURL: "https://evento-r1nz.onrender.com/api" });


// to login
export const loginUser = createAsyncThunk("auth/login", async (formData) => {
    const res = await API.post("/auth/login", formData);
    return res.data;
});

// to register
export const registerUser = createAsyncThunk("auth/register", async (formData) => {
    const res = await API.post("/auth/register", formData);
    return res.data;
})