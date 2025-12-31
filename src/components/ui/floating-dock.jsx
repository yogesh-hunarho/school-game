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
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "mx-auto h-16 md:h-16 items-center md:items-end gap-4 px-4 md:pb-3 pt-1 flex md:gap-5",
        className
      )}>
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
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

  // Desktop transformations
  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 70, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 70, 40]);
  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 35, 20]);
  let heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 35, 20]);

  let widthSpring = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  let heightSpring = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  let widthIconSpring = useSpring(widthTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });
  let heightIconSpring = useSpring(heightTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });

  // Mobile static values - reduced size
  let width = isMobile ? (hovered ? 50 : 44) : widthSpring;
  let height = isMobile ? (hovered ? 50 : 44) : heightSpring;
  let widthIcon = isMobile ? (hovered ? 26 : 22) : widthIconSpring;
  let heightIcon = isMobile ? (hovered ? 26 : 22) : heightIconSpring;


  return (
    <a href={href} className={cn("relative flex items-center justify-center group", isMobile && "flex-col")}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center bg-slate-900/80 border border-cyan-400/30 hover:border-cyan-400 transition-colors">

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-400/50 group-hover:border-cyan-400 transition-colors" />
        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-400/50 group-hover:border-cyan-400 transition-colors" />

        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center text-cyan-400 group-hover:text-yellow-400 transition-colors">
          {icon}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className={cn(
              "absolute left-1/2 w-fit px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest whitespace-pre pointer-events-none z-50 bg-slate-900/90 border border-cyan-400/50 text-cyan-400",
              isMobile ? "top-[54px]" : "-top-8"
            )}>
            {/* Mini corner accents on tooltip */}
            <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-cyan-400" />
            {title}
          </motion.div>
        )}
      </AnimatePresence>
    </a>
  );
}
