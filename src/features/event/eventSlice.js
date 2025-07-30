import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({baseURL: "https://evento-r1nz.onrender.com/api"});

export const fetchEvents = createAsyncThunk("event/fetchAll", async()=>{
    const res = await API.get("/events");
    return res.data;
});

const eventSlice = createSlice({
    name: "event",
    initialState:{
        events: [],
        loading: false,
        error: null,
    },

    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchEvents.pending, (state)=>{
            state.loading = true;
        })
        .addCase(fetchEvents.fulfilled, (state, action)=>{
            state.loading = false;
            state.events = action.payload;
        })
        .addCase(fetchEvents.rejected, (state)=>{
            state.loading = false;
            state.error = "Failed to fetch events";
        });
    },
});

export default eventSlice.reducer;