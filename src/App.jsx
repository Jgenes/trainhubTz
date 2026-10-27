import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

/* Public routes are eager so navigation stays instant. */
import Home from "./pages/Home";
import Course from "./pages/Course";
import Training from "./pages/trainings.jsx";
import Learning from "./pages/Learning";
import CourseLearning from "./pages/CourseLearning";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RegisterTenant from "./pages/tenantRegister";
import OtpVerification from "./pages/otpVerification.jsx";
import Onboarding from "./pages/Onboarding";
import ProviderVerification from "./pages/ProviderVerification";
import TrainingHubCheckout from "./pages/TrainingHubCheckout";
import NotFound from "./pages/NotFound.jsx";
import RequireAuth from "./components/RequireAuth";

/* Provider workspace is code-split: it pulls in the data table and chart libs. */
const ProviderDashboard = lazy(() => import("./pages/provider/dashboard.jsx"));
const ProviderCourse = lazy(() => import("./pages/provider/course.jsx"));
const ProviderCohorts = lazy(() => import("./pages/provider/ProviderCohort.jsx"));
const ProviderEnrollments = lazy(() =>
  import("./pages/provider/ProviderEnrollment.jsx")
);
const ProviderCourseView = lazy(() => import("./pages/provider/viewCoure.jsx"));
const CreateCourse = lazy(() => import("./pages/provider/createCourse.jsx"));
const CreateCohort = lazy(() => import("./pages/provider/createCohort.jsx"));
const CohortList = lazy(() => import("./pages/provider/cohortList.jsx"));

const pageTitles = {
  "/": "Professional training in Tanzania",
  "/course": "IBM RAG and Agentic AI Professional Certificate",
  "/trainings": "Browse trainings",
  "/learning": "My learning",
  "/courseLearning": "Course player",
  "/login": "Log in",
  "/register": "Create an account",
  "/tenant-register": "Register as a training provider",
  "/otp-verification": "Verify your email",
  "/tenant/onboarding": "Provider onboarding",
  "/provider/verification": "Verification in progress",
  "/checkout": "Checkout",
  "/provider/dashboard": "Provider dashboard",
  "/provider/course": "Courses",
  "/provider/cohorts": "Cohorts",
  "/provider/enrollments": "Enrolments",
  "/provider/createCourse": "Create course",
};

function getPageTitle(pathname) {
  if (pageTitles[pathname]) return pageTitles[pathname];
  if (pathname.startsWith("/provider/cohorts/")) return "Cohorts";
  if (pathname.startsWith("/provider/viewCourse/")) return "Course details";
  return "Page not found";
}

/** Keeps the document title in sync and resets scroll on navigation. */
function RouteMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `${getPageTitle(pathname)} · TrainingHub`;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function WorkspaceFallback() {
  return (
    <div className="app">
      <div className="app-shell">
        <div className="app-content">
          <div className="panel d-flex align-items-center gap-2" role="status">
            <span className="spinner-border spinner-border-sm" aria-hidden="true" />
            Loading workspace…
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <RouteMeta />
      <Suspense fallback={<WorkspaceFallback />}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/tenant-register" element={<RegisterTenant />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tenant/onboarding" element={<Onboarding />} />
          <Route path="/course" element={<Course />} />
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<TrainingHubCheckout />} />
          <Route path="/provider/dashboard" element={<ProviderDashboard />} />
          <Route path="/provider/course" element={<ProviderCourse />} />
          <Route path="/provider/cohorts" element={<ProviderCohorts />} />
          <Route path="/provider/enrollments" element={<ProviderEnrollments />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route
            path="/learning"
            element={
              <RequireAuth>
                <Learning />
              </RequireAuth>
            }
          />
          <Route
            path="/courseLearning"
            element={
              <RequireAuth>
                <CourseLearning />
              </RequireAuth>
            }
          />
          <Route path="/provider/verification" element={<ProviderVerification />} />
          <Route path="/provider/createCourse" element={<CreateCourse />} />
          <Route path="/provider/viewCourse/:id" element={<ProviderCourseView />} />
          <Route path="/provider/cohorts/:courseId" element={<ProviderCohorts />} />
          <Route
            path="/provider/cohorts/create/:courseId"
            element={<CreateCohort />}
          />
          <Route path="/provider/cohortlist/:courseId" element={<CohortList />} />
          <Route path="/trainings" element={<Training />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
