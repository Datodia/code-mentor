import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

type PropType = {
    rating: number,
    maxStars?: number
    className?: string
}

export default function Rating({ rating, maxStars = 5, className }:PropType) {
  return (
    <div className={cn("flex", className)}>
      {[...Array(maxStars)].map((_, i) => {
        const fillPercentage = Math.min(Math.max(rating - i, 0), 1) * 100;

        return (
          <div key={i} className="relative w-6 h-6">
            <Star size={24} stroke="gold" fill="none" />
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <Star size={24} stroke="gold" fill="gold" />
            </div>
          </div>
        );
      })}
    </div>
  );
}