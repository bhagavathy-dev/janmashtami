"use client";

import { useRef } from "react";

type Props = {
  score: number;
  title: string;
  song: string;
};

export default function ShareCard({
  score,
  title,
  song,
}: Props) {
  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  function generateCard() {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = 1080;
    canvas.height = 1350;

    ctx.fillStyle = "#10091f";
    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    ctx.textAlign = "center";

    ctx.fillStyle = "#f5c95b";
    ctx.font = "32px Arial";

    ctx.fillText(
      "KRISHNA'S LITTLE CELEBRATION",
      540,
      130
    );

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 80px Arial";

    ctx.fillText(title, 540, 330);

    ctx.font = "bold 110px Arial";

    ctx.fillText(`🧈 ${score}`, 540, 520);

    ctx.font = "30px Arial";

    ctx.fillStyle = "#cccccc";

    ctx.fillText(
      "Butter pots collected",
      540,
      570
    );

    ctx.fillText(
      `🎵 ${song || "A Krishna bhajan"}`,
      540,
      700
    );

    ctx.fillText(
      "Happy Janmashtami 🦚",
      540,
      1100
    );
  }

  function download() {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const link = document.createElement("a");

    link.download =
      "my-krishna-celebration.png";

    link.href =
      canvas.toDataURL("image/png");

    link.click();
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="hidden"
      />

      <button
        onClick={generateCard}
        className="rounded-full bg-yellow-400 px-6 py-3 font-semibold text-black"
      >
        Generate share card
      </button>

      <button
        onClick={download}
        className="ml-3 rounded-full border border-white/20 px-6 py-3"
      >
        Download
      </button>
    </div>
  );
}