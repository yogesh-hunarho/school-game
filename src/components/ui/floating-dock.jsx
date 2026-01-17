import { cn } from "@/lib/utils";
import { useTheme } from "@/provider/theme-provider";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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
          "mx-auto h-20 gap-4 px-4 md:py-2.5 py-1.5 flex items-end justify-center relative",
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
  const location = useLocation();

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

  // Smoother spring physics for buttery animations
  const springConfig = { mass: 0.2, stiffness: 150, damping: 12 };
  const iconSpringConfig = { mass: 0.15, stiffness: 180, damping: 14 };

  let widthSpring = useSpring(widthTransform, springConfig);
  let heightSpring = useSpring(heightTransform, springConfig);
  let widthIconSpring = useSpring(widthTransformIcon, iconSpringConfig);
  let heightIconSpring = useSpring(heightTransformIcon, iconSpringConfig);
  let ySpring = useSpring(yTransform, { mass: 0.2, stiffness: 120, damping: 10 });

  // Mobile static values
  let width = isMobile ? (hovered ? 55 : 50) : widthSpring;
  let height = isMobile ? (hovered ? 55 : 50) : heightSpring;
  let widthIcon = isMobile ? (hovered ? 30 : 26) : widthIconSpring;
  let heightIcon = isMobile ? (hovered ? 30 : 26) : heightIconSpring;
  let y = isMobile ? 0 : ySpring;

  const reflectionOpacity = useTransform(
    distance,
    [-150, 0, 150],
    [0, 0.4, 0]
  );

  const isActive = location.pathname === href;

  return (
    <a href={href} className={cn("relative flex items-end justify-center group preserve-3d")}>
      <motion.div
        ref={ref}
        style={{ width, height, y }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{
          boxShadow: "0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.2)",
        }}
        transition={{
          boxShadow: { type: "spring", stiffness: 200, damping: 20 }
        }}
        className={cn(
          "relative flex aspect-square items-center justify-center rounded-2xl border shadow-lg cursor-pointer preserve-3d",
          isActive
            ? "bg-cyan-500/30 backdrop-blur-xl shadow-cyan-500/50 border-cyan-400/50"
            : "bg-linear-to-br from-slate-800 to-slate-900 border-white/10 hover:border-cyan-400/50"
        )}>

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl blur-xl"
          animate={{
            backgroundColor: isActive
              ? "rgba(6, 182, 212, 0.4)"
              : hovered
                ? "rgba(6, 182, 212, 0.25)"
                : "rgba(6, 182, 212, 0)"
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />

        {/* Reflection Gradient */}
        {!isActive && <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-black/50 to-transparent opacity-50" />}

        {/* Inner Highlight */}
        <div className="absolute inset-px rounded-[15px] bg-linear-to-br from-white/10 to-transparent opacity-50" />

        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className={cn(
            "relative z-10",
            isActive ? "text-white" : "text-slate-400"
          )}
          animate={{
            z: hovered ? 20 : 0,
            scale: hovered ? 1.1 : 1,
            rotate: hovered ? [0, -5, 5, 0] : 0,
            color: hovered && !isActive ? "rgb(34, 211, 238)" : undefined
          }}
          transition={{
            scale: { type: "spring", stiffness: 300, damping: 15 },
            rotate: { duration: 0.4, ease: "easeInOut" },
            color: { duration: 0.2 }
          }}>
          {icon}
        </motion.div>

        {/* Reflection below the icon (mirror effect) */}
        {!isMobile && (
          <motion.div
            style={{ width, height, opacity: reflectionOpacity }}
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
