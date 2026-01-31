import { useEffect, useState, useRef } from 'react';

/**
 * Custom hook for intersection observer animations
 * Triggers animation when element enters viewport
 */
export const useInView = (options = {}) => {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                // Optionally unobserve after first intersection
                if (options.once) {
                    observer.unobserve(entry.target);
                }
            } else if (!options.once) {
                setIsInView(false);
            }
        }, {
            threshold: options.threshold || 0.1,
            rootMargin: options.rootMargin || '0px',
        });

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [options.threshold, options.rootMargin, options.once]);

    return [ref, isInView];
};

/**
 * Custom hook for scroll-triggered animations
 * Returns scroll progress (0-1) for the element
 */
export const useScrollProgress = () => {
    const [progress, setProgress] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;

            const element = ref.current;
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate progress (0 when element enters bottom, 1 when it exits top)
            const elementProgress = 1 - (rect.top / windowHeight);
            const clampedProgress = Math.max(0, Math.min(1, elementProgress));

            setProgress(clampedProgress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial calculation

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return [ref, progress];
};
