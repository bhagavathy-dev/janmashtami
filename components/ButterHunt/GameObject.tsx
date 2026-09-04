"use client";

type GameObjectProps = {
  x: number;
  y: number;
  type:
    | "butter"
    | "flower"
    | "flute"
    | "feather";
  onCollect: () => void;
};

const visuals = {
  butter: "🧈",
  flower: "🪷",
  flute: "🎵",
  feather: "🪶",
};

export default function GameObject({
  x,
  y,
  type,
  onCollect,
}: GameObjectProps) {
  return (
    <button
      type="button"
      onClick={onCollect}
      aria-label={
        type === "butter"
          ? "Collect butter"
          : "Decoy"
      }
      className="absolute z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-3xl transition-transform duration-100 hover:scale-125 active:scale-90"
      style={{
        left: `${x}%`,
        top: `${y}%`,
      }}
    >
      {visuals[type]}
    </button>
  );
}