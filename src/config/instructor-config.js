
export const instructorConfig = {
    __version: 1,
    '/': {
        id: 'home',
        dialogue: ["Welcome, Innovator This is your mission hub where learning turns into power. Collect coins, and unlock new challenges."],
        autoAdvanceDelay: 800,
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
            pitch: 1.1,
            style: 'mentor'
        }
    },

    '/missions': {
        id: 'missions',
        dialogue: ["This is Mission Control. Each card is a challenge waiting to be conquered. Green means completed. Yellow means active. Locked missions unlock as you progress. Your next objective is glowing — select the Active Mission to continue."],
        autoAdvanceDelay: 800,
        uiActions: [
            {
                selector: '[data-instructor-target="active-mission"]',
                effect: 'shake',
                duration: 15000,
                delay: 10000
            },
        ],
        position: 'left',
        voice: {
            rate: 1.0,
            pitch: 1.1
        }
    },

    '/mission/:moduleId': {
        id: 'module-content',
        dialogue: ["Watch the all the videos one by one. Then quizzes are unlocked complete all the quizzes to earn coins and complete the mission. Fill the progress bar to 100% to unlock the next mission. Stay sharp, Innovator."],
        autoAdvanceDelay: 800,
        uiActions: [
            {
                selector: '[data-instructor-target="mission-progress"]',
                effect: 'scan',
                duration: 12000,
                delay: 10000
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
        dialogue: ["Access denied. This mission is encrypted for now. Complete your current objective to unlock it. Trust me — it's worth the grind."],
        autoAdvanceDelay: 800,
        uiActions: [],
        position: 'left',
        voice: {
            rate: 1.0,
            pitch: 1.0
        }
    },

    '/profile': {
        id: 'profile',
        dialogue: ["Your command center track your progress, view achievements, and monitor your stats. Every mission completed brings you closer to mastery. Keep pushing forward, Innovator!"],
        autoAdvanceDelay: 800,
        uiActions: [],
        position: 'right',
        voice: {
            rate: 1.0,
            pitch: 1.1
        }
    },

    '/achievements': {
        id: 'achievements',
        dialogue: ["Achievement vault unlocked Collect badges as you conquer challenges. Each badge represents a skill mastered. Keep collecting to prove your expertise!"],
        autoAdvanceDelay: 800,
        uiActions: [],
        position: 'left',
        voice: {
            rate: 1.0,
            pitch: 1.1
        }
    }
};

export const walkthroughDialogues = {
    'mission-map': {
        id: "mission-map",
        mode: 'manual',
        dialogue: ["Look at this glowing mission! which is your current mission. Complete it to earn more Coin."],
        uiActions: [],
        dontTrack: true,
        focus: true,
        position: 'right'
    },
    'back-to-mission-map': {
        id: "back-to-mission-map",
        mode: 'manual',
        dialogue: ["Its recommended to complete all the missions first before leaving the mission map."],
        uiActions: [],
        dontTrack: true,
        focus: true,
        position: 'right'
    },
    'locked-mission': {
        id: "locked-mission",
        mode: 'manual',
        dialogue: ["This mission is locked. Complete the previous mission to unlock this mission."],
        uiActions: [],
        dontTrack: true,
        focus: true,
        position: 'right'
    },
    'locked-video': {
        id: "locked-video",
        mode: 'manual',
        dialogue: ["This video is locked. Complete the previous video to unlock this video."],
        uiActions: [],
        dontTrack: true,
        focus: true,
        position: 'right'
    },
    'video': {
        id: "video",
        mode: 'manual',
        dialogue: ["Watch the video to earn coins. when you watch the video 80% then its automatically marked as completed and you will get coins and unlock the next video. Also you can see the description of the video and resources file."],
        uiActions: [],
        dontTrack: false,
        focus: true,
        position: 'right'
    },
    'locked-quiz': (isFirst) => ({
        id: "locked-quiz",
        mode: 'manual',
        dontTrack: true,
        dialogue: [`This quiz is locked. Complete all videos ${isFirst ? "" : "and previous quiz"} to unlock this quiz.`],
        uiActions: [],
        focus: true,
        position: 'right'
    }),
    'locked-assessment': {
        id: "locked-assessment",
        mode: 'manual',
        dontTrack: true,
        dialogue: ["This assessment is locked. Complete the previous assessment to unlock this assessment."],
        uiActions: [],
        focus: true,
        position: 'right'
    },
    'achievement-info': {
        id: "achievement-info",
        mode: 'manual',
        dontTrack: true,
        dialogue: ["You can use this achievement as you profile image"],
        uiActions: [],
        focus: true,
        position: 'right'
    },
    'achievement-collect': {
        id: "achievement-collect",
        mode: 'manual',
        dontTrack: false,
        dialogue: ["You can collect this achievement and use it as your profile image."],
        uiActions: [],
        focus: true,
        position: 'right'
    },
    'achievement-lock-info': {
        id: "achievement-lock-info",
        mode: 'manual',
        dontTrack: true,
        dialogue: ["This achievement is locked. Complete the mission to unlock this achievement."],
        uiActions: [],
        focus: true,
        position: 'right'
    },
    'puzzle-lock': {
        id: "puzzle-lock",
        mode: 'manual',
        dontTrack: true,
        dialogue: ["This puzzle piece is locked. Complete the mission to unlock puzzle."],
        uiActions: [],
        focus: true,
        position: 'right'
    },
    'puzzle-play': {
        id: "puzzle-play",
        mode: 'manual',
        dontTrack: true,
        dialogue: ["This puzzle is locked. Unlock it by completing the mission."],
        uiActions: [],
        focus: true,
        position: 'right'
    }
};

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
