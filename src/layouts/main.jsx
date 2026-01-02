
import { Button } from "@/components/ui/button"
import CyberpunkButton from "@/components/ui/cyber-button"
import { Terminal, Shield, Zap, Target } from "lucide-react"
import { Link } from "react-router-dom"

export default function MainLayout() {
    return (
        <main className="relative w-full flex items-center justify-center overflow-hidden mt-10 p-4 md:p-2 mb-5">
            <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="relative flex justify-center items-end">
                    <div className="relative flex justify-center items-end">
                        {/* <div className="absolute bottom-6 w-[70%] h-[20%] bg-primary/20 blur-3xl rounded-full" /> */}
                        <div className="relative w-full max-w-[260px] sm:max-w-sm transition-transform duration-500 md:hover:scale-105">
                            <img
                                src="/peep-standing-15.png"
                                alt="Recruit"
                                className="w-full h-[500px] object-contain "
                            />
                        </div>
                    </div>
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
                                    Coin Reward
                                </div>
                                <div className="flex items-center text-secondary font-sans text-sm">
                                    <Zap className="w-3 h-3 mr-1" /> +1000 Coin
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
                    <CyberpunkButton variant="secondary" className="w-full max-w-sm">
                        <Link to="/courses">Initialize Mission</Link>
                    </CyberpunkButton>
                </div>
            </div>
        </main>
    )
}

