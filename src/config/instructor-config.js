/**
 * Instructor configuration for each page
 * Defines dialogue, UI actions, and voice settings per route
 */

export const instructorConfig = {
    '/': {
        id: 'home',
        dialogue: [
            "Welcome, Innovator 🚀",
            "This is your mission hub — where learning turns into power.",
            "Earn XP, collect coins, and unlock new challenges.",
            "Ready to begin? Hit Start Your Mission and let's level you up!"
        ],
        uiActions: [
            {
                selector: '[data-instructor-target="mission-button"]',
                effect: 'shake',
                duration: 2000,
                delay: 1500
            }
        ],
        position: 'right',
        voice: {
            rate: 1.0,
            pitch: 1.1
        }
    },

    '/missions': {
        id: 'missions',
        dialogue: [
            "This is Mission Control 🛰️",
            "Each card is a challenge waiting to be conquered.",
            "Green means completed. Yellow means active. Locked missions unlock as you progress.",
            "Your next objective is glowing — select the Active Mission to continue."
        ],
        uiActions: [
            {
                selector: '[data-instructor-target="active-mission"]',
                effect: 'glow',
                duration: 2500,
                delay: 2000
            }
        ],
        position: 'left',
        voice: {
            rate: 1.0,
            pitch: 1.1
        }
    },

    '/mission/:moduleId': {
        id: 'module-content',
        dialogue: [
            "Mission briefing loaded 🎯",
            "Watch the videos to gain knowledge.",
            "Clear quizzes to earn bonus XP.",
            "Fill the progress bar to 100% to unlock the next mission.",
            "Stay sharp, Innovator."
        ],
        uiActions: [
            {
                selector: '[data-instructor-target="progress-bar"]',
                effect: 'scan',
                duration: 2000,
                delay: 1500
            }
        ],
        position: 'right',
        voice: {
            rate: 1.0,
            pitch: 1.1
        }
    },

    'locked-mission': {
        id: 'locked',
        dialogue: [
            "Access denied 🔒",
            "This mission is encrypted for now.",
            "Complete your current objective to unlock it.",
            "Trust me — it's worth the grind."
        ],
        uiActions: [],
        position: 'left',
        voice: {
            rate: 1.0,
            pitch: 1.0
        }
    },

    '/profile': {
        id: 'profile',
        dialogue: [
            "Your command center 👤",
            "Track your progress, view achievements, and monitor your stats.",
            "Every mission completed brings you closer to mastery.",
            "Keep pushing forward, Innovator!"
        ],
        uiActions: [],
        position: 'right',
        voice: {
            rate: 1.0,
            pitch: 1.1
        }
    },

    '/achievements': {
        id: 'achievements',
        dialogue: [
            "Achievement vault unlocked 🏆",
            "Collect badges as you conquer challenges.",
            "Each badge represents a skill mastered.",
            "Keep collecting to prove your expertise!"
        ],
        uiActions: [],
        position: 'left',
        voice: {
            rate: 1.0,
            pitch: 1.1
        }
    }
};

/**
 * Get instructor config for a given route
 * Handles dynamic routes like /mission/:moduleId
 */
export const getInstructorConfig = (pathname) => {
    // Exact match first
    if (instructorConfig[pathname]) {
        return instructorConfig[pathname];
    }

    // Check for dynamic routes
    if (pathname.startsWith('/mission/')) {
        return instructorConfig['/mission/:moduleId'];
    }

    return null;
};
