// Hunarho LMS - Level Canvas Configuration
// Grade 6: Design Thinking, Financial Literacy & AI

export const canvasConfig = {
    viewport: {
        width: 1600,
        height: 1000,
        initialOffset: { x: 100, y: 50 },
    },
    // Background image for the canvas (set null to use default gradient)
    // You can use any game-themed background image here
    backgroundImage: null, // Example: "/images/game-bg.jpg" or "/images/space-bg.png"
    backgroundOpacity: 0.3, // Opacity of the background image (0-1)
    animations: {
        treeFloat: 3,
        starTwinkle: 2,
        pathGlow: 2,
    },
    stars: {
        count: 30,
        minSize: 2,
        maxSize: 5,
    },
};

// Canvas node positions - Professional serpentine roadmap layout (Desktop)
// Path flows: Start (bottom-left) -> winds up and right -> Final (top-right)
export const canvasNodePositions = [
    // Row 1 (Bottom) - Start point
    { id: 1, moduleId: "innovators-mind", x: 150, y: 650 },      // START - Bottom left

    // Row 2 - Going right
    { id: 2, moduleId: "trebuchet", x: 350, y: 550 },            // Up-right

    // Row 3 - Continue right and up
    { id: 3, moduleId: "motor-robot", x: 550, y: 450 },          // Continue up-right

    // Row 4 - Turn right
    { id: 4, moduleId: "tetris", x: 750, y: 520 },               // Slight down-right turn

    // Row 5 - Go up
    { id: 5, moduleId: "soil-monitoring", x: 950, y: 420 },      // Up-right

    // Row 6 - Continue path
    { id: 6, moduleId: "aqua-bridge", x: 750, y: 320 },          // Back left and up

    // Row 7 - Upper section
    { id: 7, moduleId: "drawing-bot", x: 550, y: 220 },          // Continue left-up

    // Row 8 - Near top
    { id: 8, moduleId: "homopolar-motor", x: 750, y: 120 },      // Right and up

    // Row 9 (Top) - Final destination
    { id: 9, moduleId: "final-assessment", x: 950, y: 80 },      // FINAL - Top right
];

// Mobile node positions - Zigzag pattern for phone screens
// Fits within viewBox="0 0 360 700" with alternating left/right positions
export const mobileNodePositions = [
    { id: 1, moduleId: "innovators-mind", x: 100, y: 60 },       // START - left
    { id: 2, moduleId: "trebuchet", x: 260, y: 130 },            // right
    { id: 3, moduleId: "motor-robot", x: 100, y: 200 },          // left
    { id: 4, moduleId: "tetris", x: 260, y: 270 },               // right
    { id: 5, moduleId: "soil-monitoring", x: 100, y: 340 },      // left
    { id: 6, moduleId: "aqua-bridge", x: 260, y: 410 },          // right
    { id: 7, moduleId: "drawing-bot", x: 100, y: 480 },          // left
    { id: 8, moduleId: "homopolar-motor", x: 260, y: 550 },      // right
    { id: 9, moduleId: "final-assessment", x: 180, y: 640 },     // FINAL - center
];

// Decoration positions (kept for potential future use)
export const decorationPositions = {
    trees: [],
    snowman: { x: 550, y: 320, scale: 0.8 },
    giftBox: { x: 1050, y: 100, scale: 0.9 },
    rocks: [],
    snowMounds: [],
};


// Module definitions with content counts
export const modules = [
    {
        id: "innovators-mind",
        name: "Innovators Mind",
        shortName: "Design Thinking",
        description: "Master the 5 stages of Design Thinking to solve complex problems with a human-centric approach.",
        image: "/assets/images/3d_1.png",
        videos: 2,
        quizzes: 1,
        totalStars: 5,
        theme: "purple",
    },
    {
        id: "trebuchet",
        name: "Project Trebuchet",
        shortName: "Trebuchet",
        description: "Engineeer a functional medieval siege engine while learning the physics of levers and counterweights.",
        image: "/assets/images/3d_2.png",
        videos: 2,
        quizzes: 1,
        totalStars: 5,
        theme: "amber",
    },
    {
        id: "motor-robot",
        name: "Motor Robot",
        shortName: "Financial Literacy",
        description: "Design and build your first autonomous rover and manage its production budget effectively.",
        image: "/assets/images/3d_3.png",
        videos: 7,
        quizzes: 1,
        totalStars: 10,
        theme: "cyan",
    },
    {
        id: "tetris",
        name: "Project Tetris",
        shortName: "Financial Literacy",
        description: "Code a high-performance puzzle game and implement a scalable monetization strategy.",
        image: "/assets/images/3d_4.png",
        videos: 8,
        quizzes: 3,
        totalStars: 17,
        theme: "pink",
    },
    {
        id: "aqua-bridge",
        name: "Aqua Bridge",
        shortName: "Design Thinking",
        description: "Analyze water dynamics and structural load to engineer a bridge that withstands the elements.",
        image: "/assets/images/3d_5.png",
        videos: 6,
        quizzes: 3,
        totalStars: 15,
        theme: "blue",
    },
    {
        id: "drawing-bot",
        name: "Drawing Bot",
        shortName: "Artificial Intelligence",
        description: "Bridge the gap between art and technology by programming a robot to generate generative art.",
        image: "/assets/images/3d_6.png",
        videos: 6,
        quizzes: 1,
        totalStars: 9,
        theme: "green",
    },
    {
        id: "soil-monitoring",
        name: "Soil Monitoring",
        shortName: "Financial Literacy",
        description: "Deploy IoT sensors for smart agriculture and pitch your scalable farming solution to investors.",
        image: "/assets/images/3d_7.png",
        videos: 7,
        quizzes: 2,
        totalStars: 13,
        theme: "emerald",
    },
    {
        id: "homopolar-motor",
        name: "Homopolar Motor",
        shortName: "Quick Lab",
        description: "Conduct high-speed experiments with electromagnetism using minimal hardware and maximum precision.",
        image: "/assets/images/3d_8.png",
        videos: 1,
        quizzes: 1,
        totalStars: 4,
        theme: "yellow",
    },
    {
        id: "final-assessment",
        name: "Final Assessment",
        shortName: "Grade 6 Exam",
        description: "The ultimate deployment of your engineering and financial skills in a high-stakes simulation.",
        image: "/assets/images/3d_8.png",
        videos: 0,
        quizzes: 0,
        assessments: 3,
        totalStars: 15,
        theme: "gold",
    },
];

