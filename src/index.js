import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";

import Registration from "./Registration";
import MainContainer from "./MainContainer/";

import "./index.scss";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/main" element={<MainContainer />} />
      <Route
        path="/registration"
        element={<Registration nameLink="login" nameButton="registration" />}
      />
      <Route path="/login" element={<Registration nameLink="registration" nameButton="login" />} />
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
