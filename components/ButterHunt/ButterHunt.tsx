"use client";

import { useEffect, useRef, useState } from "react";
import GameObject from "./GameObject";
import GameResult from "./GameResult";

type GameItem = {
  id: number;
  type: "butter" | "flower" | "flute" | "feather";
  x: number;
  y: number;
};

type ButterHuntProps = {
  onGameComplete?: (score: number) => void;
};

const INITIAL_BUTTER_COUNT = 8;
const FLOWER_COUNT = 5;
const FLUTE_COUNT = 4;
const FEATHER_COUNT = 4;

const GAME_DURATION = 20;

function createPosition() {
  return {
    x: Math.random() * 86 + 7,
    y: Math.random() * 72 + 12,
  };
}

function createGameItems(): GameItem[] {
  const items: GameItem[] = [];

  // Butter
  for (let i = 0; i < INITIAL_BUTTER_COUNT; i++) {
    const position = createPosition();

    items.push({
      id: Date.now() + i + Math.random(),
      type: "butter",
      ...position,
    });
  }

  // Flowers
  for (let i = 0; i < FLOWER_COUNT; i++) {
    const position = createPosition();

    items.push({
      id: Date.now() + 100 + i + Math.random(),
      type: "flower",
      ...position,
    });
  }

  // Flutes
  for (let i = 0; i < FLUTE_COUNT; i++) {
    const position = createPosition();

    items.push({
      id: Date.now() + 200 + i + Math.random(),
      type: "flute",
      ...position,
    });
  }

  // Peacock feathers
  for (let i = 0; i < FEATHER_COUNT; i++) {
    const position = createPosition();

    items.push({
      id: Date.now() + 300 + i + Math.random(),
      type: "feather",
      ...position,
    });
  }

  return items;
}

function createNewButter(): GameItem {
  const position = createPosition();

  return {
    id: Date.now() + Math.random(),
    type: "butter",
    ...position,
  };
}

export default function ButterHunt({
  onGameComplete,
}: ButterHuntProps) {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);

  const [timeLeft, setTimeLeft] =
    useState(GAME_DURATION);

  const [items, setItems] = useState<GameItem[]>([]);

  /*
   * TIMER
   */

  useEffect(() => {
    if (!started || finished) {
      return;
    }

    if (timeLeft <= 0) {
      setFinished(true);
      setItems([]);

      onGameComplete?.(scoreRef.current);

      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((current) => current - 1);
    }, 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    started,
    finished,
    timeLeft,
    onGameComplete,
  ]);

  /*
   * START GAME
   */

  function startGame() {
    scoreRef.current = 0;

    setScore(0);
    setTimeLeft(GAME_DURATION);
    setFinished(false);
    setItems(createGameItems());
    setStarted(true);
  }

  /*
   * COLLECT OBJECT
   */

  function collectItem(
    id: number,
    type: GameItem["type"]
  ) {
    if (finished || timeLeft <= 0) {
      return;
    }

    /*
     * ONLY BUTTER COUNTS
     *
     * Flowers, flutes and feathers
     * are decoys.
     */

    if (type !== "butter") {
      return;
    }

    /*
     * Keep score in a ref as well as state.
     *
     * This prevents the final score from becoming
     * stale when the player clicks very quickly.
     */

    scoreRef.current += 1;

    setScore(scoreRef.current);

    /*
     * Remove collected butter
     * and immediately spawn another butter.
     */

    setItems((current) => {
      const remaining = current.filter(
        (item) => item.id !== id
      );

      return [
        ...remaining,
        createNewButter(),
      ];
    });
  }

  /*
   * BEFORE GAME
   */

  if (!started) {
    return (
      <div className="mx-auto max-w-5xl text-center">

        <p className="text-sm uppercase tracking-[0.3em] text-yellow-300">
          🧈 Butter Hunt
        </p>

        <h2 className="mt-3 text-4xl font-bold">
          How much butter can you collect?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-white/50">
          Krishna&apos;s butter is scattered
          everywhere. Find as much as you can
          before time runs out.
        </p>

        <button
          type="button"
          onClick={startGame}
          className="mt-8 rounded-full bg-yellow-400 px-7 py-3 font-semibold text-black transition hover:scale-[1.02] active:scale-[0.98]"
        >
          Start Butter Hunt
        </button>

      </div>
    );
  }

  /*
   * GAME
   */

  const remainingButter = items.filter(
    (item) => item.type === "butter"
  ).length;

  return (
    <div className="mx-auto max-w-5xl">

      {/* HEADER */}

      <div className="mb-6 flex items-center justify-between">

        {/* SCORE */}

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
            Butter
          </p>

          <p className="mt-1 text-3xl font-bold">
            {score}
          </p>
        </div>

        {/* TIMER */}

        <div className="text-center">

          <p className="text-xs uppercase tracking-[0.25em] text-white/40">
            Time
          </p>

          <p
            className={`mt-1 text-3xl font-bold ${
              timeLeft <= 5
                ? "text-red-300"
                : "text-yellow-300"
            }`}
          >
            {timeLeft}s
          </p>

        </div>

        {/* REMAINING BUTTER */}

        <div className="text-right">

          <p className="text-xs text-white/40">
            Still hiding
          </p>

          <p className="mt-1 text-2xl">
            🧈 × {remainingButter}
          </p>

        </div>

      </div>

      {/* GAME BOARD */}

      <div className="relative h-[520px] overflow-hidden rounded-[2rem] border border-yellow-400/10 bg-[radial-gradient(circle_at_center,#24164a,#090714)]">

        {/* DECORATIONS */}

        <div className="pointer-events-none absolute left-[12%] top-[15%] text-3xl opacity-30">
          🪷
        </div>

        <div className="pointer-events-none absolute right-[15%] top-[25%] text-3xl opacity-30">
          🪔
        </div>

        <div className="pointer-events-none absolute bottom-[15%] left-[25%] text-3xl opacity-30">
          🦚
        </div>

        <div className="pointer-events-none absolute bottom-[20%] right-[20%] text-3xl opacity-30">
          🪷
        </div>

        {/* GAME OBJECTS */}

        {!finished &&
          items.map((item) => (
            <GameObject
              key={item.id}
              x={item.x}
              y={item.y}
              type={item.type}
              onCollect={() =>
                collectItem(
                  item.id,
                  item.type
                )
              }
            />
          ))}

        {/* GAME OVER */}

        {finished && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">

            <div className="text-center">

              <div className="text-5xl">
                🧈
              </div>

              <p className="mt-4 text-xs uppercase tracking-[0.3em] text-yellow-300">
                Hunt complete
              </p>

              <h3 className="mt-3 text-4xl font-bold">
                {score} Butter
              </h3>

              <p className="mt-3 text-white/50">
                Kanna saw everything. 👀
              </p>

            </div>

          </div>
        )}

      </div>

      {/* RESULT */}

      {finished && (
        <div className="mt-8">

          <GameResult score={score} />

          <div className="mt-6 text-center">

            <button
              type="button"
              onClick={startGame}
              className="rounded-full border border-yellow-400/30 bg-yellow-400/10 px-6 py-3 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-400/20"
            >
              Hunt Again
            </button>

          </div>

        </div>
      )}

    </div>
  );
}