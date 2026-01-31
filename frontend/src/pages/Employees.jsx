import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from '../components/Layout/Container';
import EmployeeForm from '../components/Employees/EmployeeForm';
import EmployeeList from '../components/Employees/EmployeeList';
import { employeeAPI } from '../api/employees';
import { useInView } from '../hooks/useInView';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [headerRef, headerInView] = useInView({ threshold: 0.2, once: true });
    const [formRef, formInView] = useInView({ threshold: 0.1, once: true });
    const [listRef, listInView] = useInView({ threshold: 0.1, once: true });

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const data = await employeeAPI.getAll();
            setEmployees(data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen py-8 md:py-12">
            <Container>
                {/* Page Header with Enhanced Styling */}
                <motion.div
                    ref={headerRef}
                    className="mb-12 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="inline-block mb-4"
                        initial={{ scale: 0 }}
                        animate={headerInView ? { scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <span className="text-6xl">👥</span>
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent">
                        Employee Management
                    </h1>

                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Manage your organization's employee records efficiently with our intuitive interface
                    </p>

                    {/* Stats Bar */}
                    <motion.div
                        className="mt-8 flex flex-wrap justify-center gap-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="px-6 py-3 bg-gradient-to-r from-[#667eea]/20 to-[#764ba2]/20 rounded-xl border border-white/10 backdrop-blur-sm">
                            <div className="text-2xl font-bold text-white">{employees.length}</div>
                            <div className="text-sm text-gray-400">Total Employees</div>
                        </div>
                        <div className="px-6 py-3 bg-gradient-to-r from-[#43e97b]/20 to-[#38f9d7]/20 rounded-xl border border-white/10 backdrop-blur-sm">
                            <div className="text-2xl font-bold text-white">Active</div>
                            <div className="text-sm text-gray-400">Status</div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Employee Form Section */}
                <motion.div
                    ref={formRef}
                    className="mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={formInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <EmployeeForm onEmployeeAdded={fetchEmployees} />
                </motion.div>

                {/* Employee List Section */}
                <motion.div
                    ref={listRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={listInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <EmployeeList
                        employees={employees}
                        loading={loading}
                        onEmployeeDeleted={fetchEmployees}
                    />
                </motion.div>
            </Container>
        </div>
    );
};

export default Employees;
