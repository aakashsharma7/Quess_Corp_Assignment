import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Dashboard' },
        { path: '/employees', label: 'Employees' },
        { path: '/attendance', label: 'Attendance' },
    ];

    return (
        <header className="sticky top-0 z-50 px-6 pt-6">
            <div className="bg-card/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-2xl">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <motion.div
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* <motion.img
                                src="/logo.png"
                                alt="HRMS Lite Logo"
                                className="h-10 w-10 object-contain"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ duration: 0.2 }}
                            /> */}
                            <h1 className="text-2xl font-bold text-foreground text-center">
                                QUESS CORP HRMS Lite
                            </h1>
                        </motion.div>

                        <nav className="flex items-center gap-2">
                            {navItems.map((item, index) => {
                                const isActive = location.pathname === item.path;

                                return (
                                    <motion.div
                                        key={item.path}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <Link
                                            to={item.path}
                                            className="relative group"
                                        >
                                            <motion.div
                                                className={`
                                                flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm
                                                transition-all duration-300 relative overflow-hidden
                                                ${isActive
                                                        ? 'bg-gradient-to-r from-gray-700 to-gray-600 text-white shadow-[0_4px_15px_rgba(80,80,80,0.4)]'
                                                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                    }
                                            `}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <span>{item.label}</span>

                                                {/* Active Indicator */}
                                                {isActive && (
                                                    <motion.div
                                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                                                        layoutId="activeTab"
                                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                    />
                                                )}

                                                {/* Hover Glow Effect */}
                                                {!isActive && (
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-r from-[#667eea]/10 to-[#764ba2]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    />
                                                )}
                                            </motion.div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
