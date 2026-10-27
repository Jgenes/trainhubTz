import PDPC from "../assets/pdpc.png";
import NACTE from "../assets/NACTE.png";
import TCU from "../assets/TCU.png";
import TTCII from "../assets/TTCII.png";
import UDSM from "../assets/udsm.jpg";
import VETA from "../assets/VETA.png";
import OSHA from "../assets/OSHA.png";

const partners = [
  { title: "Personal Data Protection Committee", img: PDPC },
  { title: "National Council for Technical Education", img: NACTE },
  { title: "Tanzania Commission for Universities", img: TCU },
  { title: "Tanzanian Training Centre for International Health", img: TTCII },
  { title: "The University of Dar es Salaam", img: UDSM },
  { title: "Vocational Education and Training Authority", img: VETA },
  { title: "Occupational Safety and Health Authority", img: OSHA },
];

/**
 * Partner / accreditation strip.
 * Replaces the previous auto-advancing logo slider: a static, wrapped list is
 * easier to scan, has no motion and works at every breakpoint.
 */
export default function PartnerStrip() {
  return (
    <div className="partners">
      <div className="partners__head">
        <h2 className="partners__title">
          Learn from leading universities &amp; organizations
        </h2>
        <span className="partners__note">
          Accredited institutions and regulators training with TrainHub TZ
        </span>
      </div>

      <ul className="partners__list list-unstyled mb-0" role="list">
        {partners.map((partner) => (
          <li className="partner" key={partner.title}>
            <span className="partner__logo">
              <img src={partner.img} alt="" loading="lazy" />
            </span>
            <span className="partner__name">{partner.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
