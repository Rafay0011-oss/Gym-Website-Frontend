const API_BASE = "http://localhost:5000/api";

/**
 * Generic fetch wrapper for API calls.
 * Automatically handles JSON, auth headers, and error responses.
 */
async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("fitclub_token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

// --- Auth API ---
export const authAPI = {
  register: (userData) =>
    apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  login: (credentials) =>
    apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  getProfile: () => apiFetch("/auth/me"),
};

// --- Contact API ---
export const contactAPI = {
  submit: (formData) =>
    apiFetch("/contact", {
      method: "POST",
      body: JSON.stringify(formData),
    }),
};

// --- Membership API ---
export const membershipAPI = {
  subscribe: (plan) =>
    apiFetch("/membership/subscribe", {
      method: "POST",
      body: JSON.stringify({ plan }),
    }),

  getStatus: () => apiFetch("/membership/status"),
};

// --- Newsletter API ---
export const newsletterAPI = {
  subscribe: (email) =>
    apiFetch("/newsletter/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
};
