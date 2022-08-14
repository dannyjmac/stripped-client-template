import "./App.css";

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { observer } from "mobx-react-lite";

import { Home } from "./components/Home";
import { Navigation } from "./components/Navigation";
import { Page2 } from "./components/Page2";

const App = observer(() => {
  return (
    <div className="App">
      <>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page-2" element={<Page2 />} />
        </Routes>
      </>
    </div>
  );
});

export default App;
