import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import "./style.scss";

const Registration = ({ title, nameLink, nameButton }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repiatPassword, setRepiatPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/main");
    }
  }, []);

  const authorization = async (e) => {
    try {
      e.preventDefault();
      if (!login.match(/^(?=.*[A-Za-z])(?=.*\d)[\w]{8,}$/)) throw new Error("Bad login");
      if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[\w]{8,}$/)) throw new Error("Bad password");
      if (password !== repiatPassword && nameButton === "registration")
        return setErrMessage("Password mismatch");

      const result = await axios.post(`http://localhost:7000/${nameButton}`, { login, password });
      localStorage.setItem("token", result.data.accessToken);
      navigate("/main");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="containerRegistration">
      <div className="container-title">
        <h1>{nameButton}</h1>
        <Link
          component="button"
          variant="button"
          className="link"
          onClick={() => {
            navigate(`/${nameLink}`);
          }}
        >
          {nameLink}
        </Link>
      </div>
      <form onSubmit={authorization} className="form">
        <div className="container-input">
          <TextField
            required
            id="email"
            label="Email"
            autoComplete="off"
            value={login}
            onChange={(e) => {
              setLogin(e.target.value);
            }}
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {nameButton !== "login" && (
            <TextField
              required
              id="repiat-password"
              label="Repiat Password"
              type="password"
              value={repiatPassword}
              onChange={(e) => {
                setRepiatPassword(e.target.value);
              }}
            />
          )}
        </div>
        <Button type="submit" variant="contained" className="button-auth">
          {nameButton}
        </Button>
      </form>
      <Snackbar
        open={errMessage ? true : false}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        autoHideDuration={2000}
        onClose={() => setErrMessage("")}
      >
        <Alert severity="error">{errMessage}</Alert>
      </Snackbar>
    </div>
  );
};

export default Registration;
