/**
 * Shared react-data-table-component styling so every provider table matches
 * the TrainingHub design system.
 */
const dataTableStyles = {
  tableWrapper: {
    style: {
      borderRadius: 0,
      border: 0,
    },
  },
  responsiveWrapper: {
    style: {
      minWidth: 0,
    },
  },
  headRow: {
    style: {
      backgroundColor: "var(--surface-subtle)",
      minHeight: "44px",
      borderBottom: "1px solid var(--border)",
    },
  },
  headCells: {
    style: {
      fontSize: "12px",
      fontWeight: 600,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      paddingLeft: "16px",
      paddingRight: "16px",
    },
  },
  rows: {
    style: {
      minHeight: "54px",
      fontSize: "14px",
      color: "var(--ink-800)",
      backgroundColor: "#ffffff",
    },
    highlightOnHoverStyle: {
      backgroundColor: "var(--surface-subtle)",
      outline: "none",
    },
  },
  cells: {
    style: {
      paddingLeft: "16px",
      paddingRight: "16px",
    },
  },
  pagination: {
    style: {
      borderTop: "1px solid var(--border)",
      minHeight: "52px",
      fontSize: "13px",
      color: "var(--text-secondary)",
    },
  },
  noData: {
    style: {
      padding: "2rem",
      color: "var(--text-muted)",
    },
  },
};

export default dataTableStyles;
