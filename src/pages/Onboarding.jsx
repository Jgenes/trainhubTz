import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axio";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const steps = [
  "Company identity",
  "Address & location",
  "Primary contact",
  "Review & submit",
];

const providerTypes = [
  "Company",
  "University",
  "College",
  "Training Center",
  "NGO",
  "Government",
  "Individual Trainer",
];

const regions = [
  "Dar es Salaam",
  "Arusha",
  "Dodoma",
  "Mwanza",
  "Mbeya",
  "Morogoro",
  "Tanga",
  "Kilimanjaro",
];

const fieldLabels = {
  legal_name: "Legal name",
  brand_name: "Trading / brand name",
  provider_type: "Provider type",
  registration_ref: "Business registration (BRELA)",
  tin: "TIN",
  website: "Website / social link",
  country: "Country",
  region: "Region",
  district: "District / city",
  physical_address: "Physical address",
  google_maps_link: "Google Maps link",
  contact_name: "Contact name",
  contact_role: "Role / title",
  contact_phone: "Phone number",
  contact_email: "Email address",
};

function ProviderOnboardingFull() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    legal_name: "",
    brand_name: "",
    provider_type: "",
    registration_ref: "",
    tin: "",
    website: "",
    country: "Tanzania",
    region: "",
    district: "",
    physical_address: "",
    google_maps_link: "",
    contact_name: "",
    contact_role: "",
    contact_phone: "",
    contact_email: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const requiredByStep = [
    { legal_name: "Enter the provider's legal name.", provider_type: "Select a provider type." },
    { region: "Select the region where the provider operates." },
    {
      contact_name: "Enter the name of the primary contact.",
      contact_phone: "Enter a contact phone number.",
    },
    {},
  ];

  const validateStep = (index) => {
    const nextErrors = {};
    Object.entries(requiredByStep[index]).forEach(([field, message]) => {
      if (!String(form[field] || "").trim()) nextErrors[field] = message;
    });

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please complete the required fields.");
      return false;
    }

    return true;
  };

  const next = () => {
    if (!validateStep(step)) return;
    setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const back = () => setStep((current) => Math.max(current - 1, 0));

  const handleSubmit = async () => {
    for (let index = 0; index < steps.length - 1; index += 1) {
      if (!validateStep(index)) {
        setStep(index);
        return;
      }
    }

    setLoading(true);

    try {
      const res = await api.post("/provider/onboarding", form);
      toast.success(res.data.message || "Onboarding submitted successfully!");
      navigate("/provider/verification");
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <NavBar />

      <main id="main" className="page__main">
        <div className="container section--tight">
          <div className="container-narrow px-0">
            <header className="page-header">
              <div>
                <p className="eyebrow">For training providers</p>
                <h1 className="page-header__title">Provider onboarding</h1>
                <p className="page-header__lead">
                  Tell us about your organisation. We verify every provider before
                  courses go live.
                </p>
              </div>
            </header>

            <ol className="stepper">
              {steps.map((label, index) => (
                <li
                  key={label}
                  className={`step${index === step ? " is-active" : ""}${
                    index < step ? " is-done" : ""
                  }`}
                  aria-current={index === step ? "step" : undefined}
                >
                  <span className="step__num" aria-hidden="true">
                    {index < step ? <i className="bi bi-check-lg" /> : index + 1}
                  </span>
                  {label}
                </li>
              ))}
            </ol>

            <div className="panel">
              {step === 0 ? (
                <div className="form-grid form-grid--2">
                  <div className="field mb-0">
                    <label className="form-label" htmlFor="legal_name">
                      Legal name <span className="required-mark">*</span>
                    </label>
                    <input
                      id="legal_name"
                      className={`form-control${errors.legal_name ? " is-invalid" : ""}`}
                      name="legal_name"
                      value={form.legal_name}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.legal_name)}
                      autoComplete="organization"
                    />
                    {errors.legal_name ? (
                      <span className="field-error">{errors.legal_name}</span>
                    ) : null}
                  </div>

                  <div className="field mb-0">
                    <label className="form-label" htmlFor="brand_name">
                      Trading / brand name
                    </label>
                    <input
                      id="brand_name"
                      className="form-control"
                      name="brand_name"
                      value={form.brand_name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field mb-0">
                    <label className="form-label" htmlFor="provider_type">
                      Provider type <span className="required-mark">*</span>
                    </label>
                    <select
                      id="provider_type"
                      className={`form-select${errors.provider_type ? " is-invalid" : ""}`}
                      name="provider_type"
                      value={form.provider_type}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.provider_type)}
                    >
                      <option value="">Select provider type</option>
                      {providerTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.provider_type ? (
                      <span className="field-error">{errors.provider_type}</span>
                    ) : null}
                  </div>

                  <div className="field mb-0">
                    <label className="form-label" htmlFor="registration_ref">
                      Business registration (BRELA)
                    </label>
                    <input
                      id="registration_ref"
                      className="form-control"
                      name="registration_ref"
                      value={form.registration_ref}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field mb-0">
                    <label className="form-label" htmlFor="tin">
                      TIN
                    </label>
                    <input
                      id="tin"
                      className="form-control"
                      name="tin"
                      value={form.tin}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field mb-0">
                    <label className="form-label" htmlFor="website">
                      Website / social link
                    </label>
                    <input
                      id="website"
                      className="form-control"
                      name="website"
                      placeholder="https://"
                      value={form.website}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              ) : null}

              {step === 1 ? (
                <div className="form-grid form-grid--2">
                  <div className="field mb-0">
                    <label className="form-label" htmlFor="region">
                      Region <span className="required-mark">*</span>
                    </label>
                    <select
                      id="region"
                      className={`form-select${errors.region ? " is-invalid" : ""}`}
                      name="region"
                      value={form.region}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.region)}
                    >
                      <option value="">Select region</option>
                      {regions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                    {errors.region ? (
                      <span className="field-error">{errors.region}</span>
                    ) : null}
                  </div>

                  <div className="field mb-0">
                    <label className="form-label" htmlFor="district">
                      District / city
                    </label>
                    <input
                      id="district"
                      className="form-control"
                      name="district"
                      value={form.district}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field mb-0 field--full">
                    <label className="form-label" htmlFor="physical_address">
                      Physical address
                    </label>
                    <input
                      id="physical_address"
                      className="form-control"
                      name="physical_address"
                      value={form.physical_address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field mb-0 field--full">
                    <label className="form-label" htmlFor="google_maps_link">
                      Google Maps link
                    </label>
                    <input
                      id="google_maps_link"
                      className="form-control"
                      name="google_maps_link"
                      placeholder="https://maps.google.com/…"
                      value={form.google_maps_link}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="form-grid form-grid--2">
                  <div className="field mb-0">
                    <label className="form-label" htmlFor="contact_name">
                      Contact name <span className="required-mark">*</span>
                    </label>
                    <input
                      id="contact_name"
                      className={`form-control${errors.contact_name ? " is-invalid" : ""}`}
                      name="contact_name"
                      value={form.contact_name}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.contact_name)}
                    />
                    {errors.contact_name ? (
                      <span className="field-error">{errors.contact_name}</span>
                    ) : null}
                  </div>

                  <div className="field mb-0">
                    <label className="form-label" htmlFor="contact_role">
                      Role / title
                    </label>
                    <input
                      id="contact_role"
                      className="form-control"
                      name="contact_role"
                      value={form.contact_role}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="field mb-0">
                    <label className="form-label" htmlFor="contact_phone">
                      Phone number <span className="required-mark">*</span>
                    </label>
                    <input
                      id="contact_phone"
                      type="tel"
                      className={`form-control${errors.contact_phone ? " is-invalid" : ""}`}
                      name="contact_phone"
                      value={form.contact_phone}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.contact_phone)}
                    />
                    {errors.contact_phone ? (
                      <span className="field-error">{errors.contact_phone}</span>
                    ) : null}
                  </div>

                  <div className="field mb-0">
                    <label className="form-label" htmlFor="contact_email">
                      Email address
                    </label>
                    <input
                      id="contact_email"
                      type="email"
                      className="form-control"
                      name="contact_email"
                      value={form.contact_email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              ) : null}

              {step === 3 ? (
                <div>
                  <h2 className="h5 mb-3">Review details</h2>
                  <table className="review-table">
                    <tbody>
                      {Object.keys(form).map((key) => (
                        <tr key={key}>
                          <th scope="row">{fieldLabels[key] || key.replace(/_/g, " ")}</th>
                          <td>{form[key] || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}

              <div className="btn-row mt-5 pt-4 border-top">
                {step > 0 ? (
                  <button type="button" className="btn btn-secondary-ink" onClick={back}>
                    <i className="bi bi-arrow-left" aria-hidden="true" /> Back
                  </button>
                ) : null}

                {step < steps.length - 1 ? (
                  <button type="button" className="btn btn-primary ms-auto" onClick={next}>
                    Continue <i className="bi bi-arrow-right" aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary ms-auto"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          aria-hidden="true"
                        />
                        Submitting…
                      </>
                    ) : (
                      "Submit for verification"
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ProviderOnboardingFull;
