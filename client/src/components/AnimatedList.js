import { motion } from "motion/react";

export function AnimatedList({ children, className = "" }) {
  const items = Array.isArray(children) ? children : [children];

  return (
    <div className={className}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{
            duration: 0.4,
            delay: index * 0.1,
            ease: "easeOut",
          }}
        >
          {item}
        </motion.div>
      ))}
    </div>
  );
}
