
"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";

import { welcomePlaces } from "@/components/WelcomeKrishna/welcomeConfig";

type CelebrationResultProps = {
  score: number;
  name: string;
  quote: string;
  place: string;
};

export default function CelebrationResult({
  score,
  name,
  quote,
  place,
}: CelebrationResultProps) {
  const shareCardRef = useRef<HTMLDivElement>(null);

  const [exporting, setExporting] = useState(false);
  const [sharing, setSharing] = useState(false);

  const selectedPlace = welcomePlaces.find(
    (item) => item.id === place
  );

  /*
   * DOWNLOAD
   */

  async function downloadCard() {
    if (!shareCardRef.current) return;

    try {
      setExporting(true);

      const dataUrl = await toPng(
        shareCardRef.current,
        {
          cacheBust: true,
          pixelRatio: 2,
        }
      );

      const link = document.createElement("a");

      link.download = "my-janmashtami-moment.png";
      link.href = dataUrl;

      link.click();
    } catch (error) {
      console.error(
        "Failed to generate celebration card:",
        error
      );
    } finally {
      setExporting(false);
    }
  }

  /*
   * SHARE
   */

  async function shareCard() {
    if (!shareCardRef.current) return;

    try {
      setSharing(true);

      const dataUrl = await toPng(
        shareCardRef.current,
        {
          cacheBust: true,
          pixelRatio: 2,
        }
      );

      const response = await fetch(dataUrl);
      const blob = await response.blob();

      const file = new File(
        [blob],
        "my-janmashtami-moment.png",
        {
          type: "image/png",
        }
      );

      const shareText =
        `This is my Janmashtami score and welcome card 🧈✨ ` +
        `I collected ${score} pieces of Butter Hunt! ` +
        `Could you beat my score? 🦚`;

      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({
          files: [file],
        })
      ) {
        await navigator.share({
          title: "My Janmashtami Moment",
          text: shareText,
          files: [file],
        });
      } else if (navigator.share) {
        await navigator.share({
          title: "My Janmashtami Moment",
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(
          `${shareText}\n\n${window.location.href}`
        );

        alert(
          "Your Janmashtami caption and page link have been copied."
        );
      }
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        return;
      }

      console.error(
        "Failed to share celebration card:",
        error
      );
    } finally {
      setSharing(false);
    }
  }

  return (
    <section
      id="celebration"
      className="mx-auto max-w-6xl px-6 py-24"
    >
      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div className="mx-auto max-w-2xl text-center">

        <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">
          ✨ Janmashtami Celebration
        </p>

        <h2 className="mt-4 text-4xl font-bold">
          Your Krishna moment is ready.
        </h2>

        <p className="mt-4 text-white/50">
          Save it. Share it. Challenge someone to beat
          your Butter Hunt score.
        </p>

      </div>

      {/* ========================= */}
      {/* CARD */}
      {/* ========================= */}

      <div className="mt-12 flex justify-center">

        <div
          ref={shareCardRef}
          id="share-card"
          className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] border border-yellow-400/20 shadow-2xl"
        >

          {/* ========================= */}
          {/* BACKGROUND */}
          {/* ========================= */}

          {selectedPlace && (
            <img
              src={selectedPlace.image}
              alt={selectedPlace.name}
              crossOrigin="anonymous"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

          {/* ========================= */}
          {/* OVERLAY */}
          {/* ========================= */}

          <div className="absolute inset-0 bg-black/35" />

          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90" />

          {/* ========================= */}
          {/* CARD CONTENT */}
          {/* ========================= */}

          <div className="relative z-10 flex h-full flex-col items-center justify-between p-8 text-center">

            {/* ========================= */}
            {/* TOP */}
            {/* ========================= */}

            <div>

              <p className="text-[10px] uppercase tracking-[0.4em] text-yellow-300">
                Janmashtami
              </p>

              <h3 className="mt-3 text-3xl font-bold text-white">
                My Krishna Moment
              </h3>

            </div>

            {/* ========================= */}
            {/* CENTER */}
            {/* ========================= */}

            <div className="flex flex-col items-center">

              <div className="text-5xl drop-shadow-lg">
                🦚
              </div>

              {/* KRISHNA MESSAGE */}

              <p className="mt-6 max-w-xs text-xl font-medium leading-relaxed text-white drop-shadow-lg">
                “{quote}”
              </p>

              {/* NAME */}

              {name && (
                <p className="mt-3 text-sm text-white/70">
                  Wishes From {name}
                </p>
              )}

            </div>

            {/* ========================= */}
            {/* BOTTOM */}
            {/* ========================= */}

            <div className="w-full">

              {/* PLACE */}

              <p className="mb-4 text-[9px] uppercase tracking-[0.3em] text-white/50">
                {selectedPlace?.name}
              </p>

              {/* SCORE */}

              <div className="rounded-3xl border border-yellow-300/20 bg-black/40 p-5 backdrop-blur-md">

                <p className="text-xs uppercase tracking-[0.3em] text-yellow-300">
                  🧈 Butter Hunt
                </p>

                <p className="mt-2 text-5xl font-bold text-white">
                  {score}
                </p>

                <p className="mt-1 text-xs text-white/50">
                  pieces collected
                </p>

              </div>

              {/* FINISHING TOUCH */}

              <p className="mt-5 text-xs italic leading-relaxed text-white/60">
                “A little butter, a little mischief,
                and a heart full of Krishna.”
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* ACTIONS */}
      {/* ========================= */}

      <div className="mx-auto mt-8 flex max-w-md gap-3">

        <button
          type="button"
          onClick={downloadCard}
          disabled={exporting}
          className="flex-1 rounded-full bg-yellow-400 px-5 py-3 font-semibold text-black transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {exporting
            ? "Preparing..."
            : "Download Card"}
        </button>

        <button
          type="button"
          onClick={shareCard}
          disabled={sharing}
          className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sharing
            ? "Preparing..."
            : "Share"}
        </button>

      </div>

    </section>
  );
}
