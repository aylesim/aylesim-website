export default function Hero() {
  return (
    <section className="pt-8 pb-12 content-width md:pt-12 md:pb-20">
      <p className="mb-10 font-medium font-serif-display text-[var(--foreground)] text-base md:text-lg">
        Birds: Now Available
      </p>
      <p
        className="max-w-2xl font-serif-display text-2xl text-[var(--text-secondary)] leading-relaxed md:text-3xl md:leading-relaxed"
        style={{
          animation: "fade-in-print 1.2s ease-out 0.3s both",
        }}
      >
        Creative Technologist — Max/MSP, Creative Coding, Interactive
        Experiences · Berlin
      </p>
    </section>
  );
}
