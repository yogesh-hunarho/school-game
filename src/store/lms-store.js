import { create } from "zustand";
import { persist } from "zustand/middleware";

const moduleContent = {
    "innovators-mind": {
        videos: [
            {
                id: "v1",
                title: "Introduction to Design Thinking",
                duration: "5:30",
                xp: 10,
                thumbnail: "🎬",
            },
            {
                id: "v2",
                title: "The 5 Stages of Design Thinking",
                duration: "8:45",
                xp: 15,
                thumbnail: "🎬",
            },
        ],
        quizzes: [
            {
                id: "q1",
                title: "Design Thinking Basics Quiz",
                questions: 5,
                xp: 25,
                icon: "📝",
            },
        ],
    },
    "trebuchet": {
        videos: [
            {
                id: "v1",
                title: "History of the Trebuchet",
                duration: "6:20",
                xp: 10,
                thumbnail: "🎬",
            },
            {
                id: "v2",
                title: "Building Your Trebuchet",
                duration: "12:00",
                xp: 20,
                thumbnail: "🎬",
            },
        ],
        quizzes: [
            {
                id: "q1",
                title: "Trebuchet Mechanics Quiz",
                questions: 5,
                xp: 25,
                icon: "📝",
            },
        ],
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
    },
    "homopolar-motor": {
        videos: [
            { id: "v1", title: "Building a Homopolar Motor", duration: "8:00", xp: 20, thumbnail: "🎬" },
        ],
        quizzes: [
            { id: "q1", title: "Motor Physics Quiz", questions: 5, xp: 30, icon: "📝" },
        ],
    },
    "final-assessment": {
        videos: [],
        quizzes: [],
        assessments: [
            { id: "a1", title: "Design Thinking Final Exam", questions: 20, xp: 100, icon: "🏆" },
            { id: "a2", title: "Financial Literacy Final Exam", questions: 20, xp: 100, icon: "🏆" },
            { id: "a3", title: "AI & Robotics Final Exam", questions: 20, xp: 100, icon: "🏆" },
        ],
    },
};

// Initial player state
const initialPlayerState = {
    name: "Student",
    totalXP: 0,
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
};

// Module order for unlocking
const moduleOrder = [
    "innovators-mind",
    "trebuchet",
    "motor-robot",
    "tetris",
    "aqua-bridge",
    "drawing-bot",
    "soil-monitoring",
    "homopolar-motor",
    "final-assessment",
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

            // Animation state
            showConfetti: false,
            animatingStarFrom: null, // { x, y } coordinates
            pendingXPGain: 0,
            lastCompletedModuleId: null,

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
                const progress = get().getModuleProgress(moduleId);

                if (progress === 100) {
                    const currentIndex = moduleOrder.indexOf(moduleId);
                    const nextModuleId = moduleOrder[currentIndex + 1];

                    set((state) => ({
                        player: {
                            ...state.player,
                            totalStars: state.player.totalStars + 1,
                            moduleStatus: {
                                ...state.player.moduleStatus,
                                [moduleId]: "completed",
                                ...(nextModuleId ? { [nextModuleId]: "current" } : {}),
                            },
                            currentModuleId: nextModuleId || moduleId,
                        },
                        showConfetti: true,
                        lastCompletedModuleId: moduleId,
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
            triggerConfetti: (moduleId) => set({ showConfetti: true, lastCompletedModuleId: moduleId }),
            hideConfetti: () => set({ showConfetti: false }),
            triggerStarAnimation: (fromPosition, xpAmount) => set({
                animatingStarFrom: fromPosition,
                pendingXPGain: xpAmount,
            }),
            completeStarAnimation: () => set({ animatingStarFrom: null, pendingXPGain: 0 }),

            // Reset progress (for testing)
            resetProgress: () => set({ player: initialPlayerState }),
        }),
        {
            name: "hunarho-lms-storage",
        }
    )
);

export { moduleContent, moduleOrder };
