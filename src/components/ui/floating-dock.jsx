import { cn } from "@/lib/utils";
import { useTheme } from "@/provider/theme-provider";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  onHoverChange,
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} onHoverChange={onHoverChange} />
    </>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
  onHoverChange
}) => {
  let mouseX = useMotionValue(Infinity);
  const { theme, setTheme } = useTheme();

  const handleMouseEnter = () => {
    onHoverChange?.(true);
  };

  const handleMouseLeave = () => {
    mouseX.set(Infinity);
    onHoverChange?.(false);
  };

  return (
    <div className="perspective-[1000px] z-50">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={{ rotateX: 20, y: 50, opacity: 0 }}
        animate={{ rotateX: 0, y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className={cn(
          "mx-auto h-20 gap-4 px-4 pb-2.5 flex items-end justify-center relative",
          className
        )}>

        {/* 3D Glass Dock Base */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-slate-900/40 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl shadow-cyan-500/10 transform-style-3d rotate-x-12 translate-z-[-20px]"
          style={{
            boxShadow: "0 20px 40px -10px rgba(0, 255, 255, 0.1), inset 0 1px 0 rgba(255,255,255,0.2)"
          }}
        />

        {items.map((item) => (
          <IconContainer mouseX={mouseX} key={item.title} {...item} />
        ))}
      </motion.div>
    </div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href
}) {
  let ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Enhanced 3D transformations
  let widthTransform = useTransform(distance, [-150, 0, 150], [45, 85, 45]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [45, 85, 45]);
  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [24, 44, 24]);
  let heightTransformIcon = useTransform(distance, [-150, 0, 150], [24, 44, 24]);
  // 3D Lift effect
  let yTransform = useTransform(distance, [-150, 0, 150], [0, -20, 0]);

  let widthSpring = useSpring(widthTransform, { mass: 0.1, stiffness: 200, damping: 15 });
  let heightSpring = useSpring(heightTransform, { mass: 0.1, stiffness: 200, damping: 15 });
  let widthIconSpring = useSpring(widthTransformIcon, { mass: 0.1, stiffness: 200, damping: 15 });
  let heightIconSpring = useSpring(heightTransformIcon, { mass: 0.1, stiffness: 200, damping: 15 });
  let ySpring = useSpring(yTransform, { mass: 0.1, stiffness: 200, damping: 15 });

  // Mobile static values
  let width = isMobile ? (hovered ? 55 : 50) : widthSpring;
  let height = isMobile ? (hovered ? 55 : 50) : heightSpring;
  let widthIcon = isMobile ? (hovered ? 30 : 26) : widthIconSpring;
  let heightIcon = isMobile ? (hovered ? 30 : 26) : heightIconSpring;
  let y = isMobile ? 0 : ySpring;

  return (
    <a href={href} className={cn("relative flex items-end justify-center group preserve-3d")}>
      <motion.div
        ref={ref}
        style={{ width, height, y }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 shadow-lg cursor-pointer preserve-3d hover:shadow-cyan-400/50 hover:border-cyan-400/50 transition-shadow duration-300">

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-cyan-500/0 group-hover:bg-cyan-500/20 blur-xl transition-all duration-300" />

        {/* Reflection Gradient */}
        <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-black/50 to-transparent opacity-50" />

        {/* Inner Highlight */}
        <div className="absolute inset-px rounded-[15px] bg-linear-to-br from-white/10 to-transparent opacity-50" />

        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="relative z-10 text-white group-hover:text-cyan-400 group-hover:scale-110 transition-colors duration-300"
          animate={{ z: hovered ? 20 : 0 }}>
          {icon}
        </motion.div>

        {/* Reflection below the icon (mirror effect) */}
        {!isMobile && (
          <motion.div
            style={{ width, height, opacity: useTransform(distance, [-150, 0, 150], [0, 0.4, 0]) }}
            className="absolute -bottom-[90%] left-0 w-full h-full scale-y-[-1] bg-linear-to-t from-transparent via-slate-500/20 to-transparent blur-[2px] pointer-events-none"
          >
            <motion.div
              style={{ width: widthIcon, height: heightIcon }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400/50">
              {icon}
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Holographic Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8, rotateX: 45 }}
            animate={{ opacity: 1, y: - (isMobile ? 65 : 15), scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
              "absolute left-1/2 -translate-x-1/2 w-max px-3 py-1.5",
              "bg-slate-900/90 backdrop-blur-md border border-cyan-500/30",
              "text-cyan-400 text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.3)]",
              "pointer-events-none z-50",
              isMobile ? "bottom-full mb-2" : "bottom-[120%]"
            )}>
            <div className="relative z-10">{title}</div>

            {/* Tech accents */}
            <div className="absolute -left-0.5 -top-0.5 w-1.5 h-1.5 border-t border-l border-cyan-400" />
            <div className="absolute -right-0.5 -bottom-0.5 w-1.5 h-1.5 border-b border-r border-cyan-400" />
            <div className="absolute inset-0 bg-cyan-400/5 blur-sm" />

            {/* Connector arrow */}
            <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-slate-900 border-r border-b border-cyan-500/30 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </a>
  );
}
