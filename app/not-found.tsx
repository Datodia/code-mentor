import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[70vh] px-4">
      <div className="text-center">
        <Frown className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          გვერდი რომელსაც თქვენ ეძებთ არ არსებობს ან გადასულია სხვა URL-ზე
        </p>
        <Button asChild>
          <Link href="/">დაბრუნდი მთავარზე</Link>
        </Button>
      </div>
    </div>
  );
}