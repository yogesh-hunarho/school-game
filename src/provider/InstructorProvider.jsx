import { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLMSStore } from '../store/lms-store';
import { getInstructorConfig } from '../config/instructor-config';
import { GameInstructor } from '../components/GameInstructor';
import { InstructorToggle } from '../components/InstructorToggle';
import { WalkthroughStorage } from '@/config/walkthrough-storage';

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
        if (currentConfig?._walkthroughMeta) {
            const { id, mode } = currentConfig._walkthroughMeta;
            WalkthroughStorage.mark(id, mode);
        }

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

    // Trigger specific dialogue (e.g., "locked-mission") or custom inline dialogue
    // Can pass either:
    // - A string key to lookup in instructor-config.js
    // - An inline dialogue object: { dialogue: string[], uiActions?: [], voice?: {}, position?: string }
    const triggerCustomDialogue = (configKeyOrDialogue) => {
        let config;

        if (typeof configKeyOrDialogue === 'string') {
            // Lookup config by key
            config = getInstructorConfig(configKeyOrDialogue);
        } else if (typeof configKeyOrDialogue === 'object' && configKeyOrDialogue !== null) {
            // Inline dialogue object - normalize it
            config = {
                id: configKeyOrDialogue.id,
                dialogue: Array.isArray(configKeyOrDialogue.dialogue)
                    ? configKeyOrDialogue.dialogue
                    : [configKeyOrDialogue.dialogue || configKeyOrDialogue.text || ''],
                uiActions: configKeyOrDialogue.uiActions || [],
                position: configKeyOrDialogue.position || 'right',
                voice: configKeyOrDialogue.voice || { rate: 1.0, pitch: 1.1 },
                autoAdvanceDelay: configKeyOrDialogue.autoAdvanceDelay || 800
            };
        }

        if (config) {
            setCurrentConfig(config);
            setShowManual(true);
            showInstructor(config);
        }
    };

    const isWalkthroughCompleted = (id, mode = 'auto') => {
        if (!id) return false;
        return WalkthroughStorage.has(id, mode);
    };

    // Shorthand for showing a quick walkthrough with UI highlights
    const showWalkthrough = ({
        id,
        dialogue,
        uiActions = [],
        voice = {},
        position = 'right',
        force = false,
        dontTrack = false,
        mode = 'auto' // 'auto' | 'manual'
    }) => {
        if (!id) {
            console.warn('showWalkthrough requires a unique id');
            return;
        }
        if (!force && !dontTrack && WalkthroughStorage.has(id, mode)) {
            return;
        }

        triggerCustomDialogue({
            id: `${mode}:${id}:${Date.now()}`,
            _walkthroughMeta: dontTrack
                ? null
                : { id, mode },
            dialogue,
            uiActions,
            voice: { rate: 1.0, pitch: 1.1, ...voice },
            position
        });
        WalkthroughStorage.mark(id, mode);
    };

    const configFromRoute = getInstructorConfig(location.pathname);
    const configToShow = instructor.currentDialogue || configFromRoute || currentConfig;
    const shouldShowInstructor = instructor.isActive || showManual;

    const value = {
        triggerInstructor,
        triggerCustomDialogue,
        showWalkthrough,
        isWalkthroughCompleted,
        isInstructorActive: shouldShowInstructor,
        currentConfig: configToShow
    };

    return (
        <InstructorContext.Provider value={value}>
            {children}

            {/* Instructor Component */}
            {shouldShowInstructor && configToShow && (
                <GameInstructor
                    key={location.pathname}
                    dialogue={configToShow?.dialogue}
                    uiActions={configToShow?.uiActions}
                    position={'right'}
                    voiceConfig={configToShow?.voice}
                    onComplete={handleComplete}
                    autoPlay={true}
                    isActive={instructor.isActive || showManual}
                />
            )}

            {/* Toggle Button - Restored and shifted to avoid overlap if needed */}
            {/* {instructor.enabled && !value.isInstructorActive && (
                <InstructorToggle
                    onClick={() => triggerInstructor()}
                    hasNewContent={!isPageVisited(location.pathname) && !isPageSkipped(location.pathname)}
                />
            )} */}
        </InstructorContext.Provider>
    );
};
