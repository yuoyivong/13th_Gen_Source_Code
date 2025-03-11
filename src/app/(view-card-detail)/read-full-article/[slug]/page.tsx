import Image from "next/image";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "View Article Details",
};

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="bg-white mt-32 max-h-auto p-20 rounded-t-[50px]">
      {/* cover image */}
      <div className="flex justify-end relative">
        <Image
          src={
            "https://i.pinimg.com/736x/f6/5d/f9/f65df904661117908671cb97d0699c3d.jpg"
          }
          alt="cover"
          width={250}
          height={407}
          className="rounded-3xl drop-shadow-xl absolute -top-52"
        />
      </div>

      {/* content side */}
      <div className="space-y-5 mt-36">
        <div>
          <h2 className="text-2xl font-medium">How Do You Live?</h2>
          <h3 className="text-xl">
            by <span className="text-deep-teal font-medium">Black Monster</span>
          </h3>
        </div>
        <p className="text-justify">
          "How Do You Live?" (君たちはどう生きるか, Kimitachi wa Dō Ikiru ka) by
          Genzaburō Yoshino is a philosophical coming-of-age novel set in
          pre-war Japan. It revolves around Junichi "Copper" Honda, a thoughtful
          15-year-old boy, who is facing the complexities of adolescence, his
          family life, and the social realities around him. Copper's life
          changes after his father’s death, which forces him to grapple with the
          idea of responsibility, morality, and the value of individual actions.
          The novel takes a unique approach by blending a narrative with deep
          philosophical lessons. Copper’s Uncle, a major influence on him,
          writes long letters to him that contain valuable wisdom about how one
          should live life, focusing on themes like social justice, personal
          responsibility, and compassion. These letters are the central guide
          for Copper, offering him tools to navigate the world and think
          critically about what it means to be a good person. Throughout the
          story, Copper experiences several incidents that challenge his
          understanding of society. He confronts issues like bullying, classism,
          and how to deal with personal suffering. One important aspect of the
          novel is Copper's relationship with his peers and the way he learns to
          handle the complexities of friendships and social interactions. He
          also learns about the differences between the ideal self and the real
          self, discovering how to cope with imperfections and imperfections in
          others. Copper’s growth throughout the novel isn't just emotional but
          deeply intellectual. His uncle’s lessons on the interconnectedness of
          people, the importance of self-awareness, and contributing to the
          greater good shape Copper into a reflective and compassionate young
          man. By the end of the novel, Copper begins to develop a clearer
          understanding of how he should live his life, striving to be a person
          who lives not only for himself but also for others. The book isn’t
          just about a boy growing up; it’s a call to the readers to reflect on
          their own lives and the way they live in the world. It challenges its
          audience to think critically about their values and actions, making it
          timeless in its appeal. The story is particularly impactful for
          younger readers, as it offers them both a fictional narrative and
          practical lessons for life. In addition to its philosophical depth,
          "How Do You Live?" has influenced Japanese culture profoundly. The
          book has been celebrated for its positive moral teachings, and its
          themes are still relevant in contemporary conversations about ethical
          living. The novel has had a lasting impact on Japanese literature and
          has inspired filmmakers like Hayao Miyazaki, who used it as a primary
          inspiration for his 2023 animated film "The Boy and the Heron". The
          enduring appeal of "How Do You Live?" lies in its universal
          exploration of the human experience, making it a classic read for
          generations. 4o mini
        </p>
      </div>
    </div>
  );
}
