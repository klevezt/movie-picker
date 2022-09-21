import Main from "./components/Content/Main/Main";
import Header from "./components/Layout/Header/Header";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Content/Register/Register";
import Footer from "./components/Layout/Footer/Footer";
import { createTheme, ThemeProvider } from "@mui/material";
import SignIn from "./components/Content/SignIn/SignIn";

const App = () => {
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
        <Header />
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<SignIn />}></Route>
          <Route path="/" element={<Main />}></Route>
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