// Level Sections (Islands) - grouped by learning track
export const levelSections = [
    {
        id: 1,
        title: null,
        subtitle: "Begin Your Journey",
        canJumpHere: false,
        jumpButtonColor: "green",
        island: "🏝️ Design Thinking Island",
        levels: [
            {
                id: 1,
                moduleId: "innovators-mind",
                status: "current",
                label: "START",
                position: { offsetX: 0 },
                image: "/assets/images/3d_1.png",
                name: "Innovators Mind",
                progress: { videos: 0, quizzes: 0, total: 3 },
            },
            {
                id: 2,
                moduleId: "trebuchet",
                status: "locked",
                position: { offsetX: -90 },
                image: "/assets/images/3d_2.png",
                name: "Trebuchet",
                progress: { videos: 0, quizzes: 0, total: 3 },
            },
        ],
    },
    {
        id: 2,
        title: "Financial Literacy Track",
        canJumpHere: true,
        jumpButtonColor: "cyan",
        island: "💰 Money Masters Island",
        levels: [
            {
                id: 3,
                moduleId: "motor-robot",
                status: "locked",
                position: { offsetX: 40 },
                image: "/assets/images/3d_3.png",
                name: "Motor Robot",
                progress: { videos: 0, quizzes: 0, total: 8 },
            },
            {
                id: 4,
                moduleId: "tetris",
                status: "locked",
                position: { offsetX: -65 },
                image: "/assets/images/3d_4.png",
                name: "Tetris",
                progress: { videos: 0, quizzes: 0, total: 11 },
            },
            {
                id: 5,
                moduleId: "soil-monitoring",
                status: "locked",
                position: { offsetX: 60 },
                image: "/assets/images/3d_5.png",
                name: "Soil Monitoring",
                progress: { videos: 0, quizzes: 0, total: 9 },
            },
        ],
    },
    {
        id: 3,
        title: "Design & AI Track",
        canJumpHere: true,
        jumpButtonColor: "purple",
        island: "🤖 AI Innovation Island",
        levels: [
            {
                id: 6,
                moduleId: "aqua-bridge",
                status: "locked",
                position: { offsetX: -55 },
                image: "/assets/images/3d_5.png",
                name: "Aqua Bridge",
                progress: { videos: 0, quizzes: 0, total: 9 },
            },
            {
                id: 7,
                moduleId: "drawing-bot",
                status: "locked",
                position: { offsetX: 70 },
                image: "/assets/images/3d_6.png",
                name: "Drawing Bot",
                progress: { videos: 0, quizzes: 0, total: 7 },
            },
        ],
    },
    {
        id: 4,
        title: "Quick Lab",
        canJumpHere: true,
        jumpButtonColor: "yellow",
        island: "⚡ Quick Lab Island",
        levels: [
            {
                id: 8,
                moduleId: "homopolar-motor",
                status: "locked",
                position: { offsetX: 0 },
                image: "/assets/images/3d_8.png",
                name: "Homopolar Motor",
                progress: { videos: 0, quizzes: 0, total: 2 },
            },
        ],
    },
    {
        id: 5,
        title: "🏆 Final Challenge",
        canJumpHere: false,
        jumpButtonColor: "gold",
        island: "🏰 Final Castle",
        levels: [
            {
                id: 9,
                moduleId: "final-assessment",
                status: "locked",
                label: "FINAL",
                position: { offsetX: 0 },
                image: "/assets/images/3d_8.png",
                name: "Grade 6 Assessment",
                progress: { assessments: 0, total: 3 },
            },
        ],
    },
];

// Player Data
export const defaultPlayer = {
    name: "Student",
    avatar: "/player-avatar.png",
    currentModuleId: "innovators-mind",
    totalStars: 0,
    totalCoins: 0,
    streak: 0,
    badges: [],
    completedModules: [],
};
