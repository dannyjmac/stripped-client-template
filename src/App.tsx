import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Auth } from "./components/Auth";
import { Upload } from "./components/Upload";
import { Home } from "./components/Home";
import { Viewer } from "./components/Viewer";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { Routes, Route, Link } from "react-router-dom";
import { Navigation } from "./components/Navigation";

const App = () => {
  const [user, setUser] = useState<string>("");
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const checkUserCookie = () => {
    if (cookies.user) setUser(cookies.user);
  };

  useEffect(() => {
    checkUserCookie();
  });

  const handleUserSession = (token: string) => {
    setUser(token);
    setCookie("user", token, {
      path: "/",
      expires: new Date(2025, 11, 24, 10, 33, 30, 0),
    });
  };

  return (
    <div className="App">
      <ToastContainer
        autoClose={2500}
        position="top-right"
        closeButton={false}
      />
      {!user ? (
        <Auth
          setUser={setUser}
          setCookie={setCookie}
          handleUserSession={handleUserSession}
        />
      ) : (
        <>
          <Navigation
            cookies={cookies}
            removeCookie={removeCookie}
            checkUserCookie={checkUserCookie}
            setUser={setUser}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload user={user} />} />
            <Route path="/view" element={<Viewer />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default App;
