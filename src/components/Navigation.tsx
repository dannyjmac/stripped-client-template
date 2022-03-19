import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Routes, Route, Link } from "react-router-dom";
import { useStore } from "../store";

export const Navigation = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const { authStore } = useStore();

  const logOut = async () => {
    authStore.setUser("");
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
