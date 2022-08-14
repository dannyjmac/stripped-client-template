import { Link } from "react-router-dom";
import { useStore } from "../store";

export const Navigation = () => {
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
        <div style={{ cursor: "pointer", margin: 20 }}>PAGE 1</div>
      </Link>
      <Link to="/page-2">
        <div style={{ cursor: "pointer", margin: 20 }}>PAGE 2</div>
      </Link>
    </div>
  );
};
