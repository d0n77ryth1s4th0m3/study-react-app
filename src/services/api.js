import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Employees API
export const employeesAPI = {
  // GET - получить всех сотрудников
  getAll: () => api.get('/securityEmployees'),
  
  // GET - получить сотрудника по ID
  getById: (id) => api.get(`/securityEmployees/${id}`),
  
  // POST - создать нового сотрудника
  create: (employeeData) => api.post('/securityEmployees', employeeData),
  
  // PUT - обновить сотрудника
  update: (id, employeeData) => api.put(`/securityEmployees/${id}`, employeeData),
  
  // DELETE - удалить сотрудника
  delete: (id) => api.delete(`/securityEmployees/${id}`),
};

// Incidents API
export const incidentsAPI = {
  getAll: () => api.get('/securityIncidents'),
  getById: (id) => api.get(`/securityIncidents/${id}`),
  create: (incidentData) => api.post('/securityIncidents', incidentData),
  update: (id, incidentData) => api.put(`/securityIncidents/${id}`, incidentData),
  delete: (id) => api.delete(`/securityIncidents/${id}`),
};

export default api;