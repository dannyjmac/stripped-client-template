import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

export const Navigation = ({ setUser, removeCookie }: any) => {
  const logOut = async () => {
    setUser("");
    removeCookie("user");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        margin: 100,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Link to="/">
        <div style={{ cursor: "pointer", margin: 20 }}>HOME</div>
      </Link>
      <Link to="/upload">
        <div style={{ cursor: "pointer", margin: 20 }}>UPLOAD</div>
      </Link>
      <div onClick={() => logOut()} style={{ cursor: "pointer", margin: 20 }}>
        LOGOUT
      </div>
    </div>
  );
};
