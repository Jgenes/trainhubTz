import { useRef } from "react";
import Modal from "./Modal";

/**
 * Small accessible confirmation dialog (replaces window.confirm).
 */
export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  busy = false,
  onConfirm,
  onCancel,
}) {
  const cancelRef = useRef(null);

  if (!open) return null;

  const requestClose = () => {
    if (!busy) onCancel();
  };

  return (
    <Modal
      onClose={requestClose}
      labelledBy="confirm-title"
      describedBy={description ? "confirm-description" : undefined}
      size="sm"
      initialFocusRef={cancelRef}
    >
      <div className="modal-header">
        <h2 className="modal-title" id="confirm-title">
          {title}
        </h2>
        <button
          type="button"
          className="btn-close"
          aria-label="Close dialog"
          onClick={onCancel}
          disabled={busy}
        />
      </div>

      {description ? (
        <div className="modal-body">
          <p className="mb-0 text-secondary-ink" id="confirm-description">
            {description}
          </p>
        </div>
      ) : null}

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary-ink"
          onClick={onCancel}
          ref={cancelRef}
          disabled={busy}
        >
          {cancelLabel}
        </button>
        <button
          type="button"
          className={`btn ${destructive ? "btn-danger" : "btn-primary"}`}
          onClick={onConfirm}
          disabled={busy}
        >
          {busy ? (
            <>
              <span className="spinner-border spinner-border-sm" aria-hidden="true" />
              Working…
            </>
          ) : (
            confirmLabel
          )}
        </button>
      </div>
    </Modal>
  );
}
