import { Link } from "react-router-dom";

const MARK_SRC = "/favicon.svg";

/**
 * TrainingHub brand lockup.
 * `inverse` renders the wordmark in white for dark surfaces.
 */
export default function Logo({ inverse = false, subtitle = "Training marketplace", to = "/" }) {
  return (
    <Link className="brand" to={to} style={inverse ? { color: "#fff" } : undefined}>
      <img className="brand__mark" src={MARK_SRC} alt="" width="32" height="32" />
      <span className="brand__name">
        TrainingHub
        {subtitle ? <small>{subtitle}</small> : null}
      </span>
    </Link>
  );
}
