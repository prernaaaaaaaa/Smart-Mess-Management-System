import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const [scholarNumber, setScholarNumber] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", {
        scholarNumber,
        password
      });

      // save token
      localStorage.setItem("token", res.data.token);

      // redirect to dashboard
      navigate("/dashboard");

    } catch (error) {
  console.log("ERROR:", error);
  console.log("DATA:", error.response?.data);
  alert(error.response?.data?.message || "Login failed");
}
  };

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(to right, #f8fafc, #eef2ff)"
    }}>
      <div style={{
        padding: "30px",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        width: "300px"
      }}>
        <h2 style={{ marginBottom: "20px" }}>Mess Login</h2>

        <input
          placeholder="Scholar Number"
          value={scholarNumber}
          onChange={(e) => setScholarNumber(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            marginBottom: "20px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "10px",
            background: "#2563EB",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;