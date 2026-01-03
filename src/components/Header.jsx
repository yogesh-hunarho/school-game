import { HeroHeader } from "./hero-header";

// Level calculation helper
const calculateLevel = (xp) => {
    // Level thresholds: 0-99=1, 100-249=2, 250-499=3, 500-999=4, 1000+=5
    if (xp >= 1000) return Math.floor(5 + (xp - 1000) / 500);
    if (xp >= 500) return 4;
    if (xp >= 250) return 3;
    if (xp >= 100) return 2;
    return 1;
};

const getXPForLevel = (level) => {
    if (level <= 1) return 0;
    if (level === 2) return 100;
    if (level === 3) return 250;
    if (level === 4) return 500;
    if (level === 5) return 1000;
    return 1000 + (level - 5) * 500;
};

const getXPToNextLevel = (xp) => {
    const level = calculateLevel(xp);
    const nextLevelXP = getXPForLevel(level + 1);
    const currentLevelXP = getXPForLevel(level);
    return {
        current: xp - currentLevelXP,
        required: nextLevelXP - currentLevelXP,
        percentage: ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100,
    };
};


export default function Header() {

    return (
        <div className="relative w-full">
            <HeroHeader />
        </div>

    );
}

export { calculateLevel, getXPForLevel, getXPToNextLevel };
