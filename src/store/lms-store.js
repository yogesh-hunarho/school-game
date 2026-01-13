import { create } from "zustand";
import { persist } from "zustand/middleware";

const moduleContent = {
    "innovators-mind": {
        videos: [
            { id: "v1", title: "Introduction to Design Thinking", duration: "5:30", xp: 10, thumbnail: "🎬" },
            { id: "v2", title: "The 5 Stages of Design Thinking", duration: "8:45", xp: 15, thumbnail: "🎬" },
        ],
        quizzes: [
            { id: "q1", title: "Design Thinking Basics Quiz", questions: 5, xp: 25, icon: "📝" },
        ],
        nextModule: {
            moduleId: "trebuchet",
            title: "Trebuchet",
            icon: "�",
            description: "Master the physics of medieval siege engines.",
            xp: 55,
        },
    },
    "trebuchet": {
        videos: [
            { id: "v1", title: "History of the Trebuchet", duration: "6:20", xp: 10, thumbnail: "🎬" },
            { id: "v2", title: "Building Your Trebuchet", duration: "12:00", xp: 20, thumbnail: "🎬" },
        ],
        quizzes: [
            { id: "q1", title: "Trebuchet Mechanics Quiz", questions: 5, xp: 25, icon: "📝" },
        ],
        nextModule: {
            moduleId: "motor-robot",
            title: "Motor Robot",
            icon: "🤖",
            description: "Build and program your first autonomous rover.",
            xp: 95,
        },
    },
    "motor-robot": {
        videos: [
            { id: "v1", title: "Introduction to Robotics", duration: "5:00", xp: 10, thumbnail: "🎬" },
            { id: "v2", title: "Motor Types and Functions", duration: "7:30", xp: 10, thumbnail: "🎬" },
            { id: "v3", title: "Building the Chassis", duration: "10:00", xp: 15, thumbnail: "🎬" },
            { id: "v4", title: "Wiring and Connections", duration: "8:45", xp: 15, thumbnail: "🎬" },
            { id: "v5", title: "Programming Basics", duration: "12:00", xp: 20, thumbnail: "🎬" },
            { id: "v6", title: "Testing Your Robot", duration: "6:00", xp: 10, thumbnail: "🎬" },
            { id: "v7", title: "Financial Planning for Projects", duration: "8:00", xp: 15, thumbnail: "🎬" },
        ],
        quizzes: [
            { id: "q1", title: "Motor Robot Assessment", questions: 10, xp: 50, icon: "📝" },
        ],
        nextModule: {
            moduleId: "tetris",
            title: "Tetris Game",
            icon: "🎮",
            description: "Code a classic arcade game from scratch.",
            xp: 134,
        },
    },
    "tetris": {
        videos: [
            { id: "v1", title: "Tetris Game Design", duration: "6:00", xp: 10, thumbnail: "🎬" },
            { id: "v2", title: "Block Mechanics", duration: "8:00", xp: 12, thumbnail: "🎬" },
            { id: "v3", title: "Scoring Systems", duration: "7:00", xp: 12, thumbnail: "🎬" },
            { id: "v4", title: "Building the Grid", duration: "10:00", xp: 15, thumbnail: "🎬" },
            { id: "v5", title: "Adding Controls", duration: "9:00", xp: 15, thumbnail: "🎬" },
            { id: "v6", title: "Game Over Logic", duration: "6:00", xp: 10, thumbnail: "🎬" },
            { id: "v7", title: "Budget Management", duration: "8:00", xp: 12, thumbnail: "🎬" },
            { id: "v8", title: "Monetization Basics", duration: "7:00", xp: 12, thumbnail: "🎬" },
        ],
        quizzes: [
            { id: "q1", title: "Tetris Mechanics Quiz", questions: 5, xp: 25, icon: "📝" },
            { id: "q2", title: "Game Design Quiz", questions: 5, xp: 25, icon: "📝" },
            { id: "q3", title: "Financial Literacy Quiz", questions: 5, xp: 25, icon: "📝" },
        ],
        nextModule: {
            moduleId: "aqua-bridge",
            title: "Aqua Bridge",
            icon: "🌉",
            description: "Engineering robust structures over water.",
            xp: 96,
        },
    },
    "aqua-bridge": {
        videos: [
            { id: "v1", title: "Understanding Bridges", duration: "7:00", xp: 12, thumbnail: "🎬" },
            { id: "v2", title: "Water Dynamics", duration: "8:00", xp: 12, thumbnail: "🎬" },
            { id: "v3", title: "Material Selection", duration: "6:00", xp: 10, thumbnail: "🎬" },
            { id: "v4", title: "Structural Design", duration: "10:00", xp: 15, thumbnail: "🎬" },
            { id: "v5", title: "Building Process", duration: "12:00", xp: 20, thumbnail: "🎬" },
            { id: "v6", title: "Testing and Iteration", duration: "8:00", xp: 12, thumbnail: "🎬" },
        ],
        quizzes: [
            { id: "q1", title: "Bridge Basics Quiz", questions: 5, xp: 25, icon: "📝" },
            { id: "q2", title: "Design Principles Quiz", questions: 5, xp: 25, icon: "📝" },
            { id: "q3", title: "Construction Quiz", questions: 5, xp: 25, icon: "📝" },
        ],
        nextModule: {
            moduleId: "drawing-bot",
            title: "Drawing Bot",
            icon: "🖊️",
            description: "Merge art and engineering with a plot-bot.",
            xp: 112,
        },
    },
    "drawing-bot": {
        videos: [
            { id: "v1", title: "Introduction to AI Art", duration: "6:00", xp: 10, thumbnail: "🎬" },
            { id: "v2", title: "Building the Bot Frame", duration: "10:00", xp: 15, thumbnail: "🎬" },
            { id: "v3", title: "Motor Control Systems", duration: "9:00", xp: 15, thumbnail: "🎬" },
            { id: "v4", title: "AI Drawing Algorithms", duration: "12:00", xp: 20, thumbnail: "🎬" },
            { id: "v5", title: "Pen Holder Mechanism", duration: "7:00", xp: 12, thumbnail: "🎬" },
            { id: "v6", title: "Testing Your Art Bot", duration: "6:00", xp: 10, thumbnail: "🎬" },
        ],
        quizzes: [
            { id: "q1", title: "Drawing Bot Assessment", questions: 8, xp: 40, icon: "📝" },
        ],
        nextModule: {
            moduleId: "soil-monitoring",
            title: "Soil Monitor",
            icon: "🌱",
            description: "Smart agriculture using IoT sensors.",
            xp: 123,
        },
    },
    "soil-monitoring": {
        videos: [
            { id: "v1", title: "Soil Science Basics", duration: "7:00", xp: 12, thumbnail: "🎬" },
            { id: "v2", title: "Sensor Types", duration: "8:00", xp: 12, thumbnail: "🎬" },
            { id: "v3", title: "Building the Monitor", duration: "10:00", xp: 15, thumbnail: "🎬" },
            { id: "v4", title: "Data Collection", duration: "9:00", xp: 15, thumbnail: "🎬" },
            { id: "v5", title: "Analyzing Results", duration: "8:00", xp: 12, thumbnail: "🎬" },
            { id: "v6", title: "Agricultural Finance", duration: "7:00", xp: 12, thumbnail: "🎬" },
            { id: "v7", title: "Investment Planning", duration: "6:00", xp: 10, thumbnail: "🎬" },
        ],
        quizzes: [
            { id: "q1", title: "Soil Science Quiz", questions: 5, xp: 25, icon: "📝" },
            { id: "q2", title: "Financial Planning Quiz", questions: 5, xp: 25, icon: "📝" },
        ],
        nextModule: {
            moduleId: "homopolar-motor",
            title: "Homopolar Motor",
            icon: "⚡",
            description: "Explore electromagnetism with simple materials.",
            xp: 50,
        },
    },
    "homopolar-motor": {
        videos: [
            { id: "v1", title: "Building a Homopolar Motor", duration: "8:00", xp: 20, thumbnail: "🎬" },
        ],
        quizzes: [
            { id: "q1", title: "Motor Physics Quiz", questions: 5, xp: 30, icon: "📝" },
        ],
        nextModule: {
            moduleId: "final-assessment",
            title: "Final Exam",
            icon: "🎓",
            description: "The ultimate test of your engineering skills.",
            xp: 300,
        },
    },
    "final-assessment": {
        videos: [],
        quizzes: [],
        assessments: [
            { id: "a1", title: "Design Thinking Final Exam", questions: 20, xp: 100, icon: "🏆" },
            { id: "a2", title: "Financial Literacy Final Exam", questions: 20, xp: 100, icon: "🏆" },
            { id: "a3", title: "AI & Robotics Final Exam", questions: 20, xp: 100, icon: "🏆" },
        ],
        nextModule: null, // End of course
    },
};

