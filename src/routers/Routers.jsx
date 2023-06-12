import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Home, Login, Signup, PageNotFound } from "../pages";
import { useAuthContext } from "../hooks/useAuthContext";

const Routers = () => {
  const { user } = useAuthContext();

  return (
    <Routes>
      <Route
        path="/"
        exact
        element={user ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        exact
        element={!user ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/signup"
        exact
        element={!user ? <Signup /> : <Navigate to="/" />}
      />
      <Route path="/logout" exact element={<Navigate to="/" />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Routers;
