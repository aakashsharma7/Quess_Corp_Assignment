import { useState, useEffect, useRef } from 'react';
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
    const attendanceListRef = useRef(null);

    useEffect(() => {
        fetchAttendance();
    }, []);

    const fetchAttendance = async (scrollToList = false) => {
        setLoading(true);
        try {
            const data = await attendanceAPI.getAll();
            setRecords(data);

            // Scroll to list if requested
            if (scrollToList && attendanceListRef.current) {
                setTimeout(() => {
                    attendanceListRef.current.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            }
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
                        {/* <span className="text-6xl">📅</span> */}
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#4facfe] via-[#00f2fe] to-[#43e97b] bg-clip-text text-transparent">
                        Attendance Management
                    </h1>

                    {/* <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        Track and manage employee attendance records with real-time insights
                    </p> */}
                </motion.div>

                {/* Attendance Form Section */}
                <motion.div
                    ref={formRef}
                    className="mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={formInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <AttendanceForm onAttendanceMarked={() => fetchAttendance(true)} />
                </motion.div>

                {/* Attendance Records Section */}
                <motion.div
                    ref={recordsRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={recordsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div ref={attendanceListRef}>
                        <AttendanceRecords records={records} loading={loading} />
                    </div>
                </motion.div>
            </Container>
        </div>
    );
};

export default Attendance;
