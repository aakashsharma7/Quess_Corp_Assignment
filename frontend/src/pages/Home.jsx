import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Container from '../components/Layout/Container';
import Card from '../components/UI/Card';
import { useInView } from '../hooks/useInView';
import { employeeAPI } from '../api/employees';
import { attendanceAPI } from '../api/attendance';

const Home = () => {
    const [hoveredCard, setHoveredCard] = useState(null);
    const [heroRef, heroInView] = useInView({ threshold: 0.2, once: true });
    const [featuresRef, featuresInView] = useInView({ threshold: 0.1, once: true });

    // State for stats
    const [employees, setEmployees] = useState([]);
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [employeesData, attendanceData] = await Promise.all([
                    employeeAPI.getAll(),
                    attendanceAPI.getAll()
                ]);
                setEmployees(employeesData);
                setAttendanceRecords(attendanceData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Calculate attendance stats for today
    const todayRecords = attendanceRecords.filter(r => {
        const recordDate = new Date(r.date).toDateString();
        const today = new Date().toDateString();
        return recordDate === today;
    });
    const presentToday = todayRecords.filter(r => r.status === 'Present').length;
    const absentToday = todayRecords.filter(r => r.status === 'Absent').length;

    const features = [
        {
            icon: '👥',
            title: 'Employee Management',
            description: 'Add, view, and manage employee records with ease',
            link: '/employees',
            gradient: 'from-gray-600 to-gray-700',
            badge: 'Core Feature',
            stats: [
                { label: 'Total Employees', value: employees.length, gradient: 'from-[#667eea]/20 to-[#764ba2]/20' },
                { label: 'Status', value: 'Active', gradient: 'from-[#43e97b]/20 to-[#38f9d7]/20' }
            ]
        },
        {
            icon: '📅',
            title: 'Attendance Tracking',
            description: 'Mark and track daily attendance for all employees',
            link: '/attendance',
            gradient: 'from-gray-500 to-gray-600',
            badge: 'Essential',
            stats: [
                { label: 'Present Today', value: presentToday, gradient: 'from-[#43e97b]/20 to-[#38f9d7]/20' },
                { label: 'Absent Today', value: absentToday, gradient: 'from-[#fa709a]/20 to-[#fee140]/20' }
            ]
        },
    ];

    return (
        <div className="min-h-screen py-12">
            <Container>
                {/* Hero Section with Intersection Observer */}
                <motion.div
                    ref={heroRef}
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-300 via-gray-100 to-gray-300 bg-clip-text text-transparent"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Welcome to HRMS Lite
                    </motion.h1>
                    {/* <motion.p
                        className="text-xl text-gray-400 max-w-3xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={heroInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        A modern, lightweight Human Resource Management System for efficient employee and attendance management
                    </motion.p> */}
                </motion.div>

                {/* Feature Cards with Badges */}
                <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
                            onHoverStart={() => setHoveredCard(index)}
                            onHoverEnd={() => setHoveredCard(null)}
                        >
                            <Link to={feature.link} className="block group">
                                <motion.div
                                    className="relative overflow-hidden"
                                    whileHover={{ y: -8 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Badge Highlight */}
                                    <motion.div
                                        className="absolute top-4 right-4 z-10"
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={featuresInView ? { scale: 1, rotate: 0 } : {}}
                                        transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                                    >
                                        <motion.span
                                            className={`inline-block px-3 py-1 bg-gradient-to-r ${feature.gradient} text-white text-xs font-bold rounded-full shadow-lg`}
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                        >
                                            ⭐ {feature.badge}
                                        </motion.span>
                                    </motion.div>

                                    {/* Glowing Border Effect */}
                                    <motion.div
                                        className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 blur-xl`}
                                        animate={{
                                            opacity: hoveredCard === index ? 0.6 : 0,
                                        }}
                                        transition={{ duration: 0.3 }}
                                    />

                                    <Card className="relative border-2 border-transparent hover:border-white/20 transition-all duration-300">
                                        {/* Icon with Scale and Rotation */}
                                        <motion.div
                                            className={`text-6xl mb-6 w-24 h-24 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center shadow-lg`}
                                            animate={{
                                                scale: hoveredCard === index ? 1.1 : 1,
                                                rotate: hoveredCard === index ? 5 : 0,
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {feature.icon}
                                        </motion.div>

                                        <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-[#667eea] group-hover:to-[#764ba2] transition-all duration-300">
                                            {feature.title}
                                        </h3>

                                        <p className="text-gray-400 mb-6 leading-relaxed">
                                            {feature.description}
                                        </p>

                                        {/* Stats Display */}
                                        {feature.stats && (
                                            <div className="flex gap-3 mb-6">
                                                {feature.stats.map((stat, statIndex) => (
                                                    <motion.div
                                                        key={stat.label}
                                                        className={`flex-1 px-4 py-3 bg-gradient-to-r ${stat.gradient} rounded-lg border border-white/10 backdrop-blur-sm`}
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={featuresInView ? { opacity: 1, scale: 1 } : {}}
                                                        transition={{ duration: 0.4, delay: 1 + index * 0.2 + statIndex * 0.1 }}
                                                        whileHover={{ scale: 1.05 }}
                                                    >
                                                        <div className="text-xl font-bold text-white">
                                                            {loading ? '...' : stat.value}
                                                        </div>
                                                        <div className="text-xs text-gray-300">{stat.label}</div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Animated Arrow */}
                                        <div className="flex items-center text-primary font-semibold">
                                            <span className="mr-2">Get Started</span>
                                            <motion.span
                                                className="text-xl"
                                                animate={{
                                                    x: hoveredCard === index ? 5 : 0,
                                                }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                →
                                            </motion.span>
                                        </div>
                                    </Card>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Home;
