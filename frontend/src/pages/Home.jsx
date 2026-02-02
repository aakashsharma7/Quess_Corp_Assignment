import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Container from '../components/Layout/Container';
import { useInView } from '../hooks/useInView';
import { employeeAPI } from '../api/employees';
import { attendanceAPI } from '../api/attendance';

const Home = () => {
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
            // icon: '👥',
            title: 'Employee Management',
            description: 'Efficiently manage your workforce with comprehensive employee records and profiles',
            link: '/employees',
            stats: [
                { label: 'Total Employees', value: employees.length },
                { label: 'Active', value: employees.length }
            ]
        },
        {
            // icon: '�',
            title: 'Attendance Tracking',
            description: 'Monitor and track employee attendance with real-time insights and analytics',
            link: '/attendance',
            stats: [
                { label: 'Present Today', value: presentToday },
                { label: 'Absent Today', value: absentToday }
            ]
        },
    ];

    return (
        <div className="min-h-screen py-16">
            <Container>
                {/* Hero Section - Clean and Professional */}
                <motion.div
                    ref={heroRef}
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
                        Welcome to HRMS Lite
                    </h1>
                    {/* <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Streamline your HR operations with our modern management system
                    </p> */}
                </motion.div>

                {/* Feature Cards - Clean Grid Layout */}
                <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link to={feature.link} className="block group">
                                <div className="bg-[rgba(26,34,52,0.4)] backdrop-blur-md border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:border-white/20 hover:bg-[rgba(26,34,52,0.6)] hover:shadow-xl hover:shadow-black/20">
                                    {/* Icon */}
                                    <div className="text-5xl mb-6">
                                        {feature.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold mb-3 text-white">
                                        {feature.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-400 mb-6 leading-relaxed">
                                        {feature.description}
                                    </p>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        {feature.stats.map((stat, statIndex) => (
                                            <div
                                                key={statIndex}
                                                className="bg-white/5 rounded-lg p-4 border border-white/10"
                                            >
                                                <div className="text-2xl font-bold text-white mb-1">
                                                    {loading ? '—' : stat.value}
                                                </div>
                                                <div className="text-xs text-gray-400 uppercase tracking-wide">
                                                    {stat.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action Link */}
                                    <div className="flex items-center text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
                                        <span>View Details</span>
                                        <svg
                                            className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Info */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0 }}
                    animate={featuresInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <p className="text-gray-500 text-sm">
                        Built for Quess Corp • Modern HR Management
                    </p>
                </motion.div>
            </Container>
        </div>
    );
};

export default Home;

