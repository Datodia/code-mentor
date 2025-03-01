import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Button>Hela</Button>
      <h1 className={cn('text-2xl')}>hello world</h1>
    </div>
  );
}
