import Main from './components/Content/Main/Main';
import Header from './components/Layout/Header/Header';

const App = () => {
  return (
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
      <Main />
    </div>
  );
}

export default App;
