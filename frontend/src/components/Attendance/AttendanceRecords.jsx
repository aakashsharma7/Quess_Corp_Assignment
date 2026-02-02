import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../UI/Card';
import EmptyState from '../UI/EmptyState';
import LoadingSpinner from '../UI/LoadingSpinner';
import { attendanceAPI } from '../../api/attendance';
import { employeeAPI } from '../../api/employees';

const AttendanceRecords = ({ records, loading }) => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [filteredRecords, setFilteredRecords] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        if (selectedEmployee) {
            setFilteredRecords(records.filter(r => r.employee_id === selectedEmployee));
        } else {
            setFilteredRecords(records);
        }
    }, [selectedEmployee, records]);

    const fetchEmployees = async () => {
        try {
            const data = await employeeAPI.getAll();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getStatusColor = (status) => {
        return status === 'Present'
            ? 'from-[#43e97b] to-[#38f9d7]'
            : 'from-[#fa709a] to-[#fee140]';
    };

    if (loading) {
        return (
            <Card>
                <LoadingSpinner message="Loading attendance records..." />
            </Card>
        );
    }

    return (
        <Card>
            {/* Header with Filter */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold text-white">Attendance Records</h2>

                <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-400">Filter by Employee:</label>
                    <select
                        value={selectedEmployee}
                        onChange={(e) => setSelectedEmployee(e.target.value)}
                        className="px-4 py-2 bg-[rgba(26,34,52,0.6)] border border-white/10 rounded-xl text-white text-sm transition-all duration-300 backdrop-blur-md focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] hover:border-white/20"
                    >
                        <option value="">All Employees</option>
                        {employees.map(emp => (
                            <option key={emp.employee_id} value={emp.employee_id}>
                                {emp.employee_id} - {emp.full_name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredRecords.length === 0 ? (
                <EmptyState
                    icon="📅"
                    message="No attendance records found"
                    description={selectedEmployee ? "No records for selected employee" : "Mark attendance using the form above"}
                />
            ) : (
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Employee Name</th>
                                <th>Department</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {filteredRecords.map((record, index) => (
                                    <motion.tr
                                        key={record.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3, delay: index * 0.03 }}
                                    >
                                        <td>
                                            <motion.span
                                                className="inline-block px-3 py-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-lg text-sm font-semibold"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                {record.employee_id}
                                            </motion.span>
                                        </td>
                                        <td className="font-medium text-white">{record.employee_name || 'N/A'}</td>
                                        <td>
                                            <motion.span
                                                className="inline-block px-3 py-1 bg-gradient-to-r from-[#4facfe] to-[#00f2fe] text-white rounded-lg text-sm font-semibold"
                                                whileHover={{ scale: 1.05, rotate: 2 }}
                                            >
                                                {record.employee_department || 'N/A'}
                                            </motion.span>
                                        </td>
                                        <td className="text-gray-400">{formatDate(record.date)}</td>
                                        <td>
                                            <motion.span
                                                className={`inline-block px-3 py-1 bg-gradient-to-r ${getStatusColor(record.status)} text-white rounded-lg text-sm font-semibold`}
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                {record.status === 'Present' ? '✅' : '❌'} {record.status}
                                            </motion.span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            )}
        </Card>
    );
};

export default AttendanceRecords;
