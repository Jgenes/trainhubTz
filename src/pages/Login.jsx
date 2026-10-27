import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axio";
import AuthLayout from "../components/AuthLayout";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

  const validate = () => {
    const nextErrors = {};
    if (!email.trim()) nextErrors.email = "Enter your email address.";
    if (!password) nextErrors.password = "Enter your password.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!validate()) {
      toast.error("Please complete the highlighted fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/login", { email, password });
      const data = response.data;

      /* Save email temporarily for the OTP page. */
      localStorage.setItem("loginEmail", email);

      toast.success(data.message || "OTP sent to your email. Please verify.");

      navigate("/otp-verification", { state: { email, from } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Log in"
      lead="Access your account to manage enrolments and continue learning."
      asideTitle="Pick up exactly where you left off."
      asideText="Your enrolments, certificates and course progress are waiting for you."
      footer={
        <>
          Don&apos;t have an account? <Link to="/register">Create one</Link>
        </>
      }
    >
      <form onSubmit={handleLogin} noValidate>
        <div className="field">
          <label className="form-label" htmlFor="login-email">
            Email address
          </label>
          <div className="input-with-icon">
            <i className="bi bi-envelope" aria-hidden="true" />
            <input
              id="login-email"
              type="email"
              className={`form-control${errors.email ? " is-invalid" : ""}`}
              placeholder="john@email.com"
              autoComplete="email"
              value={email}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "login-email-error" : undefined}
              onChange={(event) => {
                setEmail(event.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
            />
          </div>
          {errors.email ? (
            <span className="field-error" id="login-email-error">
              {errors.email}
            </span>
          ) : null}
        </div>

        <div className="field">
          <div className="d-flex justify-content-between align-items-center">
            <label className="form-label" htmlFor="login-password">
              Password
            </label>
            <button
              type="button"
              className="btn-quiet-link text-xs mb-1"
              onClick={() =>
                toast.info("Password reset will be available in a future release.")
              }
            >
              Forgot password?
            </button>
          </div>
          <div className="input-with-icon">
            <i className="bi bi-lock" aria-hidden="true" />
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              className={`form-control has-action${errors.password ? " is-invalid" : ""}`}
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "login-password-error" : undefined}
              onChange={(event) => {
                setPassword(event.target.value);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
            />
            <button
              type="button"
              className="input-action"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              <i
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                aria-hidden="true"
              />
            </button>
          </div>
          {errors.password ? (
            <span className="field-error" id="login-password-error">
              {errors.password}
            </span>
          ) : null}
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-2" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm" aria-hidden="true" />
              Sending OTP…
            </>
          ) : (
            "Log in"
          )}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Login;
