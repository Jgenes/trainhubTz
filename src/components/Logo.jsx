import { Link } from "react-router-dom";
import logoOnLight from "../assets/trainhub-logo.png";
import logoOnDark from "../assets/trainhub-logo-inverse.png";

/**
 * TrainHub TZ brand lockup (globe + wordmark).
 *
 * `inverse` switches to the white-wordmark artwork used on the navy footer
 * and provider sidebar. The lockup already contains the wordmark, so the
 * image carries the accessible name and no duplicate text is rendered.
 */
export default function Logo({ inverse = false, to = "/", size = "md" }) {
  return (
    <Link className={`brand brand--${size}`} to={to} aria-label="TrainHub TZ — home">
      <img
        className="brand__logo"
        src={inverse ? logoOnDark : logoOnLight}
        alt="TrainHub TZ"
        width="346"
        height="62"
      />
    </Link>
  );
}
