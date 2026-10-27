/**
 * Keyboard support for the ARIA tabs pattern: ArrowLeft/ArrowRight move
 * between tabs (wrapping), Home/End jump to the first/last tab. Combined with
 * a roving tabindex, only the selected tab sits in the tab order.
 */
export default function useTabKeys({ ids, activeId, onChange, idPrefix }) {
  return (event) => {
    const index = ids.indexOf(activeId);
    if (index === -1) return;

    let nextId = null;

    switch (event.key) {
      case "ArrowRight":
        nextId = ids[(index + 1) % ids.length];
        break;
      case "ArrowLeft":
        nextId = ids[(index - 1 + ids.length) % ids.length];
        break;
      case "Home":
        nextId = ids[0];
        break;
      case "End":
        nextId = ids[ids.length - 1];
        break;
      default:
        return;
    }

    event.preventDefault();
    onChange(nextId);
    document.getElementById(`${idPrefix}${nextId}`)?.focus();
  };
}
