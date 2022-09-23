import HeaderOut from "./components/Layout/Header/HeaderOut";
import HeaderIn from "./components/Layout/Header/HeaderIn";
import Footer from "./components/Layout/Footer/Footer";
import { createTheme, ThemeProvider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Routes from "./components/Content/Routes/Routes";
import { useRef } from "react";
import useFetch from "./components/_hooks/useFetch";
import {
  setActionMovies,
  setHorrorMovies,
  setPopularMovies,
} from "./store/slices/moviesSlice";
import { useEffect } from "react";
import { useCallback } from "react";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Lobster",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  palette: {
    primary: {
      main: "#f43f5e",
    },
    secondary: {
      main: "#ff9800",
    },
  },
});

const App = () => {
  const authenticated = useSelector((state) => state.user.authenticated);
  const fetchRef = useRef(() => {});
  const dispatch = useDispatch();

  const [popularMovies, isLoading, list] = useFetch(
    `https://api.themoviedb.org/3/movie/popular`,
    "",
    10
  );

  const [actionMovies, isLoading2, list2] = useFetch(
    `https://api.themoviedb.org/3/discover/movie`,
    new URLSearchParams({
      with_genres: "28",
    }),
    10
  );
  const [horrorMovies, isLoading3, list3] = useFetch(
    `https://api.themoviedb.org/3/discover/movie`,
    new URLSearchParams({
      with_genres: "27",
    }),
    10
  );

  fetchRef.current = useCallback(() => {
    list();
    list2();
    list3();
    dispatch(setPopularMovies(popularMovies));
    dispatch(setActionMovies(actionMovies));
    dispatch(setHorrorMovies(horrorMovies));
  }, [list, list2, list3, dispatch, popularMovies, actionMovies, horrorMovies]);

  useEffect(() => {
    fetchRef.current();
  }, [authenticated]);

  return (
    <ThemeProvider theme={theme}>
      <div
        className="min-h-[100vh] h-full"
        style={{
          backgroundRepeat: "repeat",
          width: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundImage: "url(assets/images/background.jpg)",
          zIndex: "-1",
        }}
      >
        {authenticated ? <HeaderIn /> : <HeaderOut />}
        <Routes />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
