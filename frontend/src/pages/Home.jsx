import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Container from '../components/Layout/Container';
import { useInView } from '../hooks/useInView';
import { employeeAPI } from '../api/employees';
import { attendanceAPI } from '../api/attendance';
import ParticleBackground from '../components/UI/ParticleBackground';
import GradientMesh from '../components/UI/GradientMesh';

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
        <div className="min-h-screen py-16 relative">
            {/* Gradient Mesh Background */}
            <GradientMesh />

            {/* Particle Background */}
            <ParticleBackground particleCount={40} />

            <Container>
                {/* Hero Section - Clean and Professional */}
                <motion.div
                    ref={heroRef}
                    className="text-center mb-20 relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">
                        Welcome to HRMS Lite
                    </h1>
                </motion.div>

                {/* Feature Cards - Enhanced Glassmorphism */}
                <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-10">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link to={feature.link} className="block group">
                                {/* Enhanced Glass Card with Border Glow */}
                                <div className="glass-card-strong group-hover:scale-[1.02] transition-transform duration-500">
                                    {/* Title */}
                                    <h3 className="text-2xl font-bold mb-3 text-white">
                                        {feature.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-400 mb-6 leading-relaxed">
                                        {feature.description}
                                    </p>

                                    {/* Neumorphism Stats Grid */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        {feature.stats.map((stat, statIndex) => (
                                            <motion.div
                                                key={statIndex}
                                                className="neuro-card-pressed"
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <div className="text-2xl font-bold text-white mb-1 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                                    {loading ? '—' : stat.value}
                                                </div>
                                                <div className="text-xs text-gray-400 uppercase tracking-wide">
                                                    {stat.label}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Action Link with Glow Effect */}
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
                    className="text-center mt-16 relative z-10"
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

