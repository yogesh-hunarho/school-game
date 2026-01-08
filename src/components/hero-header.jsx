import { useEffect, useRef, useMemo, useState } from "react"
import { useLMSStore, moduleOrder, moduleContent } from "@/store/lms-store";
import { useSound } from "@/hook/useSound";
import { motion, useScroll } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { PopoverTrigger, Popover, PopoverContent, PopoverAnchor } from "./ui/popover";
import { X, Lock, Check, Brain, Box, Bot, Gamepad2, Droplets, PenTool, Sprout, Zap, ClipboardCheck, User, ChevronRight, Menu, Volume2, VolumeX, LogOut } from "lucide-react"
import { cn } from '@/lib/utils'
import { useNavigate } from "react-router-dom"
import { useIsMobile } from "@/hook/use-mobile"
import AnimatedBackground from "./animated-background";
import { calculateLevel, getXPToNextLevel } from "./Header";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthStore } from "@/store/auth.store";
import HeaderCoin from "./HeaderCoin";
import Counter from "./counter";
import MissionMap from "./mission-map";

export const HeroHeader = () => {
    const [menuState, setMenuState] = useState(false)
    const [scrolled, setScrolled] = useState(true)
    const { scrollYProgress } = useScroll()
    const location = useLocation()

    const { player, soundEnabled, toggleSound } = useLMSStore();
    const { logout } = useAuthStore();
    const setCoinTarget = useLMSStore((s) => s.setCoinTarget);
    const { playClick } = useSound();
    const level = calculateLevel(player.totalXP);
    const xpProgress = getXPToNextLevel(player.totalXP);
    const { playSound, playClose } = useSound()
    const navigate = useNavigate()
    const scrollContainerRef = useRef(null)
    const isMobile = useIsMobile()
    const coinRef = useRef(null);
    const mobileCoinRef = useRef(null);

    useEffect(() => {
        if (isMobile) {
            if (!mobileCoinRef.current || !setCoinTarget) return;

            const rect = mobileCoinRef.current.getBoundingClientRect();
            setCoinTarget({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
            });
        } else {
            if (!coinRef.current || !setCoinTarget) return;

            const rect = coinRef.current.getBoundingClientRect();
            setCoinTarget({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
            });
        }
    }, [setCoinTarget, isMobile]);


    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-9999 w-full pt-1 px-4">
                <div className={cn('mx-auto max-w-7xl border-0 md:border-b px-4 transition-all duration-300 lg:px-12', scrolled && 'bg-black/20 backdrop-blur md:border')}>
                    <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.1)_2px,rgba(0,255,255,0.1)_4px)]" />

                    <div className={cn("absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 transition-colors z-30 border-emerald-400 animate-pulse")} />
                    <div className={cn("absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 transition-colors z-30 border-yellow-400 animate-pulse")} />
                    <div className={cn("absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 transition-colors z-30 border-emerald-400 animate-pulse")} />
                    <div className={cn("absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 transition-colors z-30 border-yellow-400 animate-pulse")} />

                    <motion.div
                        key={1}
                        className={cn('relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-2', scrolled && 'lg:py-3')}>
                        <div className="flex w-full items-center justify-between gap-12">
                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 text-white duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 text-white opacity-0 duration-200" />
                            </button>
                            <div className="md:hidden flex items-center gap-2">
                                <MissionMap />
                                <div className="flex flex-col items-end gap-0.5 group">
                                    <div ref={mobileCoinRef} className="flex items-center gap-1.5">
                                        <HeaderCoin size={24} className="group-hover:animate-pulse" />
                                        <Counter
                                            value={player.totalXP.toLocaleString()}
                                            fontSize={16}
                                            gap={0}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="hidden lg:block w-full">
                                <div className="flex items-center w-full">
                                    <Link
                                        to="/"
                                        onClick={playClick}
                                        className="flex items-center gap-3 group shrink-0"
                                    >
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-cyan-500/30 blur-lg rounded-full scale-150 opacity-0 transition-opacity" />
                                            <img
                                                src="https://s3.us-east-1.amazonaws.com/hunarho.com/hunarhowhite.png"
                                                alt="Hunarho"
                                                className="relative h-10 w-auto"
                                            />
                                        </div>
                                    </Link>

                                    <div className="flex-1" />

                                    <div className="flex items-center gap-6">
                                        <MissionMap />
                                        <div className="w-px h-6 bg-white/20" />
                                        {!isMobile &&
                                            <Link
                                                to="/profile"
                                                onClick={playClick}
                                                className="flex items-center gap-6 group"
                                            >
                                                <div className="hidden md:flex flex-col items-end gap-0.5 group">
                                                    <div ref={coinRef} className="flex items-center gap-1.5">
                                                        <HeaderCoin size={24} className="group-hover:animate-pulse" />
                                                        <Counter
                                                            value={player.totalXP.toLocaleString()}
                                                            fontSize={16}
                                                            gap={0}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="w-px h-6 bg-white/20" />
                                            </Link>}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <div className="group relative cursor-pointer">
                                                    <div className="absolute -inset-1 rounded-full bg-cyan-500/20 blur-sm opacity-0 transition group-hover:opacity-100" />

                                                    <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-cyan-500/50 bg-slate-900 transition group-hover:border-cyan-400">
                                                        <User className="h-5 w-5 text-cyan-400" />
                                                    </div>

                                                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-950 bg-green-500" />
                                                </div>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent
                                                align="end"
                                                className="w-56 rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl p-2 shadow-2xl"
                                            >
                                                <DropdownMenuItem asChild className="rounded-xl">
                                                    <Link to="/profile" className="flex items-center gap-3">
                                                        <User className="h-4 w-4 text-cyan-400" />
                                                        <span>Profile</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuCheckboxItem
                                                    checked={soundEnabled}
                                                    onCheckedChange={toggleSound}
                                                    className="rounded-xl flex items-center gap-3"
                                                >
                                                    {soundEnabled ? (
                                                        <Volume2 className="h-4 w-4 text-emerald-400" />
                                                    ) : (
                                                        <VolumeX className="h-4 w-4 text-red-400" />
                                                    )}

                                                    <span className="flex-1">Sound</span>

                                                    <span className="text-xs font-mono text-white/60">
                                                        {soundEnabled ? "ON" : "OFF"}
                                                    </span>
                                                </DropdownMenuCheckboxItem>

                                                <DropdownMenuSeparator className="my-2 bg-white/10" />
                                                <DropdownMenuItem
                                                    onClick={logout}
                                                    className="rounded-xl text-red-400 focus:text-red-300 focus:bg-red-500/10"
                                                >
                                                    <LogOut className="mr-3 h-4 w-4" />
                                                    Logout
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="bg-black/80 backdrop-blur-xl mb-6 hidden w-full border border-white/10 p-4 shadow-2xl in-data-[state=active]:block lg:hidden">

                            <nav className="space-y-1 text-sm font-medium">
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/90 transition hover:bg-white/5 hover:text-white"
                                >
                                    <User size={18} />
                                    <span>Profile</span>
                                </Link>
                                <button
                                    onClick={toggleSound}
                                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-white/90 transition hover:bg-white/5"
                                >
                                    <div className="flex items-center gap-3">
                                        {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                                        <span>Sound</span>
                                    </div>

                                    <span
                                        className={`text-xs font-mono ${soundEnabled ? "text-emerald-400" : "text-red-400"
                                            }`}
                                    >
                                        {soundEnabled ? "ON" : "OFF"}
                                    </span>
                                </button>

                                <div className="my-2 h-px bg-white/10" />
                                <button
                                    onClick={logout}
                                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                                >
                                    <LogOut size={18} />
                                    <span>Logout</span>
                                </button>

                            </nav>
                        </div>
                    </motion.div>
                </div>
            </nav>
        </header >
    )
}
