
"use client";
import { useState } from "react";
import {
  decorations,
  randomQuotes,
  welcomePlaces,
} from "./welcomeConfig";

type WelcomeKrishnaProps = {
  name: string;
  setName: (value: string) => void;

  quote: string;
  setQuote: (value: string) => void;

  place: string;
  setPlace: (value: string) => void;

  onGenerate: () => void;
};

export default function WelcomeKrishna({
  name,
  setName,
  quote,
  setQuote,
  place,
  setPlace,
  onGenerate,
}: WelcomeKrishnaProps) {
  const selectedPlace = welcomePlaces.find(
    (item) => item.id === place
  );

  const [messageGenerated, setMessageGenerated] =
    useState(false);

  const decorationSymbols = decorations
    .filter((item) => item.id)
    .map((item) => item.symbol);

  function generateKrishnaMessage() {
    const randomQuote =
      randomQuotes[
        Math.floor(
          Math.random() * randomQuotes.length
        )
      ];

    setQuote(randomQuote);
    setMessageGenerated(true);
  }

  function generateWelcome() {
    if (!quote) {
      generateKrishnaMessage();
    }

    onGenerate();
  }

  return (
    <section
      id="welcome"
      className="mx-auto max-w-6xl px-6 py-24"
    >
      {/* HEADER */}

      <div className="max-w-2xl">
        <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">
          👣 Welcoming Krishna
        </p>

        <h2 className="mt-3 text-4xl font-bold">
          Leave a little welcome for Kanna.
        </h2>

        <p className="mt-4 text-white/50">
          Create a personal Janmashtami welcome card
          that belongs to you.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">

        {/* ========================= */}
        {/* CONTROLS */}
        {/* ========================= */}

        <div className="space-y-7">

          {/* NAME */}

          <div>
            <label className="text-sm text-white/60">
              Your name
            </label>

            <input
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Enter your name"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-yellow-400/50"
            />
          </div>

          {/* PLACE */}

          <div>
            <label className="text-sm text-white/60">
              Which background did you choose for your
              Janmashtami welcome card?
            </label>

            <div className="mt-3 grid grid-cols-2 gap-2">
              {welcomePlaces.map((item) => {
                const selected =
                  place === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setPlace(item.id)
                    }
                    className={`overflow-hidden rounded-2xl border text-left transition ${
                      selected
                        ? "border-yellow-400/60 ring-1 ring-yellow-400/30"
                        : "border-white/10"
                    }`}
                  >
                    <div className="relative aspect-[4/3]">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />

                      <div className="absolute inset-x-0 bottom-0 bg-black/60 px-3 py-2 backdrop-blur-sm">

                        <span className="text-xs text-white">
                          {item.name}
                        </span>

                      </div>

                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ========================= */}
          {/* KRISHNA'S MESSAGE */}
          {/* ========================= */}

          <div className="rounded-3xl border border-yellow-400/10 bg-white/[0.03] p-6">

            <div className="text-center">

              <p className="text-xs uppercase tracking-[0.3em] text-yellow-300">
                🪶 A message from Krishna
              </p>

              <p className="mt-3 text-sm text-white/40">
                Let Krishna choose a little message
                especially for you.
              </p>

              <button
                type="button"
                onClick={generateKrishnaMessage}
                className="mt-5 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-6 py-3 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-400/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                {messageGenerated
                  ? "🔄 Ask Krishna Again"
                  : "✨ Ask Krishna"}
              </button>

              {quote && (
                <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">

                  <div className="text-2xl">
                    🦚
                  </div>

                  <p className="mt-3 text-lg leading-relaxed text-white/80">
                    “{quote}”
                  </p>

                  <p className="mt-3 text-xs text-white/30">
                    A Krishna-inspired thought
                  </p>

                </div>
              )}

            </div>

          </div>

          {/* ========================= */}
          {/* GENERATE */}
          {/* ========================= */}

  

        </div>

        {/* ========================= */}
        {/* WELCOME CARD */}
        {/* ========================= */}

        <div className="flex items-center justify-center">

          <div
            id="welcome-card"
            className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-yellow-400/20 shadow-2xl"
          >

            {/* BACKGROUND IMAGE */}

            {selectedPlace && (
              <img
                src={selectedPlace.image}
                alt={selectedPlace.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            {/* DARK OVERLAY */}

            <div className="absolute inset-0 bg-black/40" />

            {/* GRADIENT */}

            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />

            {/* CARD CONTENT */}

            <div className="relative z-10 flex h-full flex-col items-center justify-center p-10 text-center">

              {/* PEACOCK */}

              <div className="text-5xl drop-shadow-lg">
                🦚
              </div>

              {/* LABEL */}

              <p className="mt-5 text-xs uppercase tracking-[0.35em] text-yellow-300">
                Happy Janmashtami
              </p>

              {/* MESSAGE */}

              <h3 className="mt-6 text-3xl font-semibold text-white drop-shadow-lg">
                {quote || "Your Krishna-inspired message will appear here."}
              </h3>

              {/* NAME */}

              {name && (
                <p className="mt-3 text-sm text-white/70">
                  Wishes From {name}
                </p>
              )}

              {/* DECORATIONS */}

              <div className="flex gap-3 text-2xl">
                {decorationSymbols.map(
                  (symbol, index) => (
                    <span
                      key={`${symbol}-${index}`}
                    >
                      {symbol}
                    </span>
                  )
                )}
              </div>

              {/* PLACE */}

              <p className="mt-8 text-[10px] uppercase tracking-[0.25em] text-white/50">
                {selectedPlace?.name}
              </p>

              <p className="mt-2 text-sm text-white/70">
                Kanna has a place here. 💙
              </p>

            </div>

          </div>

        </div><br></br>
        <button
            type="button"
            onClick={generateWelcome}
            className="w-full rounded-full bg-yellow-400 px-7 py-3 font-semibold text-black transition hover:scale-[1.02] active:scale-[0.98]"
          >
            Show my Janmashtami special
          </button>

      </div>
    </section>
  );
}
