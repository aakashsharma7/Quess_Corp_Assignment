import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { attendanceAPI } from '../../api/attendance';
import { employeeAPI } from '../../api/employees';

const AttendanceForm = ({ onAttendanceMarked }) => {
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({
        employee_id: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present',
    });
    const [loading, setLoading] = useState(false);
    const [loadingEmployees, setLoadingEmployees] = useState(true);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const data = await employeeAPI.getAll();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        } finally {
            setLoadingEmployees(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.employee_id) {
            toast.error('Please select an employee');
            return;
        }

        setLoading(true);
        try {
            await attendanceAPI.mark(formData);
            toast.success('Attendance marked successfully! ✅');

            // Reset employee selection but keep date and status
            setFormData(prev => ({ ...prev, employee_id: '' }));

            if (onAttendanceMarked) {
                onAttendanceMarked();
            }
        } catch (error) {
            console.error('Error marking attendance:', error);
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
                <h2 className="text-2xl font-bold mb-6">📝 Mark Attendance</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Employee Selection */}
                    <div>
                        <label className="block mb-2 font-medium text-gray-400 text-sm">
                            Employee <span className="text-danger">*</span>
                        </label>
                        <select
                            name="employee_id"
                            value={formData.employee_id}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 bg-[rgba(26,34,52,0.6)] border border-white/10 rounded-xl text-white text-base transition-all duration-300 backdrop-blur-md focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] hover:border-white/20"
                            disabled={loadingEmployees}
                            required
                        >
                            <option value="">
                                {loadingEmployees ? 'Loading employees...' : 'Select an employee'}
                            </option>
                            {employees.map(emp => (
                                <option key={emp.employee_id} value={emp.employee_id}>
                                    {emp.employee_id} - {emp.full_name} ({emp.department})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Date and Status Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Date */}
                        <div>
                            <label className="block mb-2 font-medium text-gray-400 text-sm">
                                Date <span className="text-danger">*</span>
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                max={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-3.5 bg-[rgba(26,34,52,0.6)] border border-white/10 rounded-xl text-white text-base transition-all duration-300 backdrop-blur-md focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(102,126,234,0.1)] hover:border-white/20"
                                required
                            />
                        </div>

                        {/* Status - Enhanced */}
                        <div>
                            <label className="block mb-2 font-medium text-gray-400 text-sm">
                                Status <span className="text-danger">*</span>
                            </label>
                            <div className="flex gap-3">
                                <motion.button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, status: 'Present' }))}
                                    className={`
                                        flex-1 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 relative overflow-hidden
                                        ${formData.status === 'Present'
                                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-[0_4px_15px_rgba(16,185,129,0.4)]'
                                            : 'bg-[rgba(26,34,52,0.6)] text-gray-400 border border-white/10 hover:border-white/20 hover:bg-[rgba(26,34,52,0.8)]'
                                        }
                                    `}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {formData.status === 'Present' && (
                                        <motion.div
                                            className="absolute inset-0 bg-black/20"
                                            initial={{ x: '-100%' }}
                                            animate={{ x: '100%' }}
                                            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        <motion.span
                                            animate={{
                                                scale: formData.status === 'Present' ? [1, 1.2, 1] : 1,
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                repeat: formData.status === 'Present' ? Infinity : 0,
                                                repeatDelay: 1,
                                            }}
                                        >
                                            ✅
                                        </motion.span>
                                        Present
                                    </span>
                                </motion.button>

                                <motion.button
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, status: 'Absent' }))}
                                    className={`
                                        flex-1 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 relative overflow-hidden
                                        ${formData.status === 'Absent'
                                            ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-[0_4px_15px_rgba(239,68,68,0.4)]'
                                            : 'bg-[rgba(26,34,52,0.6)] text-gray-400 border border-white/10 hover:border-white/20 hover:bg-[rgba(26,34,52,0.8)]'
                                        }
                                    `}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {formData.status === 'Absent' && (
                                        <motion.div
                                            className="absolute inset-0 bg-black/20"
                                            initial={{ x: '-100%' }}
                                            animate={{ x: '100%' }}
                                            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        <motion.span
                                            animate={{
                                                scale: formData.status === 'Absent' ? [1, 1.2, 1] : 1,
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                repeat: formData.status === 'Absent' ? Infinity : 0,
                                                repeatDelay: 1,
                                            }}
                                        >
                                            ❌
                                        </motion.span>
                                        Absent
                                    </span>
                                </motion.button>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" loading={loading} className="w-full">
                        Mark Attendance
                    </Button>
                </form>
            </motion.div>
        </Card>
    );
};

export default AttendanceForm;