// Initial player state
const initialPlayerState = {
    name: "Yogesh Singh",
    totalXP: 0,
    protocol: "Grade_6",
    totalStars: 0,
    streak: 0,
    currentModuleId: "innovators-mind",
    // Track completed items per module
    progress: {
        "innovators-mind": { watchedVideos: [], completedQuizzes: [], completedAssessments: [] },
        "trebuchet": { watchedVideos: [], completedQuizzes: [], completedAssessments: [] },
        "motor-robot": { watchedVideos: [], completedQuizzes: [], completedAssessments: [] },
        "tetris": { watchedVideos: [], completedQuizzes: [], completedAssessments: [] },
        "aqua-bridge": { watchedVideos: [], completedQuizzes: [], completedAssessments: [] },
        "drawing-bot": { watchedVideos: [], completedQuizzes: [], completedAssessments: [] },
        "soil-monitoring": { watchedVideos: [], completedQuizzes: [], completedAssessments: [] },
        "homopolar-motor": { watchedVideos: [], completedQuizzes: [], completedAssessments: [] },
        "final-assessment": { watchedVideos: [], completedQuizzes: [], completedAssessments: [] },
    },
    // Track module completion status
    moduleStatus: {
        "innovators-mind": "current",
        "trebuchet": "locked",
        "motor-robot": "locked",
        "tetris": "locked",
        "aqua-bridge": "locked",
        "drawing-bot": "locked",
        "soil-monitoring": "locked",
        "homopolar-motor": "locked",
        "final-assessment": "locked",
    },
    badges: [],
    spinHistory: [], // Track spin results
    unlockedPuzzleCount: 0,
    coins: 1000, // Initial coins for testing

    spinHistory: [], // Array of { id, date, reward, type }
    profileImage: "/assets/achievements/badge1.png", // Default avatar
    collectedAchievements: [], // Array of achievement IDs that have been collected
};

