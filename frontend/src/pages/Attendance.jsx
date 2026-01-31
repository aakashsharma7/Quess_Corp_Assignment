import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Container from '../components/Layout/Container';
import AttendanceForm from '../components/Attendance/AttendanceForm';
import AttendanceRecords from '../components/Attendance/AttendanceRecords';
import { attendanceAPI } from '../api/attendance';
import { useInView } from '../hooks/useInView';

const Attendance = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [headerRef, headerInView] = useInView({ threshold: 0.2, once: true });
    const [formRef, formInView] = useInView({ threshold: 0.1, once: true });
    const [recordsRef, recordsInView] = useInView({ threshold: 0.1, once: true });

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async () => {
        setLoading(true);
        try {
            const data = await attendanceAPI.getAll();
            setRecords(data);
        } catch (error) {
            console.error('Error fetching attendance:', error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate stats
    const todayRecords = records.filter(r => {
        const recordDate = new Date(r.date).toDateString();
        const today = new Date().toDateString();
        return recordDate === today;
    });
    const presentToday = todayRecords.filter(r => r.status === 'Present').length;
    const absentToday = todayRecords.filter(r => r.status === 'Absent').length;

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
                        <span className="text-6xl">📅</span>
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#4facfe] via-[#00f2fe] to-[#43e97b] bg-clip-text text-transparent">
                        Attendance Management
                    </h1>

                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Track and manage employee attendance records with real-time insights
                    </p>

                    {/* Stats Bar */}
                    <motion.div
                        className="mt-8 flex flex-wrap justify-center gap-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="px-6 py-3 bg-gradient-to-r from-[#4facfe]/20 to-[#00f2fe]/20 rounded-xl border border-white/10 backdrop-blur-sm">
                            <div className="text-2xl font-bold text-white">{records.length}</div>
                            <div className="text-sm text-gray-400">Total Records</div>
                        </div>
                        <div className="px-6 py-3 bg-gradient-to-r from-[#43e97b]/20 to-[#38f9d7]/20 rounded-xl border border-white/10 backdrop-blur-sm">
                            <div className="text-2xl font-bold text-white">{presentToday}</div>
                            <div className="text-sm text-gray-400">Present Today</div>
                        </div>
                        <div className="px-6 py-3 bg-gradient-to-r from-[#fa709a]/20 to-[#fee140]/20 rounded-xl border border-white/10 backdrop-blur-sm">
                            <div className="text-2xl font-bold text-white">{absentToday}</div>
                            <div className="text-sm text-gray-400">Absent Today</div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Attendance Form Section */}
                <motion.div
                    ref={formRef}
                    className="mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={formInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <AttendanceForm onAttendanceMarked={fetchAttendance} />
                </motion.div>

                {/* Attendance Records Section */}
                <motion.div
                    ref={recordsRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={recordsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <AttendanceRecords records={records} loading={loading} />
                </motion.div>
            </Container>
        </div>
    );
};

export default Attendance;
