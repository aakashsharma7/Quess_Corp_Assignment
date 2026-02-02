import { useEffect, useRef } from 'react';

const GradientMesh = () => {
    const meshRef = useRef(null);

    useEffect(() => {
        const mesh = meshRef.current;
        if (!mesh) return;

        // Add random animation delays to each blob
        const blobs = mesh.querySelectorAll('.gradient-blob');
        blobs.forEach((blob, index) => {
            blob.style.animationDelay = `${index * -3}s`;
        });
    }, []);

    return (
        <div
            ref={meshRef}
            className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
            style={{ zIndex: 0 }}
        >
            {/* Gradient Blobs */}
            <div className="gradient-blob gradient-blob-1"></div>
            <div className="gradient-blob gradient-blob-2"></div>
            <div className="gradient-blob gradient-blob-3"></div>
            <div className="gradient-blob gradient-blob-4"></div>
            <div className="gradient-blob gradient-blob-5"></div>
        </div>
    );
};

export default GradientMesh;
