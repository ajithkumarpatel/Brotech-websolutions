import React from 'react';
import { useCountUp } from '../hooks/useCountUp';

interface AnimatedCounterProps {
    icon: React.ReactNode;
    target: number;
    label: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ icon, target, label }) => {
    // The animation now starts as soon as the component receives its target number,
    // making it more reliable in different environments by removing the IntersectionObserver.
    const count = useCountUp(target, 2000);

    return (
        <div className="text-center p-4">
            <div className="mb-2">{icon}</div>
            <p className="text-4xl md:text-5xl font-bold text-white tabular-nums">
                {count}+
            </p>
            <p className="text-lg text-dark-text mt-2">{label}</p>
        </div>
    );
};

export default AnimatedCounter;