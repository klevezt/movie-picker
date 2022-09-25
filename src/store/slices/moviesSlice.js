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
    addFavoriteMovie: (state, action) => {
      state.favoriteMovies.push(action.payload);
    },
    removeFavoriteMovie: (state, action) => {
      state.favoriteMovies = state.favoriteMovies.filter(
        (movie) => movie.id.toString() !== action.payload.id.toString()
      );
    },
  },
});

export const {
  setPopularMovies,
  setActionMovies,
  setHorrorMovies,
  addFavoriteMovie,
  removeFavoriteMovie,
} = moviesSlice.actions;
export default moviesSlice.reducer;
