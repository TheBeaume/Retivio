export default function HeroBackground() {
  return (
    <>
      {/* Main Background */}
      <div className="absolute inset-0 -z-20 bg-[#050816]" />

      {/* Purple Glow */}
      <div className="pointer-events-none absolute -top-40 right-[-120px] -z-10 h-[520px] w-[520px] rounded-full bg-purple-600/20 blur-[140px]" />

      {/* Cyan Glow */}
      <div className="pointer-events-none absolute bottom-[-180px] left-[-120px] -z-10 h-[500px] w-[500px] rounded-full bg-cyan-500/15 blur-[160px]" />

      {/* Center Glow */}
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-[140px]" />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
    </>
  );
}
