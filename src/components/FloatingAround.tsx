import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

type AmbientFloatProps = {
  children: React.ReactNode;
  baseX: number;
  baseY: number;
  range?: number;
  duration?: number;
};

export const AmbientFloat = ({
  children,
  baseX,
  baseY,
  range = 70,      // 🔹 small area
  duration = 3.5,  // 🔹 slow & subtle
}: AmbientFloatProps) => {
  const controls = useAnimation();

  useEffect(() => {
    let mounted = true;

    const animate = async () => {
      while (mounted) {
        await controls.start({
          x: baseX + (Math.random() * range * 2 - range),
          y: baseY + (Math.random() * range * 2 - range),
          transition: {
            duration,
            ease: "easeInOut",
          },
        });
      }
    };

    animate();
    return () => {
      mounted = false;
    };
  }, [controls, baseX, baseY, range, duration]);

  return (
    <motion.div
      className="absolute"
      initial={{ x: baseX, y: baseY }}
      animate={controls}
      whileHover={{ scale: 1.15 }}
    >
      {children}
    </motion.div>
  );
};
