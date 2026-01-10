import { HeroHeader } from "./hero-header";

const calculateLevel = (player) => {
    if (!player || !player.moduleStatus) return 1;
    const moduleStatuses = Object.values(player.moduleStatus);
    const completedCount = moduleStatuses.filter(
        (status) => status === "completed"
    ).length;
    const totalModules = moduleStatuses.length;
    return Math.min(completedCount + 1, totalModules);
};

const getLevelProgress = (player, getModuleProgress) => {
    if (!player || !getModuleProgress) return { current: 0, required: 100, percentage: 0 };
    const progress = getModuleProgress(player.currentModuleId);
    return {
        current: progress,
        required: 100,
        percentage: progress,
    };
};


export default function Header() {

    return (
        <div className="relative w-full">
            <HeroHeader />
        </div>

    );
}

export { calculateLevel, getLevelProgress };
