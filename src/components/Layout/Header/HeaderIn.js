import { AppBar, Container, Toolbar } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../../store/slices/userSlice";

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar className="p-0">
          <div className="w-100 flex justify-between items-center">
            <div>
              <ul className="pl-0 mb-0 flex flex-row">
                <li>
                  <NavLink
                    to={"/home"}
                    className="mx-2 text-slate-50 hover:text-black no-underline"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/"}
                    className="mx-2 text-slate-50 hover:text-black no-underline"
                  >
                    Favorite
                  </NavLink>
                </li>
              </ul>
            </div>
            <div>
              <ul className="pl-0 mb-0 flex flex-row">
                <li>
                  <NavLink
                    to={"/settings"}
                    className="mx-2 text-slate-50 hover:text-black no-underline"
                  >
                    Settings
                  </NavLink>
                </li>
                <li>
                  <button
                    className="mx-2 text-slate-50 hover:text-black no-underline"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
