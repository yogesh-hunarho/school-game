import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLMSStore } from '../store/lms-store';
import { getInstructorConfig } from '../config/instructor-config';
import { GameInstructor } from '../components/GameInstructor';
import { InstructorToggle } from '../components/InstructorToggle';

const InstructorContext = createContext(null);

export const useInstructor = () => {
    const context = useContext(InstructorContext);
    if (!context) {
        throw new Error('useInstructor must be used within InstructorProvider');
    }
    return context;
};

/**
 * InstructorProvider
 * Manages game instructor state and provides context
 */
export const InstructorProvider = ({ children }) => {
    const location = useLocation();
    const { instructor, markPageVisited, showInstructor, hideInstructor, toggleInstructor } = useLMSStore();
    const [currentConfig, setCurrentConfig] = useState(null);
    const [showManual, setShowManual] = useState(false);

    // Check if page has been visited
    const isPageVisited = (pathname) => {
        const config = getInstructorConfig(pathname);
        if (!config) return true;
        return instructor.visitedPages.includes(config.id);
    };

    // Check if page is in skip list
    const isPageSkipped = (pathname) => {
        const config = getInstructorConfig(pathname);
        if (!config) return true;
        return instructor.skipList.includes(config.id);
    };

    // Auto-show instructor on page change
    useEffect(() => {
        if (!instructor.enabled) return;

        const config = getInstructorConfig(location.pathname);

        if (!config) return;

        // Don't show if already visited or skipped
        if (isPageVisited(location.pathname) || isPageSkipped(location.pathname)) {
            return;
        }

        // Small delay to let page render
        const timer = setTimeout(() => {
            setCurrentConfig(config);
            showInstructor(config);
        }, 500);

        return () => clearTimeout(timer);
    }, [location.pathname, instructor.enabled]);

    // Handle instructor completion
    const handleComplete = () => {
        if (currentConfig) {
            markPageVisited(currentConfig.id);
        }
        hideInstructor();
        setCurrentConfig(null);
        setShowManual(false);
    };

    // Manual trigger
    const triggerInstructor = (configId = null) => {
        const config = configId
            ? Object.values(getInstructorConfig).find(c => c?.id === configId)
            : getInstructorConfig(location.pathname);

        if (config) {
            setCurrentConfig(config);
            setShowManual(true);
            showInstructor(config);
        }
    };

    // Trigger specific dialogue (e.g., "locked-mission")
    const triggerCustomDialogue = (configKey) => {
        const config = getInstructorConfig(configKey);
        if (config) {
            setCurrentConfig(config);
            setShowManual(true);
            showInstructor(config);
        }
    };

    const value = {
        triggerInstructor,
        triggerCustomDialogue,
        isInstructorActive: instructor.isActive || showManual,
        currentConfig: instructor.currentDialogue || currentConfig
    };

    const shouldShowInstructor = instructor.isActive || showManual;
    const configToShow = instructor.currentDialogue || currentConfig;

    return (
        <InstructorContext.Provider value={value}>
            {children}

            {/* Instructor Component */}
            {shouldShowInstructor && configToShow && (
                <GameInstructor
                    dialogue={configToShow.dialogue}
                    uiActions={configToShow.uiActions}
                    position={configToShow.position}
                    voiceConfig={configToShow.voice}
                    onComplete={handleComplete}
                    autoPlay={true}
                />
            )}

            {/* Toggle Button */}
            {instructor.enabled && (
                <InstructorToggle
                    onClick={() => triggerInstructor()}
                    hasNewContent={!isPageVisited(location.pathname) && !isPageSkipped(location.pathname)}
                />
            )}
        </InstructorContext.Provider>
    );
};
