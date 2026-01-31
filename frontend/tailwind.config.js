/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Dark Grayscale Base
                background: '#0a0a0a', // Very dark gray
                foreground: '#e5e5e5', // Light gray
                card: '#1a1a1a', // Dark gray
                muted: '#404040', // Medium gray
                border: '#2a2a2a', // Border gray

                // Professional Modern Accent Colors (subtle, sophisticated)
                primary: {
                    DEFAULT: '#3b82f6', // Modern blue
                    dark: '#2563eb', // Darker blue
                    light: '#60a5fa', // Lighter blue
                },
                secondary: {
                    DEFAULT: '#6366f1', // Indigo
                    dark: '#4f46e5',
                },
                accent: {
                    DEFAULT: '#8b5cf6', // Purple (subtle)
                    light: '#a78bfa',
                },
                success: {
                    DEFAULT: '#10b981', // Emerald green
                    light: '#34d399',
                },
                danger: {
                    DEFAULT: '#ef4444', // Red
                    light: '#f87171',
                },
                warning: {
                    DEFAULT: '#f59e0b', // Amber
                    light: '#fbbf24',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-primary': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                'gradient-secondary': 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                'gradient-accent': 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                'gradient-success': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                'gradient-danger': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            },
            animation: {
                'spin-slow': 'spin 0.8s linear infinite',
            },
        },
    },
    plugins: [],
}
