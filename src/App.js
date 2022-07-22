import styles from './App.module.css';
import Main from './components/Content/Main/Main';
import Header from './components/Layout/Header/Header';

const App = () => {
  return (
    <div className={styles["app"]}>
      <Header />
      <Main />
    </div>
  );
}

export default App;
