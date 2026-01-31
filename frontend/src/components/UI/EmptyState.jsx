import { motion } from 'framer-motion';

const EmptyState = ({ icon = '📭', message = 'No data available', description }) => {
    return (
        <motion.div
            className="text-center py-16 px-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="text-6xl mb-4 opacity-50">{icon}</div>
            <h3 className="text-gray-400 text-xl mb-2">{message}</h3>
            {description && <p className="text-gray-500 text-base">{description}</p>}
        </motion.div>
    );
};

export default EmptyState;
