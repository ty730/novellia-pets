import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    const base64Credentials = btoa(`${username}:${password}`);
    await fetch("http://localhost:3000/api/auth", {
      method: "GET",
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          navigate("/dashboard");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div style={{ marginTop: "150px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <form onSubmit={(e) => e.preventDefault()} style={{ width: "300px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "28px",
                fontWeight: "bold",
              }}
            >
              Login
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
                onClick={() => login()}
              >
                Login
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
              Don't have an account?
              <span
                style={{
                  color: "#469d86",
                  marginLeft: "5px",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/register")}
              >
                Sign up
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
