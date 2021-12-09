import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

import "./style.scss";

const Registration = ({ title, nameLink, nameButton }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repiatPassword, setRepiatPassword] = useState("");

  const navigate = useNavigate();

  const authorization = async (e) => {
    try {
      e.preventDefault();

      if (nameButton === "login") setRepiatPassword(password);

      if (password !== repiatPassword) return console.log("asdasd");

      const result = await axios.post(`http://localhost:7000/${nameButton}`, { login, password });

      navigate("/main");
    } catch (err) {
      console.log(err);
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
              display
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
        <Button type="submit" variant="contained" className="button-auth" on>
          {nameButton}
        </Button>
      </form>
    </div>
  );
};

export default Registration;
