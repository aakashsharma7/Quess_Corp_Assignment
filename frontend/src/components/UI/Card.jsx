import { motion } from 'framer-motion';

const Card = ({ children, className = '', ...props }) => {
    return (
        <motion.div
            className={`glass-card ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{
                y: -4,
                boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)',
            }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
