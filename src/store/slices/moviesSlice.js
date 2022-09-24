import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popularMovies: [],
  actionMovies: [],
  horrorMovies: [],
  favoriteMovies: [],
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    setActionMovies: (state, action) => {
      state.actionMovies = action.payload;
    },
    setHorrorMovies: (state, action) => {
      state.horrorMovies = action.payload;
    },
    setFavoriteMovies: (state, action) => {
      state.favoriteMovies.push(action.payload);
    },
  },
});

export const {
  setPopularMovies,
  setActionMovies,
  setHorrorMovies,
  setFavoriteMovies,
} = moviesSlice.actions;
export default moviesSlice.reducer;
