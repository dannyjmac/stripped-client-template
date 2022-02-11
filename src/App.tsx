import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Auth } from "./components/Auth";
import { Upload } from "./components/Upload";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const App = () => {
  const [user, setUser] = useState<string>("");
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const handleUserSession = (token: string) => {
    setUser(token);
    setCookie("user", token, { path: "/" });
  };

  const logOut = async () => {
    setUser("");
    removeCookie("user");
  };

  const checkUserCookie = () => {
    if (cookies.user) setUser(cookies.user);
  };

  useEffect(() => {
    checkUserCookie();
  }, []);

  return (
    <div className="App">
      <ToastContainer
        autoClose={2500}
        position="top-right"
        closeButton={false}
      />
      {!user ? (
        <Auth handleUserSession={handleUserSession} />
      ) : (
        <Upload logOut={logOut} />
      )}
    </div>
  );
};

export default App;
