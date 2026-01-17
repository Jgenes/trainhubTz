import NavBar from "../components/NavBar";
import Banner1 from "../assets/banner1.jpg";
import Career from "../assets/carrer.png";
import Skills from "../assets/skills.png";
import GraduationCap from "../assets/graduationCap.png";
import CardSlider from "../components/CardSlider";
import NewReleaseCourses from "../components/NewReleasesCourses";
import CategoryChips from "../components/CategoryChips";
import PromoCards from "../components/PromoCards";
import Footer from "../components/Footer";
import HeroBanner from "../components/HeroBanner";
import "../App.css";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="banner1">
        <img src={Banner1} alt="Banner 1" className="img-fluid w-100" />
        <div className="card1">
          <h3>A big year starts with big savings</h3>
          <p>
            vMake your plans for 2026. Get courses from $9.99 to help you get
            there. Our sale ends January 13.
          </p>
          <button className="btn btn-primary mt-auto enrollmentButton">
            Browse Training
          </button>
        </div>
      </div>
      <div className="container c1">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card card2">
              <h5>Get in-demand skills</h5>
              <img
                src={Career}
                alt="Career"
                className="img-fluid"
                style={{ height: "38px", width: "auto" }}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card2">
              <h5>Launch a new carrer</h5>
              <img
                src={Skills}
                alt="Career"
                className="img-fluid"
                style={{ height: "37px", width: "auto" }}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card2">
              <h5>Earn a certificate</h5>
              <img
                src={GraduationCap}
                alt="Career"
                className="img-fluid"
                style={{ height: "38px", width: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
      <HeroBanner />
      <CardSlider />

      <NewReleaseCourses />
      <div className="container container2">
        <h3 className="mb-3">Categories</h3>
        <CategoryChips />
      </div>
      <NewReleaseCourses />
      <PromoCards />
      <Footer />
    </>
  );
}
