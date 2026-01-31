import apiClient from './client';

export const attendanceAPI = {
    // Get all attendance records
    getAll: async () => {
        const response = await apiClient.get('/api/attendance');
        return response.data;
    },

    // Get attendance for specific employee
    getByEmployee: async (employeeId) => {
        const response = await apiClient.get(`/api/attendance/${employeeId}`);
        return response.data;
    },

    // Mark attendance
    mark: async (attendanceData) => {
        const response = await apiClient.post('/api/attendance', attendanceData);
        return response.data;
    },
};
