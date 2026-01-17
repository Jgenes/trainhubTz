export default function PromoCards() {
  return (
    <div className="container my-4 container3">
      <div className="row g-4">
        {/* LEFT CARD */}
        <div className="col-lg-6">
          <div className="promo-card" style={{ background: "#062864" }}>
            <div className="promo-left">
              <span className="promo-label">Training Hub</span>
              <h4 className="fw-bold">
                Turn your resolutions into results with 50% off TrainingHub
              </h4>
              <p style={{ fontSize: "13px" }}>
                Register here to get access of enrollment for different
                Trainings.
              </p>
              <button className="promo-btn mt-3">Register →</button>
            </div>
            <div className="promo-right">
              <img
                src="https://via.placeholder.com/180x120"
                alt=""
                className="img-fluid"
                style={{ maxHeight: "120px" }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT CARD */}
        <div className="col-lg-6">
          <div className="promo-card" style={{ background: "#0a59ff" }}>
            <div className="promo-left">
              <span className="promo-label">Training Hub for provider</span>
              <h4 className="fw-bold">
                Train your team in top skills and save 50%
              </h4>
              <p style={{ fontSize: "13px" }}>
                Get the skills you need to train your team through Training Hub
              </p>
              <button className="promo-btn mt-3">Became Provider →</button>
            </div>
            <div className="promo-right">
              <img
                src="https://via.placeholder.com/200x140"
                alt=""
                className="img-fluid rounded"
                style={{ maxHeight: "140px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
