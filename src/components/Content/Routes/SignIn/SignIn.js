import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authenticateUser } from "../../../../store/slices/userSlice";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAuthentication = (e) => {
    e.preventDefault();
    dispatch(authenticateUser());
    navigate("/home");
  };

  return (
    <div className="relative">
      <div className="mask-overlay">
        <div
          className="h-[96vh]"
          style={{
            backgroundRepeat: "no-repeat",
            width: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundImage: "url(assets/images/sign-in.jpg)",
            zIndex: "-1",
          }}
        ></div>
        <div className="absolute left-[5vw] top-[100px] md:top-[50%] w-[90vw] md:w-[35vw]  md:-translate-y-1/2 bg-customDark rounded shadow text-white">
          <form className="p-6 md:p-10" onSubmit={handleAuthentication}>
            <h2 className="text-3xl md:text-5xl text-center">
              Enjoy the latest movies{" "}
            </h2>
            <hr className="my-3.5 md:my-10" />
            <div className="row g-3 align-items-center mb-4">
              <div className="col-12 col-sm-4">
                <label htmlFor="inputUsername" className="text-md md:text-2xl">
                  Email
                </label>
              </div>
              <div className="col-12 col-sm-8">
                <input
                  type="email"
                  id="inputUsername"
                  className="form-control"
                  aria-describedby="passwordHelpInline"
                  value={email}
                  onChange={handleEmailChange}
                  // required
                />
              </div>
            </div>
            <div className="relative row g-3 align-items-center mb-4 ">
              <div className="col-12 col-sm-4">
                <label htmlFor="inputPassword" className="text-md md:text-2xl">
                  Password
                </label>
              </div>
              <div className="col-12 col-sm-8">
                <input
                  type="password"
                  id="inputPassword"
                  className="form-control"
                  aria-describedby="passwordHelpInline"
                  value={password}
                  minLength={8}
                  maxLength={20}
                  onChange={handlePasswordChange}
                  // required
                />
              </div>
            </div>
            <div className="row g-3 align-items-center">
              <div className="offset-sm-4 col-12 col-sm-4">
                <button type="submit" className="btn btn-primary w-100">
                  Sign In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
