import { Clock, BookOpen, Brain, ChevronRight, Terminal, Info } from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface CyberpunkCourseCardProps {
    title: string
    description: string
    hours: string
    lessons: number
    quizzes: number
    imageUrl: string
    tooltipTxt?: string
}

export function CyberpunkCourseCard({
    title = "Database Concepts and SQL Programming",
    description = "This self-paced course offers a comprehensive introduction to SQL and relational databases, covering fundamental concepts from data definition and manipulation to advanced querying techniques.",
    hours = "2 Weeks",
    lessons = 74,
    quizzes = 10,
    tooltipTxt = "",
    imageUrl = "https://picsum.photos/seed/picsum/200/300",
}: CyberpunkCourseCardProps) {
    return (
        <div className="group relative w-full overflow-hidden bg-background border border-primary/30 font-mono">
            <div className="pointer-events-none absolute inset-0 z-50 bg-scanline opacity-50" />
            <div className="absolute inset-0 z-0 bg-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative z-10 flex flex-col md:flex-row min-h-[320px]">
                <div className="relative flex-1 p-8 md:p-10 flex flex-col justify-between">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />

                    <div className="space-y-6">
                        {/* Title */}
                        <h2 className="text-2xl font-sans md:text-3xl font-black uppercase tracking-tighter text-foreground group-hover:text-primary transition-colors duration-300">
                            {title}
                        </h2>

                        {/* Description */}
                        <p className="text-muted-foreground text-xs font-sans leading-relaxed border-l-2 border-primary/20 pl-4 py-1 italic">
                            {description}
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                            <div className="flex items-center gap-3 group/stat">
                                <div className="p-2 bg-primary/10 border border-primary/20 group-hover/stat:border-primary transition-colors">
                                    <Clock className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-[9px] text-muted-foreground tracking-widest font-sans">Duration</p>
                                    <Tooltip>
                                        <TooltipTrigger className="flex gap-2 items-center">
                                            <p className="text-xs font-sans font-bold text-foreground">{hours} </p>
                                            {tooltipTxt && <Info size={14} />}
                                        </TooltipTrigger>
                                        <TooltipContent align="start">
                                            <p>{tooltipTxt || hours}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 group/stat">
                                <div className="p-2 bg-primary/10 border border-primary/20 group-hover/stat:border-primary transition-colors">
                                    <BookOpen className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-[9px] text-muted-foreground tracking-widest font-sans">Lessons</p>
                                    <p className="text-xs font-sans font-bold text-foreground">{lessons} Units</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 group/stat">
                                <div className="p-2 bg-primary/10 border border-primary/20 group-hover/stat:border-primary transition-colors">
                                    <Brain className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-[9px] text-muted-foreground tracking-widest font-sans">Quizzes</p>
                                    <p className="text-xs font-sans font-bold text-foreground">{quizzes} Tests</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button className="mt-8 self-start flex items-center gap-4 bg-primary px-6 py-3 text-primary-foreground font-black text-xs uppercase tracking-[0.2em] hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 active:scale-95 group/btn">
                        <span>Initialize Sync</span>
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Right Image/Graphic Side */}
                <div className="relative w-full md:w-[40%] min-h-[250px] md:min-h-full overflow-hidden border-l border-primary/20">
                    {/* Cyberpunk Slant Divider */}
                    <div className="absolute top-0 left-0 w-full h-full bg-primary/10 -skew-x-12 translate-x-[80%] z-0" />

                    <img
                        src={imageUrl || "/placeholder.svg"}
                        alt="Database Concepts"
                        className="absolute inset-0 w-full h-full  mix-blend-lighten opacity-80 group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* HUD Overlay elements */}
                    <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
                        <div className="h-1 w-12 bg-secondary" />
                        <div className="h-1 w-8 bg-primary" />
                    </div>

                    <div className="absolute bottom-4 right-4 text-right">
                        <Terminal className="w-6 h-6 text-primary mb-2 ml-auto" />
                        <p className="text-[8px] text-primary font-bold uppercase tracking-widest">Data_Stream: Connected</p>
                        <p className="text-[8px] text-muted-foreground">LATENCY: 14ms</p>
                    </div>

                    {/* Glitch Overlay on Image */}
                    <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-60" />
                </div>
            </div>
        </div>
    )
}
