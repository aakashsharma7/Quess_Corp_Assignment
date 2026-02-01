import { motion } from 'framer-motion';

const LoadingSpinner = ({ message = 'Loading...' }) => {
    return (
        <motion.div
            className="flex flex-col items-center justify-center py-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
        >
            {/* Modern Multi-Ring Spinner */}
            <div className="relative w-20 h-20 mb-6">
                {/* Outer Ring */}
                <motion.div
                    className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-purple-400"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                {/* Middle Ring */}
                <motion.div
                    className="absolute inset-2 rounded-full border-4 border-transparent border-t-blue-500 border-l-blue-400"
                    animate={{ rotate: -360 }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                {/* Inner Ring */}
                <motion.div
                    className="absolute inset-4 rounded-full border-4 border-transparent border-t-cyan-500 border-b-cyan-400"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />

                {/* Center Pulse */}
                <motion.div
                    className="absolute inset-6 rounded-full bg-gradient-to-br from-purple-500/30 to-cyan-500/30"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            {/* Loading Text */}
            <motion.p
                className="text-gray-300 text-base font-medium"
                animate={{
                    opacity: [0.5, 1, 0.5]
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                {message}
            </motion.p>

            {/* Loading Dots */}
            <div className="flex gap-1.5 mt-3">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500"
                        animate={{
                            y: [0, -8, 0],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default LoadingSpinner;
