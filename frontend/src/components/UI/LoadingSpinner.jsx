import { motion } from 'framer-motion';

const LoadingSpinner = ({ message = 'Loading...' }) => {
    return (
        <motion.div
            className="flex flex-col items-center justify-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="w-16 h-16 border-4 border-white/10 border-t-primary rounded-full animate-spin mb-4 bg-gradient-to-r from-primary to-primary-dark"></div>
            <p className="text-gray-400 text-base">{message}</p>
        </motion.div>
    );
};

export default LoadingSpinner;
