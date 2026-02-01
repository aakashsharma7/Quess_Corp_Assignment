import { useState, useEffect, useRef } from 'react';
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
    const employeeListRef = useRef(null);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async (scrollToList = false) => {
        setLoading(true);
        try {
            const data = await employeeAPI.getAll();
            setEmployees(data);

            // Scroll to list if requested
            if (scrollToList && employeeListRef.current) {
                setTimeout(() => {
                    employeeListRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            }
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
                        {/* <span className="text-6xl">👥</span> */}
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent">
                        Employee Management
                    </h1>

                    {/* <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Manage your organization's employee records efficiently with our intuitive interface
                    </p> */}
                </motion.div>

                {/* Employee Form Section */}
                <motion.div
                    ref={formRef}
                    className="mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={formInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <EmployeeForm onEmployeeAdded={() => fetchEmployees(true)} />
                </motion.div>

                {/* Employee List Section */}
                <motion.div
                    ref={listRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={listInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div ref={employeeListRef}>
                        <EmployeeList
                            employees={employees}
                            loading={loading}
                            onEmployeeDeleted={fetchEmployees}
                        />
                    </div>
                </motion.div>
            </Container>
        </div>
    );
};

export default Employees;
