
import { Button } from "@/components/ui/button"
import { Terminal, Shield, Zap, Target } from "lucide-react"
import { Link } from "react-router-dom"

export default function MainLayout() {
    return (
        <main className="relative w-full flex items-center justify-center overflow-hidden mt-10">
            <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="relative flex justify-center items-end min-h-[320px] sm:min-h-[380px] md:min-h-[420px]">
                    {/* here 3d */}
                </div>

                {/* CONTENT */}
                <div className="flex flex-col space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right-6 duration-700">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-primary">
                            <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em]">
                                Neural Link Established
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black uppercase leading-none">
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
                                <div className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                                    XP Reward
                                </div>
                                <div className="flex items-center text-secondary font-sans text-sm">
                                    <Zap className="w-3 h-3 mr-1" /> +1000 XP
                                </div>
                            </div>

                            <div>
                                <div className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">
                                    Difficulty
                                </div>
                                <div className="text-primary font-sans tracking-widest text-sm">
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
                </div>
            </div>
        </main>
    )
}

