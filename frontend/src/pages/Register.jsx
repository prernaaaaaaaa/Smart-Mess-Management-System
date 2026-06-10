import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [scholarNumber, setScholarNumber] = useState("");
  const [password, setPassword] = useState("");
  const [hostel, setHostel] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/register", {
        scholarNumber,
        password,
        hostel,
      });

      alert("Registration successful! 🎉");

      navigate("/");
    } catch (error) {
      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to right, #f8fafc, #eef2ff)",
      }}
    >
      <div
        style={{
          padding: "30px",
          background: "#fff",
          borderRadius: "16px",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.05)",
          width: "300px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          Register
        </h2>

        <input
          placeholder="Scholar Number"
          value={scholarNumber}
          onChange={(e) =>
            setScholarNumber(e.target.value)
          }
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={hostel}
          onChange={(e) =>
            setHostel(e.target.value)
          }
          style={{
            width: "100%",
            marginBottom: "20px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Select Hostel</option>

{Array.from({ length: 12 }, (_, i) => (
  <option key={i + 1} value={`Hostel ${i + 1}`}>
    Hostel {i + 1}
  </option>
))}
        </select>

        <button
          onClick={handleRegister}
          style={{
            width: "100%",
            padding: "10px",
            background: "#2563EB",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Register
        </button>

        <p
          style={{
            marginTop: "15px",
            textAlign: "center",
          }}
        >
          Already have an account?{" "}
          <Link to="/">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;