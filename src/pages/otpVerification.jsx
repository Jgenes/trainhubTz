import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import api from "../api/axio";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function OtpVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const emailFromState =
    location.state?.email || localStorage.getItem("loginEmail");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("OTP is required");
      return;
    }

    setLoading(true);

    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });
      const response = await api.post("/verify-otp", {
        email: emailFromState,
        otp,
      });

      const data = response.data;

      // Save token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user || {}));

      toast.success("OTP verified successfully!");

      // Redirect to backend-provided path
      if (data.redirect) {
        navigate(data.redirect);
      } else {
        navigate("/dashboard"); // fallback
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container py-5">
        <ToastContainer />

        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card shadow-sm border-0">
              <div className="card-body p-4">
                <h3 className="text-left fw-bold mb-2">OTP Verification</h3>
                <p className="text-left">
                  Enter the OTP sent to your email: {emailFromState}
                </p>

                <div className="mb-4">
                  <label className="form-label">OTP</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-primary w-100 py-2"
                  onClick={handleVerifyOtp}
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OtpVerification;
