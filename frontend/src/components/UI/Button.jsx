import { motion } from 'framer-motion';

const Button = ({
    children,
    onClick,
    variant = 'primary',
    type = 'button',
    disabled = false,
    loading = false,
    className = '',
    ...props
}) => {
    const variantClasses = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        danger: 'btn-danger',
        success: 'bg-gradient-success text-white shadow-[0_4px_15px_rgba(67,233,123,0.4)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(67,233,123,0.6)]',
    };

    return (
        <motion.button
            whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
            whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
            className={`btn ${variantClasses[variant]} ${className} ${disabled || loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            onClick={onClick}
            type={type}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin-slow inline-block"></span>
                    <span>Loading...</span>
                </>
            ) : (
                children
            )}
        </motion.button>
    );
};

export default Button;
