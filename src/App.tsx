import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer } from "react-toastify";
import { observer } from "mobx-react-lite";

import { useStore } from "./store";
import { Auth } from "./components/Auth";
import { Upload } from "./components/Upload";
import { Home } from "./components/Home";
import { ViewVideo } from "./components/ViewVideo";
import { Navigation } from "./components/Navigation";

const App = observer(() => {
  const { authStore } = useStore();
  const [cookies, setCookie] = useCookies(["user"]);

  // If user loads app and has a user cookie, update the state
  useEffect(() => {
    if (cookies.user && !authStore.currentUser) {
      authStore.setUser(cookies.user);
    }
  });

  // If the state updates, but there is no cookie, update cookie
  useEffect(() => {
    if (authStore.currentUser && !cookies.user) {
      setCookie("user", authStore.currentUser.token, {
        path: "/",
        expires: new Date(2025, 11, 24, 10, 33, 30, 0),
      });
    }
  }, [authStore.currentUser]);

  const { currentUser } = authStore;

  return (
    <div className="App">
      <ToastContainer
        autoClose={2500}
        position="top-right"
        closeButton={false}
      />
      {!currentUser ? (
        <Auth />
      ) : (
        <>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/view/:id" element={<ViewVideo />} />
          </Routes>
        </>
      )}
    </div>
  );
});

export default App;
