import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Star, Zap, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { type ReactNode } from "react"

interface Module {
    id: string;
    name: string;
    icon: ReactNode;
    totalStars: number;
    videos: number;
    quizzes: number;
}

interface CyberpunkCardProps {
    module: Module;
    status: string;
    isLocked: boolean;
    isCurrent: boolean;
    isCompleted: boolean;
    isActive: boolean;
    progress: number;
    handleModuleSelect: (moduleId: string) => void;
}

export function CyberpunkCard({
    module,
    isLocked,
    isCurrent,
    isCompleted,
    isActive,
    progress,
    handleModuleSelect
}: CyberpunkCardProps) {
    // Determine status indicator
    const getStatusConfig = () => {
        if (isCompleted) return { text: "COMPLETE", color: "text-chart-4", bgColor: "bg-chart-4", dotColor: "bg-chart-4 shadow-[0_0_8px_rgba(0,255,128,0.8)]" };
        if (isActive) return { text: "ACTIVE", color: "text-primary", bgColor: "bg-primary", dotColor: "bg-primary shadow-[0_0_8px_rgba(0,217,255,0.8)]" };
        if (isCurrent) return { text: "READY", color: "text-primary", bgColor: "bg-primary", dotColor: "bg-primary shadow-[0_0_8px_rgba(0,217,255,0.8)] animate-pulse" };
        if (isLocked) return { text: "LOCKED", color: "text-muted-foreground", bgColor: "bg-muted", dotColor: "bg-muted-foreground" };
        return { text: "AVAILABLE", color: "text-muted-foreground", bgColor: "bg-muted", dotColor: "bg-muted-foreground" };
    };

    const statusConfig = getStatusConfig();

    return (
        <motion.div
            whileTap={!isLocked ? { scale: 0.98 } : {}}
            onClick={() => !isLocked && handleModuleSelect(module.id)}
            className={cn(
                "cursor-pointer transition-all duration-300 cursor-target",
                isLocked && "opacity-60 grayscale cursor-not-allowed"
            )}
        >
            <Card
                className={cn(
                    "relative w-full overflow-hidden border-primary/50 transition-all duration-500",
                    isActive && "border-primary shadow-[0_0_10px_rgba(0,217,255,0.3)]",
                    isCompleted && "border-chart-4/50 shadow-[0_0_4px_rgba(0,255,128,0.2)]"
                )}
            >
                <CardHeader className="relative z-10 border-b border-primary/30 pb-4">
                    <div className="flex items-center justify-between">
                        <div className={cn(
                            "w-12 h-12 rounded-lg flex items-center justify-center text-2xl border transition-all",
                            isCompleted ? "bg-chart-4/20 border-chart-4/50" :
                                isActive ? "bg-primary/20 border-primary/50" :
                                    "bg-muted border-border"
                        )}>
                            {isLocked ? <Lock className="w-5 h-5 text-muted-foreground" /> : module.icon}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className={cn("h-2 w-2 rounded-full", statusConfig.dotColor)} />
                            <span className={cn("font-mono text-xs", statusConfig.color)}>{statusConfig.text}</span>
                        </div>
                    </div>
                    <CardTitle className="font-sans text-lg font-bold tracking-wide text-foreground mt-3 line-clamp-2">
                        {module.name}
                    </CardTitle>
                </CardHeader>

                <CardContent className="relative z-10 space-y-4 pt-4">
                    {/* Stats Row */}
                    <div className="grid grid-cols-1 gap-3">
                        <div className="group relative rounded-lg border border-primary/30 bg-muted/50 p-3 backdrop-blur-sm transition-all hover:border-primary hover:bg-muted/70">
                            <div className="absolute inset-0 rounded-lg bg-primary/5 opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative flex items-center gap-2">
                                <div className="rounded-full bg-primary/20 p-1.5">
                                    <Star className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <p className="font-mono text-[10px] text-muted-foreground">XP REWARD</p>
                                    <p className="font-sans text-sm font-bold text-foreground">{module.totalStars}00</p>
                                </div>
                            </div>
                        </div>

                        <div className="group relative rounded-lg border border-secondary/30 bg-muted/50 p-3 backdrop-blur-sm transition-all hover:border-secondary hover:bg-muted/70">
                            <div className="absolute inset-0 rounded-lg bg-secondary/5 opacity-0 transition-opacity group-hover:opacity-100" />
                            <div className="relative flex items-center gap-2">
                                <div className="rounded-full bg-secondary/20 p-1.5">
                                    <Zap className="h-4 w-4 text-secondary" />
                                </div>
                                <div>
                                    <p className="font-mono text-[10px] text-muted-foreground">SEQUENCES</p>
                                    <p className="font-sans text-sm font-bold text-foreground">{module.videos + module.quizzes}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2 rounded-lg border border-primary/30 bg-muted/30 p-3 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <span className="font-mono text-xs text-muted-foreground">SYNC PROGRESS</span>
                            <span className={cn(
                                "font-mono text-xs",
                                progress === 100 ? "text-chart-4" : "text-primary"
                            )}>{progress}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-input">
                            <div
                                className={cn(
                                    "h-full rounded-full transition-all duration-1000",
                                    progress === 100
                                        ? "bg-linear-to-r from-chart-4 via-chart-4 to-chart-4 shadow-[0_0_10px_rgba(0,255,128,0.5)]"
                                        : "bg-linear-to-r from-primary via-secondary to-primary shadow-[0_0_10px_rgba(0,217,255,0.5)]"
                                )}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Action Button */}
                    {isLocked ? (
                        <Button
                            variant="outline"
                            className="w-full font-sans font-bold tracking-wider bg-muted/50 border-border text-muted-foreground cursor-not-allowed"
                            disabled
                        >
                            <Lock className="w-4 h-4 mr-2" />
                            ENCRYPTED
                        </Button>
                    ) : isCompleted ? (
                        <Button
                            variant="outline"
                            className="w-full font-sans font-bold tracking-wider border-chart-4 text-chart-4 shadow-[0_0_4px_rgba(0,255,128,0.2)] transition-all hover:bg-chart-4/10 hover:shadow-[0_0_10px_rgba(0,255,128,0.4)] bg-transparent"
                        >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            REVIEW LOGS
                        </Button>
                    ) : isActive ? (
                        <Button className="w-full font-sans font-bold tracking-wider shadow-[0_0_20px_rgba(0,217,255,0.3)] transition-all hover:shadow-[0_0_30px_rgba(0,217,255,0.5)]">
                            INITIALIZE
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            className="w-full font-sans font-bold tracking-wider border-primary text-primary shadow-[0_0_20px_rgba(0,217,255,0.2)] transition-all hover:bg-primary/10 hover:shadow-[0_0_30px_rgba(0,217,255,0.4)] bg-transparent"
                        >
                            ACCESS
                        </Button>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    )
}
