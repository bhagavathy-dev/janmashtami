
"use client";

import { useEffect, useRef, useState } from "react";
import { bhajans } from "./bhajans";
type BhajanPlayerProps = {
  currentSong: string;
  setCurrentSong: (song: string) => void;
};
export default function BhajanPlayer({
  currentSong,
  setCurrentSong,
}: BhajanPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const current = bhajans[currentIndex];

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.src = current.src;
    audio.load();

    if (playing) {
      audio
        .play()
        .catch(() => {
          setPlaying(false);
        });
    }
  }, [currentIndex]);

  function playSong(index: number) {
    const audio = audioRef.current;

    if (!audio) return;

    setCurrentIndex(index);
    setPlaying(true);
    setExpanded(false);

    // The effect above loads the new source.
  }

  function togglePlay() {
    const audio = audioRef.current;

    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }

  function nextSong() {
    const nextIndex =
      (currentIndex + 1) % bhajans.length;

    playSong(nextIndex);
  }

  function previousSong() {
    const previousIndex =
      (currentIndex - 1 + bhajans.length) %
      bhajans.length;

    playSong(previousIndex);
  }

  function handleEnded() {
    const nextIndex =
      (currentIndex + 1) % bhajans.length;

    setCurrentIndex(nextIndex);
    setPlaying(true);
  }

  return (
    <>
      <audio
        ref={audioRef}
        onEnded={handleEnded}
      />

      <div className="fixed bottom-5 right-5 z-50">
        {!expanded ? (
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/85 p-2 pl-4 shadow-2xl backdrop-blur-xl">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="flex max-w-[150px] items-center gap-2"
            >
              <span className="text-lg">🎵</span>

              <span className="truncate text-sm text-white/80">
                {current.title}
              </span>
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yellow-400 text-sm text-black"
            >
              {playing ? "❚❚" : "▶"}
            </button>
          </div>
        ) : (
          <div className="w-[310px] rounded-3xl border border-white/10 bg-black/95 p-5 shadow-2xl backdrop-blur-xl">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-yellow-300">
                  Currently playing
                </p>

                <h3 className="mt-2 font-semibold text-white">
                  {current.title}
                </h3>

                <p className="mt-1 text-sm text-white/40">
                  {current.bhajan}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setExpanded(false)}
                className="text-xl text-white/40 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={previousSong}
                className="text-xl text-white/50 hover:text-white"
              >
                ←
              </button>

              <button
                type="button"
                onClick={togglePlay}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-400 text-black"
              >
                {playing ? "❚❚" : "▶"}
              </button>

              <button
                type="button"
                onClick={nextSong}
                className="text-xl text-white/50 hover:text-white"
              >
                →
              </button>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4">
              <p className="mb-3 text-xs text-white/40">
                Choose a bhajan
              </p>

              <div className="space-y-1">
                {bhajans.map((bhajan, index) => {
                  const selected =
                    index === currentIndex;

                  return (
                    <button
                      key={bhajan.id}
                      type="button"
                      onClick={() => playSong(index)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition ${
                        selected
                          ? "bg-yellow-400/10 text-yellow-300"
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span>{bhajan.title}</span>

                      {selected && playing && (
                        <span className="text-xs">
                          ▶
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}