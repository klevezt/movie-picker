import React from "react";
import { Route, Routes, Navigate } from "react-router";
import Main from "./Main/Main";
import Home from "./Home/Home";
import Register from "./Register/Register";
import SignIn from "./SignIn/SignIn";
import { useSelector } from "react-redux";

const AllRoutes = () => {
  const authenticated = useSelector((state) => state.user.authenticated);

  return (
    <Routes>
      {!authenticated ? (
        <>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<SignIn />}></Route>
          <Route path="/" element={<Main />}></Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </>
      ) : (
        <>
          <Route path="/home" element={<Home />}></Route>
        </>
      )}
    </Routes>
  );
};

export default AllRoutes;
