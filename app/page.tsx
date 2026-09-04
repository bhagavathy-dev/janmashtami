"use client";

import { useState } from "react";

import Hero from "@/components/Hero/Hero";
import ButterHunt from "@/components/ButterHunt/ButterHunt";
import WelcomeKrishna from "@/components/WelcomeKrishna/WelcomeKrishna";
import BhajanPlayer from "@/components/Bhajan/BhajanPlayer";
import CelebrationResult from "@/components/Celebration/CelebrationResult";

export default function Home() {
  // =========================
  // BUTTER HUNT
  // =========================

  const [butterScore, setButterScore] =
    useState<number | null>(null);

  // =========================
  // WELCOME CARD
  // =========================

  const [name, setName] = useState("");

  const [quote, setQuote] = useState("");

  const [place, setPlace] = useState("temple");

  // =========================
  // BHAJAN
  // =========================

  const [currentSong, setCurrentSong] =
    useState("Radhe Radhe");

  // =========================
  // CELEBRATION RESULT
  // =========================

  const [welcomeGenerated, setWelcomeGenerated] =
    useState(false);

  return (
    <main>

      {/* ========================= */}
      {/* HERO */}
      {/* ========================= */}

      <Hero />

      {/* ========================= */}
      {/* BUTTER HUNT */}
      {/* ========================= */}

      <section
        id="butter"
        className="mx-auto max-w-6xl px-6 py-24"
      >
        <ButterHunt
          onGameComplete={setButterScore}
        />
      </section>

      {/* ========================= */}
      {/* WELCOME KRISHNA */}
      {/* ========================= */}

      <WelcomeKrishna
        name={name}
        setName={setName}
        quote={quote}
        setQuote={setQuote}
        place={place}
        setPlace={setPlace}
        onGenerate={() => {
          setWelcomeGenerated(true);
        }}
      />

      {/* ========================= */}
      {/* CELEBRATION RESULT */}
      {/* ========================= */}

      {welcomeGenerated && (
        <CelebrationResult
          score={butterScore ?? 0}
          name={name}
          quote={quote}
          place={place}
          currentSong={currentSong}
        />
      )}

      {/* ========================= */}
      {/* BHAJAN PLAYER */}
      {/* ========================= */}

      <BhajanPlayer
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
      />

    </main>
  );
}
