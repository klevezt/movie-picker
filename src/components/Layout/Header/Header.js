import { FavoriteBorder, Home, ListAlt } from '@mui/icons-material';
import React from 'react'
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles["app-header"]}>
      <nav className="d-md-block bg-light collapse">
        <div className="pt-3 ">
          <ul className="nav flex-column">
            <li className="nav-item">
              <div className="nav-link active" aria-current="page">
                <Home className="me-2" />
                Home
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                <FavoriteBorder className="me-2" />
                Favorite
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                <ListAlt className="me-2" />
                Watchlist
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header