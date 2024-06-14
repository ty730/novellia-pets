import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        minHeight: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "left",
        paddingTop: "8px",
        paddingBottom: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          marginBottom: "3px",
          paddingLeft: "24px",
          paddingRight: "24px",
          height: "100%",
          alignItems: "center",
          cursor: "pointer",
          fontSize: "18px",
          fontWeight: "500",
        }}
        onClick={() => navigate("/")}
      >
        Novellia
        <span
          style={{
            color: "#469d86",
            fontWeight: "bold",
            marginLeft: "3px",
          }}
        >
          Pets
        </span>
      </div>
    </div>
  );
};

export default Navbar;
