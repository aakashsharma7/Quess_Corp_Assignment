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
            {/* Enhanced Glass Header */}
            <motion.div
                className="glass-card-strong !p-0 overflow-hidden"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="max-w-7xl mx-auto px-6 py-3">
                    <div className="flex items-center justify-between">
                        {/* Logo/Brand */}
                        <motion.div
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {/* <motion.img
                                src={logo}
                                alt="Quess Corp Logo"
                                className="h-10 w-auto object-contain"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ duration: 0.2 }}
                            /> */}
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                                QUESS CORP HRMS
                            </h1>
                        </motion.div>

                        {/* Navigation */}
                        <nav className="flex items-center gap-3">
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
                                                flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm
                                                transition-all duration-300 relative overflow-hidden
                                                ${isActive
                                                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-[0_4px_20px_rgba(59,130,246,0.4)]'
                                                        : 'text-gray-400 hover:text-white bg-white/5 hover:bg-white/10'
                                                    }
                                            `}
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <span className="relative z-10">{item.label}</span>

                                                {/* Active Glow Effect */}
                                                {isActive && (
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 blur-xl"
                                                        layoutId="activeGlow"
                                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                    />
                                                )}

                                                {/* Hover Shimmer Effect */}
                                                {!isActive && (
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                        animate={{
                                                            x: ['-100%', '100%'],
                                                        }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            ease: "linear"
                                                        }}
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
            </motion.div>
        </header>
    );
};

export default Header;

