import React from "react";
import Navbar from "./Navbar";
import Routers from "../routers/Routers";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div>
        <Routers />
      </div>
    </>
  );
};

export default Layout;
