import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API = axios.create({ baseURL: "https://evento-r1nz.onrender.com/api" });


// to login
export const loginUser = createAsyncThunk("auth/login", async (formData, { rejectWithValue }) => {


    try {
        const res = await API.post("/auth/login", formData, {
            headers: { "Content-Type": "application/json" }
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

// to register
export const registerUser = createAsyncThunk("auth/register", async (formData, { rejectWithValue }) => {
    try {
        console.log(formData);
        const res = await API.post("/auth/register", formData, {
            headers: { "Content-Type": "application/json" }
        });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
})


const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || null,
        loading: false,
        error: null,
    },

    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state) => {
                state.loading = false;
                state.error = "Login failed"
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;

            })
            .addCase(registerUser.rejected, (state) => {
                state.loading = false;
                state.error = "Registration failed";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;