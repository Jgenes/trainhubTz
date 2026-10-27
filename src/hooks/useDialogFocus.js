import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

/**
 * Keeps keyboard focus inside an open dialog.
 *
 * - moves focus to `initialFocusRef` (or the first focusable element)
 * - cycles Tab / Shift+Tab within the dialog
 * - closes on Escape (unless `closeOnEscape` is false)
 * - locks background scrolling
 * - restores focus to the element that opened the dialog
 */
export default function useDialogFocus(
  containerRef,
  { onClose, initialFocusRef, closeOnEscape = true } = {}
) {
  // Keep the latest callback in a ref so re-renders never restart the effect
  // (which would steal focus or re-lock scrolling mid-interaction).
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableItems = () =>
      Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        (element) => element.offsetWidth > 0 || element.offsetHeight > 0
      );

    const initialTarget = initialFocusRef?.current ?? focusableItems()[0] ?? container;
    initialTarget.focus?.({ preventScroll: true });

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && closeOnEscape) {
        event.stopPropagation();
        onCloseRef.current?.();
        return;
      }

      if (event.key !== "Tab") return;

      const items = focusableItems();
      if (items.length === 0) {
        event.preventDefault();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const inside = container.contains(active);

      if (event.shiftKey && (active === first || !inside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !inside)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement && document.contains(previouslyFocused)) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [containerRef, initialFocusRef, closeOnEscape]);
}
