import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("buildworks_user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const authAPI = {
  login: (data) => api.post("/auth/login", data),
  me: () => api.get("/auth/me"),
};

export const projectsAPI = {
  getAll: (params) => api.get("/projects", { params }),
  getOne: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post("/projects", data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  remove: (id) => api.delete(`/projects/${id}`),
  upload: (formData) =>
    api.post("/projects/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

export const contactAPI = {
  submit: (data) => api.post("/contact", data),
  getAll: () => api.get("/contact"),
  updateStatus: (id, status) => api.put(`/contact/${id}`, { status }),
  remove: (id) => api.delete(`/contact/${id}`),
};

export const testimonialsAPI = {
  getAll: () => api.get("/testimonials"),
};

export default api;
