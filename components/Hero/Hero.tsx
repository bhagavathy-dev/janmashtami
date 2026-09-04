export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#24164a_0%,#090714_60%)]" />

      <div className="relative z-10 max-w-3xl text-center">
        <div className="mb-6 text-6xl">
          🦚
        </div>

        <p className="text-sm uppercase tracking-[0.35em] text-yellow-300">
          Janmashtami
        </p>

        <h1 className="mt-5 text-5xl font-bold tracking-tight md:text-7xl">
          Krishna&apos;s Little Celebration
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg text-white/60">
          A little butter. A little mischief. A little music.
        </p>

        <a
          href="#butter"
          className="mt-10 inline-block rounded-full bg-yellow-400 px-7 py-3 font-semibold text-black"
        >
          Start celebrating
        </a>
      </div>
    </section>
  );
}

