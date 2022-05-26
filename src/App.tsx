import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { observer } from "mobx-react-lite";

import { Auth } from "./components/Auth";
import { Home } from "./components/Home";
import { Navigation } from "./components/Navigation";
import { supabase } from "./config/supabase";
import { Page2 } from "./components/Page2";

const App = observer(() => {
  const [session, setSession] = useState<null | any>(null);

  useEffect(() => {
    const session = supabase.auth.session();

    if (session) {
      setSession(session);
    }

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session as any);
    });
  }, []);

  return (
    <div className="App">
      <ToastContainer
        autoClose={2500}
        position="top-right"
        closeButton={false}
      />
      {!session ? (
        <Auth />
      ) : (
        <>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/page-2" element={<Page2 />} />
          </Routes>
        </>
      )}
    </div>
  );
});

export default App;
