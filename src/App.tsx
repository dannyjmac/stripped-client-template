import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Auth } from "./components/Auth";
import { Upload } from "./components/Upload";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { PaymentFlow } from "./components/PaymentFlow";

const App = () => {
  const [user, setUser] = useState<string>("");
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [invoice, setInvoice] = useState();

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

  const getInvoice = async () => {
    const data: any = await axios.get(
      `http://localhost:4008/api/generateInvoice`
    );
    setInvoice(data.data.invoice.payment_request);
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
      {/* TESTING WEBSOCKETS */}
      <button
        style={{ marginTop: 100, marginBottom: 100 }}
        onClick={getInvoice}
      >
        Get invoice
      </button>
      {invoice && <PaymentFlow invoice={invoice} setInvoice={setInvoice} />}
    </div>
  );
};

export default App;
