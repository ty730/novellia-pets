import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const register = async (isAdmin) => {
    await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log('sdf')
        if (isAdmin) {
          navigate("/dashboard");
        } else {
          navigate("/create");
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div>
      <div style={{ marginTop: "150px" }}>
        <div
          className="text-color"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <form onSubmit={(e) => e.preventDefault()} style={{ width: "300px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "28px",
                fontWeight: "bold",
              }}
            >
              Register
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "24px",
              }}
            >
              <label
                htmlFor="text"
                style={{ cursor: "text", marginBottom: "4px" }}
              >
                Username
              </label>
              <input
                type="text"
                autoComplete="off"
                placeholder="Username"
                required
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ padding: "10px" }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "16px",
              }}
            >
              <label
                htmlFor="password"
                style={{ cursor: "text", marginBottom: "4px" }}
              >
                Password
              </label>
              <input
                type="password"
                autoComplete="off"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ padding: "10px" }}
              />
            </div>
            <div style={{ marginTop: "16px" }}>
              <button
                style={{
                  padding: "5px",
                  height: "36px",
                  width: "100%",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "3px",
                }}
                onClick={() => register(false)}
              >
                Register
              </button>
            </div>
            <div style={{ marginTop: "16px" }}>
              <button
                style={{
                  padding: "5px",
                  height: "36px",
                  width: "100%",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "3px",
                }}
                onClick={() => register(true)}
              >
                Register as Admin
              </button>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "16px",
                fontSize: "15px",
              }}
            >
              Already have an account?
              <span
                style={{
                  color: "#469d86",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/login")}
              >
                Log in
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
