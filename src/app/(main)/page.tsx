import { Heart } from "iconsax-react";
import MemoryLaneBlock from "./_components/memory-lane-block";
import RomanticCardComponent from "./_components/romantic-card";

export default function Home() {
  return (
    <main className="space-y-20">
      {/* memory lane block - static layout */}
      <MemoryLaneBlock />

      <section className="space-y-8">
        {/* romantic date card */}
        <div>
          <h2 className="font-semibold text-2xl flex gap-3">
            <Heart size="30" color="#309898" variant="Bold" />
            <span className="text-coral-pink">Romantic</span>
            <span className="text-dark-cyan">Memories</span>
          </h2>
          <div className="w-1/5 h-0.5 bg-gradient-to-r from-transparent  via-dark-cyan/80 to-transparent rounded-full"></div>
        </div>

        {/* romantic card */}
        <div className="grid grid-cols-4 gap-6">
          <RomanticCardComponent />
        </div>
      </section>
    </main>
  );
}
