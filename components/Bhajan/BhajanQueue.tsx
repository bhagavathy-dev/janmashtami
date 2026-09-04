"use client";

import { useState } from "react";
import { bhajans } from "@/public/bhajans";

type Props = {
  onSongChange: (song: string) => void;
};

export default function BhajanQueue({
  onSongChange,
}: Props) {
  const [current, setCurrent] =
    useState(bhajans[0]);

  function selectSong(song: typeof bhajans[number]) {
    setCurrent(song);
    onSongChange(song.title);
  }

  return (
    <aside className="fixed bottom-4 right-4 z-50 w-[340px] rounded-3xl border border-white/10 bg-black/80 p-5 shadow-2xl backdrop-blur-xl">
      <div className="text-xs uppercase tracking-[0.25em] text-yellow-300">
        🎵 Now Playing
      </div>

      <h3 className="mt-2 font-semibold">
        {current.title}
      </h3>

      <div className="mt-4 aspect-video overflow-hidden rounded-2xl">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${current.youtubeId}`}
          title={current.title}
          allow="autoplay; encrypted-media"
        />
      </div>

      <div className="mt-5">
        <div className="text-xs text-white/40">
          Bhajans
        </div>

        <div className="mt-2 space-y-1">
          {bhajans.map((song) => (
            <button
              key={song.id}
              onClick={() => selectSong(song)}
              className="w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-white/10"
            >
              {song.title}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}