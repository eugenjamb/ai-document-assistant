import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return await axios.post(`${API_BASE_URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const askQuestion = async (question) => {
  return await axios.post(`${API_BASE_URL}/ask`, { question });
};
