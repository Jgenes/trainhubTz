/**
 * Single place that knows where the session lives.
 * The token/user are written by the OTP step (`src/pages/otpVerification.jsx`)
 * and cleared on log out.
 */
const TOKEN_KEY = "token";
const USER_KEY = "user";

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return Boolean(getToken());
}

export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "{}") || {};
  } catch {
    return {};
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem("role");
  } catch {
    /* storage unavailable — nothing to clear */
  }
}

export function getDisplayName(user) {
  if (user?.name) return user.name;
  if (user?.email) return user.email.split("@")[0];
  return "My account";
}

export function getInitials(user) {
  const name = getDisplayName(user);
  const parts = name.trim().split(/\s+/).slice(0, 2);
  const initials = parts.map((part) => part.charAt(0)).join("");
  return (initials || "U").toUpperCase();
}
