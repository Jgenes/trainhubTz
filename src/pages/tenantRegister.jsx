import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { toast } from "react-toastify";
import api from "../api/axio";
import AuthLayout from "../components/AuthLayout";

/**
 * Provider (tenant) registration.
 * Note: this form intentionally keeps posting to `/tenant-register`, the same
 * endpoint used by the original implementation.
 */
function RegisterTenant() {
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
    if (!fullname.trim()) nextErrors.fullname = "Enter the organisation contact name.";
    if (!email.trim()) nextErrors.email = "Enter an email address.";
    if (!phone) nextErrors.phone = "Enter a phone number.";
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
          "Tenant registered successfully! Check your email to activate your account."
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
      title="Register as a training provider"
      lead="Create your provider account to publish courses and manage intakes."
      asideTitle="Reach learners across Tanzania."
      asideText="Publish training, open intakes and manage enrolments from one dashboard."
      points={[
        "Create courses and recurring cohorts",
        "Track seats, pricing and enrolment status",
        "Get discovered by learners on TrainingHub",
      ]}
      footer={
        <>
          Already registered? <Link to="/login">Log in</Link>
        </>
      }
    >
      <form onSubmit={handleRegister} noValidate>
        <div className="form-grid form-grid--2">
          <div className="field mb-0">
            <label className="form-label" htmlFor="tenant-name">
              Contact name
            </label>
            <div className="input-with-icon">
              <i className="bi bi-person" aria-hidden="true" />
              <input
                id="tenant-name"
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
            <label className="form-label" htmlFor="tenant-email">
              Work email
            </label>
            <div className="input-with-icon">
              <i className="bi bi-envelope" aria-hidden="true" />
              <input
                id="tenant-email"
                type="email"
                className={`form-control${errors.email ? " is-invalid" : ""}`}
                placeholder="name@organisation.com"
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
          <label className="form-label" htmlFor="tenant-phone">
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
            inputProps={{ id: "tenant-phone", autoComplete: "tel" }}
            containerStyle={{ width: "100%" }}
            inputStyle={{ width: "100%" }}
          />
          {errors.phone ? <span className="field-error">{errors.phone}</span> : null}
        </div>

        <div className="field">
          <label className="form-label" htmlFor="tenant-password">
            Password
          </label>
          <div className="input-with-icon">
            <i className="bi bi-lock" aria-hidden="true" />
            <input
              id="tenant-password"
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
          <label className="form-label" htmlFor="tenant-confirm">
            Confirm password
          </label>
          <div className="input-with-icon">
            <i className="bi bi-lock" aria-hidden="true" />
            <input
              id="tenant-confirm"
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
            "Create provider account"
          )}
        </button>
      </form>
    </AuthLayout>
  );
}

export default RegisterTenant;
