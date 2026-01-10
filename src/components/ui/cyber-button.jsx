import React from 'react';
import { Slot } from "radix-ui"

const CyberpunkButton = ({
    children,
    variant = 'primary' || 'secondary' || 'danger' || 'outline', // primary, secondary, danger
    className,
    size = "primary",
    asChild = false,
    ...props
}) => {
    const Comp = asChild ? Slot.Root : "button"

    const variants = {
        primary: "bg-cyan-600 text-black hover:bg-cyan-400 border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]",
        secondary: "bg-emerald-900/50 text-emerald-200 border-emerald-500 hover:bg-emerald-800/80 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]",
        danger: "bg-red-900/50 text-red-200 border-red-500 hover:bg-red-800/80 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]",
        outline: "bg-emerald-300/0.5 text-emerald-200 border-emerald-500 hover:bg-emerald-900/20 hover:text-emerald-200",
        puzzle: "bg-yellow-300 text-black px-3! py-1.5! text-xs"
    };

    return (
        <Comp
            data-variant={variant}
            data-size={size}
            className={`
                relative group font-mono font-bold uppercase tracking-wider px-8 py-3 
                border transition-all duration-200 ease-out
                ${variants[variant]}
                disabled:opacity-50 disabled:cursor-not-allowed
                clip-path-slant
                ${className}
            `}
            style={{
                clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
            }}
            {...props}
        >
            {/* Background Glitch Element on Hover */}
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out skew-x-12 pointer-events-none" />

            {/* Tech Decoration Corners */}
            {/* <div className="absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 border-white/50" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 border-white/50" /> */}

            <span className="relative text-center z-10 flex items-center justify-center gap-2">{children}</span>
        </Comp>
    );
};

export default CyberpunkButton;


