import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import Card from '../UI/Card';
import Button from '../UI/Button';
import EmptyState from '../UI/EmptyState';
import LoadingSpinner from '../UI/LoadingSpinner';
import { employeeAPI } from '../../api/employees';

const EmployeeList = ({ employees, loading, onEmployeeDeleted }) => {
    const [deletingId, setDeletingId] = useState(null);

    const handleDelete = async (employeeId) => {
        if (!window.confirm('Are you sure you want to delete this employee? This will also delete all attendance records.')) {
            return;
        }

        setDeletingId(employeeId);
        try {
            await employeeAPI.delete(employeeId);
            toast.success('Employee deleted successfully');

            if (onEmployeeDeleted) {
                onEmployeeDeleted();
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return (
            <Card>
                <LoadingSpinner message="Loading employees..." />
            </Card>
        );
    }

    if (!employees || employees.length === 0) {
        return (
            <Card>
                <EmptyState
                    icon="👥"
                    message="No employees found"
                    description="Add your first employee using the form above"
                />
            </Card>
        );
    }

    return (
        <Card>
            <h2 className="text-2xl font-bold mb-6 text-white">Employee List</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {employees.map((employee, index) => (
                                <motion.tr
                                    key={employee.employee_id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <td>
                                        <motion.span
                                            className="inline-block px-3 py-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-lg text-sm font-semibold"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            {employee.employee_id}
                                        </motion.span>
                                    </td>
                                    <td className="font-medium text-white">{employee.full_name}</td>
                                    <td className="text-gray-400">{employee.email}</td>
                                    <td>
                                        <motion.span
                                            className="inline-block px-3 py-1 bg-gradient-to-r from-[#43e97b] to-[#38f9d7] text-white rounded-lg text-sm font-semibold"
                                            whileHover={{ scale: 1.05, rotate: 2 }}
                                        >
                                            {employee.department}
                                        </motion.span>
                                    </td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDelete(employee.employee_id)}
                                            loading={deletingId === employee.employee_id}
                                            className="text-sm px-4 py-2"
                                        >
                                            🗑️ Delete
                                        </Button>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default EmployeeList;
