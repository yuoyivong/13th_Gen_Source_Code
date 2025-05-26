import { Calendar, Heart } from "iconsax-react";
import Image from "next/image";
import React from "react";

export default async function MemoryDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="container mx-auto block lg:flex gap-16 px-3 md:px-0">
      {/* left side */}
      <div className="w-full lg:w-1/2 space-y-6">
        {/* title */}
        <h2 className="text-2xl font-medium text-dark-cyan flex gap-3 items-center">
          <Heart size="24" color="#309898" variant="Bold" />
          <span>Switzerland</span>
        </h2>

        {/* description */}
        <p className="text-justify">
          Zermatt, Switzerland Nestled at the foot of the iconic Matterhorn,
          Zermatt is a stunning mountain resort town known for its world-class
          skiing, scenic hiking trails, and car-free charm. The town blends
          rustic Alpine architecture with luxurious chalets and hotels, offering
          breathtaking views year-round. In winter, visitors flock to Zermatt
          for its vast ski terrain, including access to the Matterhorn Glacier
          Paradise, the highest cable car station in Europe. In summer, the area
          transforms into a paradise for hikers and climbers with routes like
          the Five Lakes Walk, showcasing crystal-clear alpine lakes and
          panoramic vistas. Zermatt is also a great destination for train lovers
          — the Gornergrat Railway offers an unforgettable journey to the
          Gornergrat summit, revealing a 360° view of 29 peaks over 4,000
          meters. Whether you're enjoying traditional Swiss fondue in a cozy
          mountain hut or exploring the glaciers, Zermatt delivers a perfect
          blend of adventure, tranquility, and natural beauty. Zermatt: The
          Alpine Jewel Beneath the Matterhorn Zermatt is one of Switzerland’s
          most enchanting destinations, nestled deep within the Valais canton in
          the south of the country, near the Italian border. What makes this
          town truly extraordinary is its backdrop: the Matterhorn, one of the
          most recognizable mountains in the world with its dramatic,
          pyramid-shaped peak soaring 4,478 meters (14,692 ft) into the sky. The
          mountain dominates the skyline and adds a magical quality to
          everything around it. Car-Free, Carefree Charm Zermatt has a unique
          atmosphere thanks to its commitment to sustainability and
          preservation. The town center is completely car-free — only small
          electric taxis and horse-drawn carriages are allowed. This contributes
          to the town’s peaceful, clean-air environment and makes wandering its
          charming streets a delight. The cobbled lanes are lined with
          traditional wooden chalets, boutique shops, gourmet restaurants, and
          cozy cafés offering hot chocolate, raclette, and mulled wine in the
          winter. Outdoor Adventures All Year Round Winter in Zermatt is a haven
          for snow lovers. The ski area, known as Matterhorn Ski Paradise, is
          one of the highest and most extensive in Europe, with over 360 km of
          pistes and connections to the Italian resort of Cervinia. Snow is
          virtually guaranteed thanks to the nearby glacier. You can even ski
          here in the summer. Summer transforms the landscape into a lush green
          wonderland perfect for hiking, biking, and climbing. Over 400 km of
          marked trails snake through the mountains, forests, and meadows. The
          Five Lakes Walk is especially popular for its serene alpine lakes,
          some of which reflect the Matterhorn perfectly on a calm day. Iconic
          Experiences Gornergrat Railway: A highlight of any visit, this
          cogwheel train climbs up to 3,089 meters (10,135 ft) for panoramic
          views of the Matterhorn and more than 20 surrounding glaciers and 29
          peaks above 4,000 meters. Matterhorn Glacier Paradise: Ride Europe’s
          highest cable car to this awe-inspiring viewpoint. Inside, there's an
          ice palace carved into the glacier and sweeping vistas that, on a
          clear day, stretch across to France and Italy. Mountaineer’s Cemetery:
          A poignant and peaceful place honoring those who lost their lives
          attempting to climb the Matterhorn. It reflects the town’s deep
          connection to alpine exploration.
        </p>
      </div>

      {/* right side image  */}
      <div className="relative w-full lg:w-1/2 pt-6 lg:pt-0 ">
        <Image
          src={
            "https://i.pinimg.com/736x/69/3b/20/693b20535850f2a3209fb121a05c6ed5.jpg"
          }
          width={736}
          height={1104}
          alt="memory details image"
          className="rounded-4xl object-cover md:mx-auto"
        />

        {/* date */}
        <p className="absolute top-10 lg:top-3 right-3 md:right-7 lg:right-3 bg-white flex gap-3 drop-shadow-steel-gray-xs py-3 px-5 rounded-3xl">
          <Calendar size="24" color="#309898" variant="Broken" />{" "}
          <span className="text-lg font-medium text-dark-cyan">
            Jan 25, 2025
          </span>
        </p>
      </div>
    </div>
  );
}
