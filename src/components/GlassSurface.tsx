import React from 'react';
import { cn } from "@/lib/utils";

export interface GlassSurfaceProps {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  width = 200,
  height = 80,
  className = '',
  style = {}
}) => {
  return (
    <div
      className={cn(
        "relative bg-slate-950/95 transition-all duration-200",
        className
      )}
      style={{
        ...style,
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    >
      {/* Scanline overlay */}
      <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.02] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.1)_2px,rgba(0,255,255,0.1)_4px)]" />

      {/* Main border */}
      <div className="absolute inset-0 border border-cyan-400/30" />

      {/* Corner brackets - Top-left */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
      <div className="absolute top-0 left-4 w-3 h-[2px] bg-cyan-400" />
      <div className="absolute top-4 left-0 w-[2px] h-3 bg-cyan-400" />

      {/* Corner brackets - Top-right */}
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
      <div className="absolute top-0 right-4 w-3 h-[2px] bg-cyan-400" />
      <div className="absolute top-4 right-0 w-[2px] h-3 bg-cyan-400" />

      {/* Corner brackets - Bottom-left */}
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
      <div className="absolute bottom-0 left-4 w-3 h-[2px] bg-cyan-400" />
      <div className="absolute bottom-4 left-0 w-[2px] h-3 bg-cyan-400" />

      {/* Corner brackets - Bottom-right */}
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
      <div className="absolute bottom-0 right-4 w-3 h-[2px] bg-cyan-400" />
      <div className="absolute bottom-4 right-0 w-[2px] h-3 bg-cyan-400" />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-2">
        {children}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-cyan-400/20" />
    </div>
  );
};

export default GlassSurface;
