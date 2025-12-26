import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import Header from "@/components/Header";
import { FloatingDock } from "@/components/ui/floating-dock";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import GlassSurface from "@/components/GlassSurface";
import ConfettiEffect from "@/components/ConfettiEffect";
import { Home, User, Trophy, BookOpen } from "lucide-react";
import ClickSpark from "@/components/ClickSpark";

const navLinks = [
    {
        title: "Home",
        icon: <Home className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
        href: "/",
    },
    {
        title: "Courses",
        icon: <BookOpen className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
        href: "/",
    },
    {
        title: "Achievements",
        icon: <Trophy className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
        href: "/profile",
    },
    {
        title: "Profile",
        icon: <User className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
        href: "/profile",
    },
];

export default function ProtectedLayout() {
    const token = useAuthStore((state) => state.token);
    const notification = useAuthStore((state) => state.notification);
    const [isDockHovered, setIsDockHovered] = useState(false);

    if (!token) {
        return <Navigate to="/login" />;
    }

    // Dynamic width based on hover state - expands when dock icons scale up
    const dockWidth = isDockHovered ? 380 : 320;

    return (
        <ClickSpark
            sparkColor='#fff'
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
        >
            <div className="relative w-full min-h-screen flex flex-col bg-slate-950 overflow-hidden">
                <ShootingStars className="pointer-events-none z-0" />
                <StarsBackground className="pointer-events-none z-0" />

                <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02] bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-size-[50px_50px]" />

                <Header />

                <main className="relative flex-1 pt-16 pb-24 z-10 overflow-auto">
                    <Outlet />
                </main>

                {notification && (
                    <div className="fixed top-20 right-4 z-50 px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg text-cyan-400 backdrop-blur-sm">
                        {notification}
                    </div>
                )}

                <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
                    <GlassSurface
                        width={dockWidth}
                        borderRadius={20}
                        height={64}
                        backgroundOpacity={0.48}
                        displace={3.0}
                        borderWidth={1}
                        style={{
                            transition: 'width 200ms cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                    >
                        <FloatingDock
                            items={navLinks}
                            onHoverChange={setIsDockHovered}
                        />
                    </GlassSurface>
                </div>

                <ConfettiEffect />
            </div>
        </ClickSpark>
    );
}
