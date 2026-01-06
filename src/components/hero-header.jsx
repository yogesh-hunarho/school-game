import { useEffect, useRef, useMemo, useState } from "react"
import { useLMSStore, moduleOrder, moduleContent } from "@/store/lms-store";
import { useSound } from "@/hook/useSound";
import { motion, useScroll } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { PopoverTrigger, Popover, PopoverContent, PopoverAnchor } from "./ui/popover";
import { X, Lock, Check, Brain, Box, Bot, Gamepad2, Droplets, PenTool, Sprout, Zap, ClipboardCheck, User, ChevronRight, Menu } from "lucide-react"
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
                className="fixed z-9999 w-full pt-2 px-4">
                <div className={cn('mx-auto max-w-7xl border-0 md:border-b px-4 transition-all duration-300 lg:px-12', scrolled && 'bg-black/20 backdrop-blur md:border md:rounded-3xl')}>
                    <motion.div
                        key={1}
                        className={cn('relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-2', scrolled && 'lg:py-4')}>
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
                                            <div className="absolute inset-0 bg-cyan-500/30 blur-lg rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
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
                                                <div className="relative cursor-pointer">
                                                    <div className="absolute -inset-1 rounded-full bg-cyan-500/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    <div className="relative w-10 h-10 rounded-full bg-slate-900 border-2 border-cyan-500/50 flex items-center justify-center overflow-hidden group-hover:border-cyan-400 transition-colors">
                                                        <User className="w-5 h-5 text-cyan-400" />
                                                    </div>
                                                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-950" />
                                                </div>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56">
                                                <DropdownMenuItem asChild>
                                                    <Link to="/profile">Profile</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuCheckboxItem
                                                    checked={soundEnabled}
                                                    onCheckedChange={toggleSound}
                                                >
                                                    {soundEnabled ? 'Audio Enabled' : ' Audio Disabled'}
                                                </DropdownMenuCheckboxItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="bg-black/80 backdrop-blur-xl in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-white/10 p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-0">
                            <div className="lg:hidden">
                                {/* for mobile menu */}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </nav>
        </header >
    )
}
