import {
  
  Help,
} from "@mui/icons-material";
import {
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import useLengthValidator from "../../../_hooks/useValidator";
import PasswordCondition from "./PasswordCondition";
import styles from "./Register.module.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [
    uppercaseError,
    uppercaseSuccess,
    numberError,
    numberSuccess,
    specialError,
    specialSuccess,
    lengthError,
    lengthSuccess,
  ] = useLengthValidator(password);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const isPasswordValid =
    uppercaseSuccess && numberSuccess && specialSuccess && lengthSuccess;

  const isEmailValid = email.includes("@");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isPasswordValid && isEmailValid) {
      console.log("Valid Submit");
    }
  };

  return (
    <div className="relative">
      <div className={styles["mask-overlay"]}>
        <div
          className="h-[96vh]"
          style={{
            backgroundRepeat: "no-repeat",
            width: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundImage: "url(assets/images/register-2.jpg)",
            zIndex: "-1",
          }}
        ></div>
        <div className="absolute right-[5vw] top-[50%] w-[35vw] -translate-y-1/2 bg-customDark rounded shadow text-white">
          <form className="p-10" onSubmit={handleFormSubmit}>
            <h2 className="text-5xl text-center">Join our exclusive club</h2>
            <hr className="my-10" />
            <div className="row g-3 align-items-center mb-4">
              <div className="col-4">
                <label htmlFor="inputUsername" className="text-2xl">
                  Email
                </label>
              </div>
              <div className="col-8">
                <input
                  type="email"
                  id="inputUsername"
                  className="form-control"
                  aria-describedby="passwordHelpInline"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
            </div>
            <div className="relative row g-3 align-items-center mb-4 ">
              <div className="col-4">
                <label htmlFor="inputPassword" className="text-2xl">
                  Password
                </label>
              </div>
              <div className="col-8">
                <input
                  type="password"
                  id="inputPassword"
                  className="form-control"
                  aria-describedby="passwordHelpInline"
                  value={password}
                  minLength={8}
                  maxLength={20}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="absolute -right-10 top-0 w-auto">
                <Tooltip title="Check our tool for creating strong passwords">
                  <a
                    href="https://generator.kpwork.site/"
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    <IconButton>
                      <Help sx={{ color: "white" }} />
                    </IconButton>
                  </a>
                </Tooltip>
              </div>
              <div className="offset-4 col-auto">
                <ul className="text-start p-0">
                  <PasswordCondition
                    text="Must contain uppecase."
                    error={uppercaseError}
                    success={uppercaseSuccess}
                  />
                  <PasswordCondition
                    text="Must contain number."
                    error={numberError}
                    success={numberSuccess}
                  />
                  <PasswordCondition
                    text="Must contain a special character(!@#$%^&*()+_?)."
                    error={specialError}
                    success={specialSuccess}
                  />
                  <PasswordCondition
                    text="Must be 8-20 characters long."
                    error={lengthError}
                    success={lengthSuccess}
                  />
                </ul>
              </div>
            </div>
            <div className="row g-3 align-items-center">
              <div className="offset-4 col-4">
                <button
                  type="submit"
                  className={`btn btn-success w-100 ${
                    isPasswordValid && isEmailValid ? "" : "disabled"
                  }`}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
