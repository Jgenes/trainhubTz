import { useRef } from "react";
import useDialogFocus from "../hooks/useDialogFocus";

/**
 * Shared dialog shell: overlay, `role="dialog"` panel, focus trap, Escape and
 * backdrop dismissal. Render children only when the dialog should be visible.
 */
export default function Modal({
  onClose,
  labelledBy,
  describedBy,
  size = "md",
  initialFocusRef,
  closeOnEscape = true,
  panelClassName = "",
  children,
}) {
  const panelRef = useRef(null);

  useDialogFocus(panelRef, { onClose, initialFocusRef, closeOnEscape });

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        ref={panelRef}
        className={`modal-content modal-content--${size} w-100 ${panelClassName}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
