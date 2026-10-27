import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Accessible dropdown menu.
 *
 * `trigger` is a render prop: ({ open, toggle, id }) => node.
 * Spread the returned `id`/`open` onto the trigger element as
 * `id`, `aria-expanded`, `aria-controls` and add `data-menu-trigger`
 * so Escape can restore focus.
 *
 * `children` is a render prop: ({ close }) => node.
 */
export default function Dropdown({ trigger, children, label, align = "end" }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const reactId = useId();
  const panelId = `menu-${reactId}`;

  const toggle = () => setOpen((value) => !value);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return undefined;

    const handlePointer = (event) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        wrapRef.current?.querySelector("[data-menu-trigger]")?.focus();
      }

      if (event.key === "ArrowDown") {
        const active = document.activeElement;
        if (active?.hasAttribute?.("data-menu-trigger") && active.closest(".menu") === wrapRef.current) {
          event.preventDefault();
          wrapRef.current
            ?.querySelector('.menu__item[role="menuitem"]')
            ?.focus();
        }
      }
    };

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("touchstart", handlePointer);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("touchstart", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div className="menu" ref={wrapRef}>
      {trigger({ open, toggle, id: panelId })}
      {open ? (
        <div
          className={`menu__panel${align === "end" ? " menu__panel--end" : ""}`}
          id={panelId}
          role="menu"
          aria-label={label}
        >
          {typeof children === "function" ? children({ close }) : children}
        </div>
      ) : null}
    </div>
  );
}

export function MenuItem({ icon, children, onClick, to, danger = false }) {
  const className = `menu__item${danger ? " menu__item--danger" : ""}`;
  const content = (
    <>
      {icon ? <i className={`bi ${icon}`} aria-hidden="true" /> : null}
      <span>{children}</span>
    </>
  );

  if (to) {
    return (
      <Link className={className} role="menuitem" to={to} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button className={className} type="button" role="menuitem" onClick={onClick}>
      {content}
    </button>
  );
}

export function MenuDivider() {
  return <div className="menu__divider" role="separator" />;
}
