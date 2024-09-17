import axios from 'axios';

// Use environment variables for sensitive data
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register/`, userData);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login/`, credentials);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const getProfile = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profile/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const addBook = async (bookData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/books/`, bookData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const getBooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const getBook = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/books/${id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const updateBook = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/books/${id}/`, updatedData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/books/${id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

// Centralized error handling
const handleError = (error) => {
  if (error.response) {
    console.error("API Error Response:", error.response.data);
    // You can add more sophisticated error handling here
  } else if (error.request) {
    console.error("API Error Request:", error.request);
  } else {
    console.error("API Error Message:", error.message);
  }
};
