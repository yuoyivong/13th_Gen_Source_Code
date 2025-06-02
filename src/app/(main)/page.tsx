import { Heart } from "iconsax-react";
import MemoryLaneBlock from "./_components/static-ui/memory-lane-block";
import RomanticCardComponent from "./_components/card/romantic-card";
import MemoryPopup from "./_components/popup/memory-popup";
import { auth } from "@/auth";
import { getAllRomanticDateList } from "@/services/romantic-date-service";
import { APIResponse } from "@/types/response/api-response";
import { RomanticDate } from "@/types/model/romantic-date";

export default async function Home() {
  // get session
  const session = await auth();

  // get romantic date data
  const romanticList = (await getAllRomanticDateList()) as APIResponse<
    RomanticDate[]
  >;
  console.log("Romantic list : ", romanticList);

  return (
    <main className="space-y-20 container mx-auto">
      {/* memory lane block - static layout */}
      <div className="hidden md:block">
        <MemoryLaneBlock />
      </div>

      <section className="space-y-8 px-3 md:px-0">
        <div className="flex justify-between items-center">
          {/* romantic memory title */}
          <div className="w-full">
            <h1 className="font-semibold text-2xl flex gap-3">
              <Heart size="30" color="#309898" variant="Bold" />
              <span className="text-coral-pink">Romantic</span>
              <span className="text-dark-cyan">Memories</span>
            </h1>
            <div className="w-1/5 h-0.5 bg-gradient-to-r from-transparent  via-dark-cyan/80 to-transparent rounded-full"></div>
          </div>

          {/* new memory popup form */}
          {session && <MemoryPopup type="create" />}
        </div>

        {/* romantic date card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {romanticList?.payload?.map((item) => (
            <RomanticCardComponent
              key={item?.id}
              item={item}
              session={session || null}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
