"use client";

import { useState } from "react";

import Hero from "@/components/Hero/Hero";
import ButterHunt from "@/components/ButterHunt/ButterHunt";
import ArrivalTrail from "@/components/Footprint/ArrivalTrail";
import BhajanQueue from "@/components/Bhajan/BhajanQueue";
import CelebrationResult from "@/components/Celebration/CelebrationResult";

export default function Home() {
  const [score, setScore] = useState(0);
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const [trailGenerated, setTrailGenerated] = useState(false);

  return (
    <main>
      <Hero />

      <section className="mx-auto max-w-6xl px-6 py-24">
        <ButterHunt onScoreChange={setScore} />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <ArrivalTrail
          onGenerated={() => setTrailGenerated(true)}
        />
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <CelebrationResult
          score={score}
          currentSong={currentSong}
          trailGenerated={trailGenerated}
        />
      </section>

      <BhajanQueue
        onSongChange={setCurrentSong}
      />
    </main>
  );
}