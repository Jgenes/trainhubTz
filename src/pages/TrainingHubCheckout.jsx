import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const paymentMethods = [
  "M-Pesa (Vodacom)",
  "Airtel Money",
  "Tigo Pesa",
  "Bank Transfer",
];

const TrainingHubCheckout = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!paymentMethod) {
      setError("Select a payment method to continue.");
      toast.error("Select a payment method to continue.");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the terms and conditions to continue.");
      toast.error("Please accept the terms and conditions to continue.");
      return;
    }

    setError("");
    toast.info("Payment processing will be connected to the enrolment API.");
  };

  return (
    <div className="page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <NavBar />

      <main id="main" className="page__main">
        <div className="container section--tight">
          <nav className="breadcrumb-bar" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <i className="bi bi-chevron-right" aria-hidden="true" />
            <Link to="/course">Course</Link>
            <i className="bi bi-chevron-right" aria-hidden="true" />
            <span aria-current="page">Checkout</span>
          </nav>

          <header className="page-header">
            <div>
              <h1 className="page-header__title">Checkout</h1>
              <p className="page-header__lead">
                Confirm your details and choose how you would like to pay.
              </p>
            </div>
            <span className="tag tag--accent">
              <i className="bi bi-shield-lock" aria-hidden="true" /> Secure checkout
            </span>
          </header>

          <form onSubmit={handleSubmit} className="checkout-grid" noValidate>
            <div className="panel">
              <h2 className="form-section__title">Billing &amp; contact information</h2>

              <div className="form-grid">
                <div>
                  <label className="form-label" htmlFor="checkout-name">
                    Full name
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    className="form-control"
                    placeholder="Ngutu Joseph"
                    autoComplete="name"
                  />
                </div>

                <div className="form-grid form-grid--2">
                  <div>
                    <label className="form-label" htmlFor="checkout-email">
                      Email address
                    </label>
                    <input
                      id="checkout-email"
                      type="email"
                      className="form-control"
                      placeholder="joseph@email.com"
                      autoComplete="email"
                    />
                  </div>

                  <div>
                    <label className="form-label" htmlFor="checkout-phone">
                      Phone number
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      className="form-control"
                      placeholder="+255 7XX XXX XXX"
                      autoComplete="tel"
                    />
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h2 className="form-section__title">Billing address</h2>

                <div className="form-grid">
                  <div>
                    <label className="form-label" htmlFor="checkout-street">
                      Street address
                    </label>
                    <input
                      id="checkout-street"
                      type="text"
                      className="form-control"
                      placeholder="Plot 123, Sam Nujoma Road"
                      autoComplete="street-address"
                    />
                  </div>

                  <div className="form-grid form-grid--2">
                    <div>
                      <label className="form-label" htmlFor="checkout-city">
                        City
                      </label>
                      <input
                        id="checkout-city"
                        type="text"
                        className="form-control"
                        placeholder="Dar es Salaam"
                        autoComplete="address-level2"
                      />
                    </div>

                    <div>
                      <label className="form-label" htmlFor="checkout-region">
                        Region / state
                      </label>
                      <input
                        id="checkout-region"
                        type="text"
                        className="form-control"
                        placeholder="Kinondoni"
                        autoComplete="address-level1"
                      />
                    </div>
                  </div>

                  <div className="form-grid form-grid--2">
                    <div>
                      <label className="form-label" htmlFor="checkout-country">
                        Country
                      </label>
                      <select
                        id="checkout-country"
                        className="form-select"
                        defaultValue="Tanzania"
                        autoComplete="country-name"
                      >
                        <option value="">Select country</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Kenya">Kenya</option>
                        <option value="Rwanda">Rwanda</option>
                      </select>
                    </div>

                    <div>
                      <label className="form-label" htmlFor="checkout-postal">
                        Postal code
                      </label>
                      <input
                        id="checkout-postal"
                        type="text"
                        className="form-control"
                        placeholder="00255"
                        autoComplete="postal-code"
                      />
                    </div>
                  </div>

                  <div className="form-grid form-grid--2">
                    <div>
                      <label className="form-label" htmlFor="checkout-company">
                        Company / organization{" "}
                        <span className="optional">(optional)</span>
                      </label>
                      <input
                        id="checkout-company"
                        type="text"
                        className="form-control"
                        placeholder="ABC Technologies Ltd"
                        autoComplete="organization"
                      />
                    </div>

                    <div>
                      <label className="form-label" htmlFor="checkout-tin">
                        TIN <span className="optional">(optional)</span>
                      </label>
                      <input
                        id="checkout-tin"
                        type="text"
                        className="form-control"
                        placeholder="TIN12345678"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h2 className="form-section__title" id="payment-method-title">
                  Payment method
                </h2>

                <div
                  className="payment-list"
                  role="radiogroup"
                  aria-labelledby="payment-method-title"
                >
                  {paymentMethods.map((method) => (
                    <label
                      key={method}
                      className={`payment-option${
                        paymentMethod === method ? " is-selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        className="form-check-input"
                        name="payment-method"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={() => {
                          setPaymentMethod(method);
                          if (error) setError("");
                        }}
                      />
                      <span className="payment-option__label">{method}</span>
                    </label>
                  ))}
                </div>

                <div className="form-check mt-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="checkout-terms"
                    checked={acceptedTerms}
                    onChange={(event) => {
                      setAcceptedTerms(event.target.checked);
                      if (error) setError("");
                    }}
                  />
                  <label className="form-check-label" htmlFor="checkout-terms">
                    I agree to the terms &amp; conditions
                  </label>
                </div>

                {error ? (
                  <div className="form-error-summary mt-3" role="alert">
                    <i className="bi bi-exclamation-circle" aria-hidden="true" />
                    {error}
                  </div>
                ) : null}

                <button type="submit" className="btn btn-primary w-100 mt-4">
                  <i className="bi bi-lock" aria-hidden="true" />
                  Complete payment
                </button>
              </div>
            </div>

            <aside className="panel order-summary" aria-labelledby="order-summary-title">
              <h2 className="form-section__title" id="order-summary-title">
                Order summary
              </h2>

              <div className="panel panel--muted mb-4">
                <h3 className="h6 mb-1">Personal Data Protection Training</h3>
                <p className="text-xs text-muted-ink mb-1">
                  Provider: IBM Skills Network
                </p>
                <p className="text-xs text-muted-ink mb-1">
                  Mode: Online • Duration: 8 Weeks
                </p>
                <p className="text-xs text-muted-ink mb-0">Start date: 15 Feb 2026</p>
              </div>

              <div className="order-line">
                <span>Course fee</span>
                <span>$20 USD</span>
              </div>
              <div className="order-line">
                <span>Tax</span>
                <span>$0</span>
              </div>

              <div className="order-line order-line--total">
                <span>Total</span>
                <span>$20 USD</span>
              </div>

              <p className="trust-note">
                <i className="bi bi-envelope-check" aria-hidden="true" />
                Payment confirmation will be sent to your email and phone number.
              </p>
            </aside>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TrainingHubCheckout;
