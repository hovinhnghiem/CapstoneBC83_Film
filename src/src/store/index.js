import { configureStore } from '@reduxjs/toolkit';
import listMovieSlice from './../pages/HomeTemplate/ListMoviePage/slice';
import authSlice from "./auth.slice";

export const store = configureStore({
  reducer: {
    listMovieSlice,
    authSlice
  },
});
