import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import api from "../api/axio";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("tenant");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!fullname || !email || !phone || !password) {
      return toast.error("All fields are required");
    }
    setLoading(true);
    try {
      const { data } = await api.post("/user/register", {
        fullname,
        email,
        phone,
        password,
        role,
      });
      toast.success(data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h3>Register</h3>
      <input
        className="form-control mb-2"
        placeholder="Full Name"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
      />
      <input
        className="form-control mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="form-control mb-2"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        className="form-control mb-2"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select
        className="form-control mb-2"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="tenant">Tenant</option>
        <option value="provider">Provider</option>
      </select>
      <button
        className="btn btn-primary"
        onClick={handleRegister}
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
}

export default Register;
