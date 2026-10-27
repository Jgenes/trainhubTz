import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axio";
import AuthLayout from "../components/AuthLayout";

function OtpVerification() {
  const location = useLocation();
  const navigate = useNavigate();

  const emailFromState =
    location.state?.email || localStorage.getItem("loginEmail") || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerifyOtp = async (event) => {
    event.preventDefault();

    if (!otp.trim()) {
      setError("Enter the one-time code sent to your email.");
      toast.error("Please enter the OTP.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/verify-otp", {
        email: emailFromState,
        otp,
      });

      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user || {}));

      toast.success("Code verified. Welcome back!");

      localStorage.removeItem("loginEmail");

      /* Backend redirect wins; otherwise return to the page the guest wanted
         before the guard sent them to log in. */
      navigate(data.redirect || location.state?.from || "/");
    } catch (err) {
      const message = err.response?.data?.message || "Unable to verify the code.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Verify your email"
      lead={
        emailFromState ? (
          <>
            Enter the one-time code we sent to <strong>{emailFromState}</strong>.
          </>
        ) : (
          "Enter the one-time code we sent to your email."
        )
      }
      asideTitle="One quick step to keep your account secure."
      asideText="We verify every login with a one-time code to protect your account and enrolments."
      points={[
        "Codes are sent to your registered email address",
        "Never share your code with anyone",
        "Codes expire quickly for your security",
      ]}
      footer={
        <>
          Wrong email? <button
            type="button"
            className="btn-quiet-link"
            onClick={() => navigate("/login")}
          >
            Back to log in
          </button>
        </>
      }
    >
      <form onSubmit={handleVerifyOtp}>
        <div className="field">
          <label className="form-label" htmlFor="otp-code">
            One-time code
          </label>
          <input
            id="otp-code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            className={`form-control otp-input${error ? " is-invalid" : ""}`}
            placeholder="000000"
            maxLength={6}
            value={otp}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "otp-error" : "otp-hint"}
            onChange={(event) => {
              setOtp(event.target.value.replace(/\s/g, ""));
              if (error) setError("");
            }}
          />
          <p className="form-hint" id="otp-hint">
            6-digit code from your email. It expires after a few minutes.
          </p>
          {error ? (
            <span className="field-error" id="otp-error" role="alert">
              {error}
            </span>
          ) : null}
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm" aria-hidden="true" />
              Verifying…
            </>
          ) : (
            "Verify and continue"
          )}
        </button>
      </form>
    </AuthLayout>
  );
}

export default OtpVerification;