// Module order for unlocking
const moduleOrder = [
    { id: "innovators-mind", unlockCount: 1 },
    { id: "trebuchet", unlockCount: 1 },
    { id: "motor-robot", unlockCount: 1 },
    { id: "tetris", unlockCount: 1 },
    { id: "aqua-bridge", unlockCount: 1 },
    { id: "drawing-bot", unlockCount: 1 },
    { id: "soil-monitoring", unlockCount: 1 },
    { id: "homopolar-motor", unlockCount: 1 },
    { id: "final-assessment", unlockCount: 1 },
];

export const useLMSStore = create(
    persist(
        (set, get) => ({
            // Player state
            player: initialPlayerState,

            // UI state
            selectedVideo: null,
            isVideoModalOpen: false,
            isQuizModalOpen: false,
            selectedQuiz: null,
            showContentPanel: false,

            showVideoQuizConfetti: false,

            // Animation state
            showConfetti: false,
            animatingStarFrom: null, // { x, y } coordinates
            coinTarget: null,
            pendingXPGain: 0,
            lastCompletedModuleId: null,
            showMissionTransition: false, // New state for modal transition

            // Settings
            soundEnabled: true,
            toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

            // Mission Transition Actions


            openMissionTransition: () => {
                console.log("STORE: openMissionTransition CALLED");
                set({ showMissionTransition: true });
            },
            closeMissionTransition: () => {
                console.log("STORE: closeMissionTransition CALLED");
                set({ showMissionTransition: false });
            },

            // Get module content
            getModuleContent: (moduleId) => moduleContent[moduleId] || { videos: [], quizzes: [] },

            // Get current module content
            getCurrentModuleContent: () => {
                const { player } = get();
                return moduleContent[player.currentModuleId] || { videos: [], quizzes: [] };
            },

            // Calculate module progress percentage
            getModuleProgress: (moduleId) => {
                const { player } = get();
                const content = moduleContent[moduleId];
                if (!content) return 0;

                const progress = player.progress[moduleId];
                const totalItems =
                    content.videos.length +
                    content.quizzes.length +
                    (content.assessments?.length || 0);
                const completedItems =
                    progress.watchedVideos.length +
                    progress.completedQuizzes.length +
                    progress.completedAssessments.length;

                return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
            },

            // Check if video is watched
            isVideoWatched: (moduleId, videoId) => {
                const { player } = get();
                return player.progress[moduleId]?.watchedVideos.includes(videoId) || false;
            },

            // Check if quiz is completed
            isQuizCompleted: (moduleId, quizId) => {
                const { player } = get();
                return player.progress[moduleId]?.completedQuizzes.includes(quizId) || false;
            },

            // Mark video as watched
            markVideoWatched: (moduleId, videoId) => {
                const { player } = get();
                const content = moduleContent[moduleId];
                const video = content?.videos.find((v) => v.id === videoId);

                if (!video || player.progress[moduleId].watchedVideos.includes(videoId)) {
                    return;
                }

                set((state) => ({
                    player: {
                        ...state.player,
                        totalXP: state.player.totalXP + video.xp,
                        progress: {
                            ...state.player.progress,
                            [moduleId]: {
                                ...state.player.progress[moduleId],
                                watchedVideos: [...state.player.progress[moduleId].watchedVideos, videoId],
                            },
                        },
                    },
                }));

                // Check if module is complete
                get().checkModuleCompletion(moduleId);
            },

            // Complete quiz
            completeQuiz: (moduleId, quizId) => {
                const { player } = get();
                const content = moduleContent[moduleId];
                const quiz = content?.quizzes.find((q) => q.id === quizId);

                if (!quiz || player.progress[moduleId].completedQuizzes.includes(quizId)) {
                    return;
                }

                set((state) => ({
                    player: {
                        ...state.player,
                        totalXP: state.player.totalXP + quiz.xp,
                        progress: {
                            ...state.player.progress,
                            [moduleId]: {
                                ...state.player.progress[moduleId],
                                completedQuizzes: [...state.player.progress[moduleId].completedQuizzes, quizId],
                            },
                        },
                    },
                }));

                get().checkModuleCompletion(moduleId);
            },

            // Check if module is complete and unlock next
            checkModuleCompletion: (moduleId) => {
                const { player } = get();
                const progress = get().getModuleProgress(moduleId);

                if (progress === 100 && player.moduleStatus[moduleId] !== "completed") {
                    const currentIndex = moduleOrder.findIndex(m => m.id === moduleId);
                    const currentModuleConfig = moduleOrder[currentIndex];
                    const nextModuleConfig = moduleOrder[currentIndex + 1];

                    set((state) => ({
                        player: {
                            ...state.player,
                            totalStars: state.player.totalStars + 1,
                            unlockedPuzzleCount: Math.min(9, state.player.unlockedPuzzleCount + (currentModuleConfig?.unlockCount || 0)),
                            moduleStatus: {
                                ...state.player.moduleStatus,
                                [moduleId]: "completed",
                                ...(nextModuleConfig ? { [nextModuleConfig.id]: "current" } : {}),
                            },
                        },
                        showConfetti: true,
                        lastCompletedModuleId: moduleId,
                        // Close any open modals so animation can be seen
                        isVideoModalOpen: false,
                        isQuizModalOpen: false,
                        selectedVideo: null,
                        selectedQuiz: null,
                    }));
                }
            },

            // UI Actions
            openVideoModal: (video) => set({ selectedVideo: video, isVideoModalOpen: true }),
            closeVideoModal: () => set({ selectedVideo: null, isVideoModalOpen: false }),

            openQuizModal: (quiz) => set({ selectedQuiz: quiz, isQuizModalOpen: true }),
            closeQuizModal: () => set({ selectedQuiz: null, isQuizModalOpen: false }),

            toggleContentPanel: () => set((state) => ({ showContentPanel: !state.showContentPanel })),
            openContentPanel: () => set({ showContentPanel: true }),
            closeContentPanel: () => set({ showContentPanel: false }),

            // Animation Actions
            triggerConfetti: () => set({ showConfetti: true }),
            toggleVideoQuizConfetti: (val) => set({ showVideoQuizConfetti: val }),
            hideConfetti: () => set({ showConfetti: false }),
            setCoinTarget: (pos) => set({ coinTarget: pos }),
            triggerStarAnimation: (fromPosition, xpAmount) => set({
                animatingStarFrom: fromPosition,
                pendingXPGain: xpAmount,
            }),
            completeStarAnimation: () => set({ animatingStarFrom: null, pendingXPGain: 0 }),

            // Coin Management
            updateCoins: (amount) => set((state) => ({
                player: {
                    ...state.player,
                    coins: state.player.coins + amount
                }
            })),

            setProfileImage: (image) => set((state) => ({
                player: {
                    ...state.player,
                    profileImage: image
                }
            })),

            collectAchievement: (achievementId) => set((state) => ({
                player: {
                    ...state.player,
                    collectedAchievements: [...state.player.collectedAchievements, achievementId]
                }
            })),

            addSpinResult: (result) => set((state) => ({
                player: {
                    ...state.player,
                    spinHistory: [result, ...state.player.spinHistory].slice(0, 50), // Keep last 50
                    totalXP: state.player.totalXP - (result.cost || 0)
                }
            })),


            // Reset progress (for testing)
            resetProgress: () => set({ player: initialPlayerState }),
        }),
        {
            name: "hunarho-lms-storage",
            version: 4,
            migrate: (persistedState, version) => {
                let state = persistedState;

                if (version < 2) {
                    state = {
                        ...state,
                        coinTarget: null,
                        animatingStarFrom: null,
                    };
                }

                if (version < 3) {
                    state = {
                        ...state,
                        player: {
                            ...state.player,
                            coins: state.player?.coins ?? 1000 // Initialize coins if missing, preserve if exists (though unlikely for v2->v3)
                        }
                    };
                }



                return state;
            },
            partialize: (state) => ({
                player: state.player,
                soundEnabled: state.soundEnabled,
            }),
        }
    )
);

export { moduleContent, moduleOrder };
