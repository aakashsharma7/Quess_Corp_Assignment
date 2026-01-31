import { motion } from 'framer-motion';

const Input = ({
    label,
    error,
    type = 'text',
    required = false,
    className = '',
    ...props
}) => {
    return (
        <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {label && (
                <motion.label
                    className="block mb-2 font-medium text-gray-400 text-sm"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                >
                    {label}
                    {required && <span className="text-danger ml-1">*</span>}
                </motion.label>
            )}
            <motion.input
                type={type}
                className={`input-field ${error ? 'border-danger focus:border-danger focus:shadow-[0_0_0_3px_rgba(250,112,154,0.1)]' : ''} ${className}`}
                whileFocus={{
                    scale: 1.01,
                    boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)',
                }}
                transition={{ duration: 0.2 }}
                {...props}
            />
            {error && (
                <motion.span
                    className="block mt-2 text-sm text-danger"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {error}
                </motion.span>
            )}
        </motion.div>
    );
};

export default Input;
