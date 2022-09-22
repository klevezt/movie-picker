import HeaderOut from "./components/Layout/Header/HeaderOut";
import HeaderIn from "./components/Layout/Header/HeaderIn";
import Footer from "./components/Layout/Footer/Footer";
import { createTheme, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import Routes from "./components/Content/Routes/Routes";

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
