import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

/**
 * Guards learner-only pages ("My learning", the course player).
 * Guests are sent to the login screen and returned to the page they asked
 * for once they have verified their one-time code.
 */
export default function RequireAuth({ children }) {
  const location = useLocation();

  if (!isAuthenticated()) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  return children;
}
