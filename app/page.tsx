import HomePage from "@/components/pages/home";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
      <div className="max-w-[1240px] mx-auto">
        <HomePage />
      </div>
  );
}
