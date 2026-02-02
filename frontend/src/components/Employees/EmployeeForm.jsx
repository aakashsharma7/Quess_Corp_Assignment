import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Card from '../UI/Card';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { employeeAPI } from '../../api/employees';

const EmployeeForm = ({ onEmployeeAdded }) => {
    const [formData, setFormData] = useState({
        employee_id: '',
        full_name: '',
        email: '',
        department: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.employee_id.trim()) {
            newErrors.employee_id = 'Employee ID is required';
        }

        if (!formData.full_name.trim()) {
            newErrors.full_name = 'Full name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.department.trim()) {
            newErrors.department = 'Department is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fix the errors in the form');
            return;
        }

        setLoading(true);
        try {
            await employeeAPI.create(formData);
            toast.success('Employee added successfully! 🎉');

            // Reset form
            setFormData({
                employee_id: '',
                full_name: '',
                email: '',
                department: '',
            });
            setErrors({});

            // Notify parent component
            if (onEmployeeAdded) {
                onEmployeeAdded();
            }
        } catch (error) {
            // Error already handled by interceptor
            console.error('Error adding employee:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold mb-6 text-white">Add New Employee</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Employee ID"
                            name="employee_id"
                            value={formData.employee_id}
                            onChange={handleChange}
                            error={errors.employee_id}
                            placeholder="e.g., EMP001"
                            required
                        />

                        <Input
                            label="Full Name"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            error={errors.full_name}
                            placeholder="e.g., John Doe"
                            required
                        />

                        <Input
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            placeholder="e.g., john@example.com"
                            required
                        />

                        <Input
                            label="Department"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            error={errors.department}
                            placeholder="e.g., IT"
                            required
                        />
                    </div>

                    <Button type="submit" loading={loading} className="w-full mt-6">
                        Add Employee
                    </Button>
                </form>
            </motion.div>
        </Card>
    );
};

export default EmployeeForm;
