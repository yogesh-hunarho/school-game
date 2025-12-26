/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/utils";
import { useTheme } from "@/provider/theme-provider";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Moon, Sun } from "lucide-react";
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
        "mx-auto h-20 md:h-16 items-center md:items-end gap-4 rounded-2xl px-4 pb-6 md:pb-3 pt-1 flex md:gap-6", // Responsive gap
        className
      )}>
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
      <motion.div
        style={{ width: 40, height: 40 }}
        className="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <motion.div
          className="flex items-center justify-center"
        >
          {theme === "dark" ? <Sun className="h-full w-full text-neutral-500 dark:text-neutral-300" /> : <Moon className="h-full w-full text-neutral-500 dark:text-neutral-300" />}
        </motion.div>
      </motion.div>

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
  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  let widthSpring = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  let heightSpring = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  let widthIconSpring = useSpring(widthTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });
  let heightIconSpring = useSpring(heightTransformIcon, { mass: 0.1, stiffness: 150, damping: 12 });

  // Mobile static values - reduced size
  let width = isMobile ? 50 : widthSpring;
  let height = isMobile ? 50 : heightSpring;
  let widthIcon = isMobile ? 24 : widthIconSpring;
  let heightIcon = isMobile ? 24 : heightIconSpring;

  const [hovered, setHovered] = useState(false);

  return (
    <a href={href} className={cn("relative flex items-center justify-center", isMobile && "flex-col")}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800">
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center">
          {icon}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {(hovered || isMobile) && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className={cn(
              "absolute left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-3 py-1 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white pointer-events-none z-50",
              isMobile ? "top-[52px] text-[10px] px-1.5 py-0" : "-top-8"
            )}>
            {title}
          </motion.div>
        )}
      </AnimatePresence>
    </a>
  );
}
