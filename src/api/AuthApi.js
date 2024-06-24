//! This file contains all the API calls related to Authentication

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Api call for user login
export const logIn = (formData) => API.post("/auth/login", formData);

// Api call for user registration
export const signUp = (formData) => API.post("/auth/register", formData);
