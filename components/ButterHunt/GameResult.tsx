"use client";

type GameResultProps = {
  score: number;
};

export default function GameResult({
  score,
}: GameResultProps) {
  return (
    <div className="text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-yellow-300">
        Butter collected
      </p>

      <p className="mt-2 text-5xl font-bold">
        {score}
      </p>
    </div>
  );
}