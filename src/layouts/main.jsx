
import { Button } from "@/components/ui/button"
import { Terminal, Shield, Zap, Target } from "lucide-react"
import { Link } from "react-router-dom"

export default function MainLayout() {
    return (
        <main className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 overflow-hidden bg-background">

            {/* Background Grid */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:50px_50px]" />
            </div>

            <div className="scanline" />

            {/* Main Grid */}
            <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

                {/* CHARACTER */}
                <div className="relative flex justify-center items-end min-h-[320px] sm:min-h-[380px] md:min-h-[420px]">
                    <div className="absolute bottom-6 w-[70%] h-[20%] bg-primary/20 blur-3xl rounded-full" />

                    <div className="relative w-full max-w-[260px] sm:max-w-sm transition-transform duration-500 md:hover:scale-105">
                        <img
                            src="/peep-standing-15.png"
                            alt="Recruit"
                            className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(0,243,255,0.25)]"
                        />

                        {/* Desktop HUD */}
                        <div className="absolute top-1/4 -right-8 border-l-2 border-primary pl-4 py-2 bg-background/60 backdrop-blur-md hidden md:block">
                            <div className="text-[10px] uppercase tracking-widest text-primary font-mono opacity-70">
                                Status
                            </div>
                            <div className="text-sm font-mono font-bold text-primary">
                                SYNC_OK: 98%
                            </div>
                        </div>

                        <div className="absolute bottom-1/4 -left-8 border-r-2 border-secondary pr-4 py-2 bg-background/60 backdrop-blur-md hidden md:block">
                            <div className="text-[10px] uppercase tracking-widest text-secondary font-mono opacity-70">
                                Level
                            </div>
                            <div className="text-sm font-mono font-bold text-secondary">
                                LVL 02 // ROOKIE
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTENT */}
                <div className="flex flex-col space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right-6 duration-700">

                    {/* Heading */}
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-primary">
                            <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em]">
                                Neural Link Established
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-mono font-black uppercase leading-none">
                            Welcome to <span className="text-primary italic">HUNARHO</span>
                        </h1>

                        <div className="h-1 w-24 sm:w-32 bg-secondary glow-yellow" />
                    </div>

                    {/* Mission Card */}
                    <div className="bg-muted/30 border-l-4 border-primary p-4 sm:p-6 backdrop-blur-sm space-y-4 relative overflow-hidden">
                        <Terminal className="absolute top-3 right-3 w-12 h-12 opacity-10" />

                        <div className="flex items-center space-x-2">
                            <Target className="w-4 h-4 text-secondary" />
                            <h2 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-secondary">
                                Initial Mission Objective
                            </h2>
                        </div>

                        <p className="text-xs sm:text-sm text-muted-foreground font-mono leading-relaxed">
                            [SYSTEM]: New operative detected in sector 7. Initializing high-level robotics training sequence.
                            Sync with the <span className="text-primary">MOTOR ROBOT</span> interface and bypass neural encryption locks.
                        </p>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                            <div>
                                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                                    XP Reward
                                </div>
                                <div className="flex items-center text-secondary font-mono text-sm">
                                    <Zap className="w-3 h-3 mr-1" /> +1000 XP
                                </div>
                            </div>

                            <div>
                                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                                    Difficulty
                                </div>
                                <div className="text-primary font-mono tracking-widest text-sm">
                                    NORMAL
                                </div>
                            </div>
                        </div>
                    </div>


                    <Link
                        to="/courses"
                        className="inline-flex items-center justify-center px-6 py-3 rounded-xl 
             border-2 border-magenta-500 text-magenta-400 font-bold
             hover:bg-magenta-500 hover:text-white
             hover:shadow-lg hover:shadow-magenta-500/40
             transition-all duration-200"
                    >
                        &gt; Initialize Mission
                    </Link>


                    {/* Footer */}
                    <div className="pt-6 border-t border-white/5 flex items-center justify-between opacity-50">
                        <div className="text-[10px] font-mono uppercase tracking-widest">
                            System v4.0.2
                        </div>
                        <div className="flex space-x-3">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse delay-75" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

