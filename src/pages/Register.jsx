import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { toast } from "react-toastify";
import api from "../api/axio";
import AuthLayout from "../components/AuthLayout";

function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {
    const nextErrors = {};
    if (!fullname.trim()) nextErrors.fullname = "Enter your full name.";
    if (!email.trim()) nextErrors.email = "Enter your email address.";
    if (!phone) nextErrors.phone = "Enter your phone number.";
    if (!password) nextErrors.password = "Choose a password.";
    if (!confirmPassword) nextErrors.confirmPassword = "Confirm your password.";
    else if (password && password !== confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!validate()) {
      toast.error("Please complete the highlighted fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/tenant-register", {
        name: fullname,
        email,
        phone,
        password,
        password_confirmation: confirmPassword,
      });

      toast.success(
        response.data.message ||
          "Registered successfully! Check your email to activate your account."
      );

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create an account"
      lead="Create your account and start your learning journey."
      asideTitle="Start learning with Tanzania's training marketplace."
      asideText="One account gives you access to every provider on TrainingHub."
      footer={
        <>
          Already have an account? <Link to="/login">Log in</Link>
        </>
      }
    >
      <form onSubmit={handleRegister} noValidate>
        <div className="form-grid form-grid--2">
          <div className="field mb-0">
            <label className="form-label" htmlFor="register-name">
              Full name
            </label>
            <div className="input-with-icon">
              <i className="bi bi-person" aria-hidden="true" />
              <input
                id="register-name"
                type="text"
                className={`form-control${errors.fullname ? " is-invalid" : ""}`}
                placeholder="John Doe"
                autoComplete="name"
                value={fullname}
                aria-invalid={Boolean(errors.fullname)}
                onChange={(event) => {
                  setFullname(event.target.value);
                  if (errors.fullname) setErrors({ ...errors, fullname: undefined });
                }}
              />
            </div>
            {errors.fullname ? <span className="field-error">{errors.fullname}</span> : null}
          </div>

          <div className="field mb-0">
            <label className="form-label" htmlFor="register-email">
              Email address
            </label>
            <div className="input-with-icon">
              <i className="bi bi-envelope" aria-hidden="true" />
              <input
                id="register-email"
                type="email"
                className={`form-control${errors.email ? " is-invalid" : ""}`}
                placeholder="john@email.com"
                autoComplete="email"
                value={email}
                aria-invalid={Boolean(errors.email)}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
              />
            </div>
            {errors.email ? <span className="field-error">{errors.email}</span> : null}
          </div>
        </div>

        <div className="field mt-4">
          <label className="form-label" htmlFor="register-phone">
            Phone number
          </label>
          <PhoneInput
            country="tz"
            value={phone}
            onChange={(value) => {
              setPhone(value ? `+${value}` : "");
              if (errors.phone) setErrors({ ...errors, phone: undefined });
            }}
            placeholder="Enter phone number"
            inputProps={{ id: "register-phone", autoComplete: "tel" }}
            containerStyle={{ width: "100%" }}
            inputStyle={{ width: "100%" }}
          />
          {errors.phone ? <span className="field-error">{errors.phone}</span> : null}
        </div>

        <div className="field">
          <label className="form-label" htmlFor="register-password">
            Password
          </label>
          <div className="input-with-icon">
            <i className="bi bi-lock" aria-hidden="true" />
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              className={`form-control has-action${errors.password ? " is-invalid" : ""}`}
              placeholder="Create a password"
              autoComplete="new-password"
              value={password}
              aria-invalid={Boolean(errors.password)}
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
          {errors.password ? <span className="field-error">{errors.password}</span> : null}
        </div>

        <div className="field">
          <label className="form-label" htmlFor="register-confirm">
            Confirm password
          </label>
          <div className="input-with-icon">
            <i className="bi bi-lock" aria-hidden="true" />
            <input
              id="register-confirm"
              type={showPassword ? "text" : "password"}
              className={`form-control${errors.confirmPassword ? " is-invalid" : ""}`}
              placeholder="Repeat your password"
              autoComplete="new-password"
              value={confirmPassword}
              aria-invalid={Boolean(errors.confirmPassword)}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                if (errors.confirmPassword) {
                  setErrors({ ...errors, confirmPassword: undefined });
                }
              }}
            />
          </div>
          {errors.confirmPassword ? (
            <span className="field-error">{errors.confirmPassword}</span>
          ) : null}
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm" aria-hidden="true" />
              Creating account…
            </>
          ) : (
            "Create account"
          )}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Register;
