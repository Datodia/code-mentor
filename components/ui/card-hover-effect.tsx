import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

export const CardHoverEffect = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredPosition, setHoveredPosition] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  return (
    <div className={cn("relative", className)}>
      {/* Persistent background hover effect */}
      {hoveredPosition && (
        <motion.span
          className="absolute bg-neutral-200 dark:bg-slate-800/[0.8] rounded-3xl"
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            top: hoveredPosition.top,
            left: hoveredPosition.left,
            width: hoveredPosition.width,
            height: hoveredPosition.height,
            position: "absolute",
          }}
        />
      )}

      {Array.isArray(children) &&
        children.map((child, idx) => (
          <div
            key={idx}
            className="relative group block p-2 h-full w-full"
            onMouseEnter={(e) => {
              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
              setHoveredIndex(idx);
              setHoveredPosition({
                top: e.currentTarget.offsetTop,
                left: e.currentTarget.offsetLeft,
                width: rect.width,
                height: rect.height,
              });
            }}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="relative z-10">{child}</div>
          </div>
        ))}
    </div>
  );
};
