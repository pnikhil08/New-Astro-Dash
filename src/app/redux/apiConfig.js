const API_BASE_URL = "https://webdemo.dhwaniastro.co.in/api/";

export const API_ENDPOINTS = {
  CHAT_HISTORY: `${API_BASE_URL}expertchathistory?expert_id=1191`,
  CALL_HISTORY: `${API_BASE_URL}call-history`,
  LOGIN_DASHBOARD: `${API_BASE_URL}login`,
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export default API_BASE_URL;
