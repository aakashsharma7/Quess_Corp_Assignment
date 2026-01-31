import apiClient from './client';

export const employeeAPI = {
    // Get all employees
    getAll: async () => {
        const response = await apiClient.get('/api/employees');
        return response.data;
    },

    // Create new employee
    create: async (employeeData) => {
        const response = await apiClient.post('/api/employees', employeeData);
        return response.data;
    },

    // Delete employee
    delete: async (employeeId) => {
        const response = await apiClient.delete(`/api/employees/${employeeId}`);
        return response.data;
    },
};
