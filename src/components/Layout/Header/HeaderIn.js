import { Search } from "@mui/icons-material";
import { AppBar, Container, Toolbar } from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../../store/slices/userSlice";

const Header = () => {
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef(null);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const searchFocus = () => {
    setSearchFocused(true);
  };
  const searchBlur = () => {
    setSearchFocused(false);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar className="p-0">
          <div className="w-100 flex flex-wrap justify-between items-center py-3.5 sm:py-0">
            <div>
              <ul className="pl-0 mb-0 flex flex-row items-center">
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
                    to={"/favorite"}
                    className="mx-2 text-slate-50 hover:text-black no-underline"
                  >
                    Favorite
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="w-full sm:w-1/3 relative order-6 sm:order-2 my-2.5 sm:my-0">
              <input
                type="text"
                className="w-full pl-14 py-1.5 pr-6 rounded text-rose outline-0"
                ref={searchRef}
                size={31}
              />
              <div
                className={`absolute flex items-center justify-center px-3 left-0 top-1 bottom-1 w-auto  border-rose text-rose ${
                  searchFocused ? "bg-rose text-white top-0 bottom-0" : ""
                } rounded-tl rounded-bl`}
              >
                <Search sx={{ fontSize: "24px" }} />
              </div>
            </div>

            <div className="order-3">
              <ul className="pl-0 mb-0 flex flex-row ">
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
