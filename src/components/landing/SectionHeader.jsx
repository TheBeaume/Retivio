export default function SectionHeader({
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="mx-auto mb-16 max-w-3xl text-center">

      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-purple-700">
        {eyebrow}
      </p>

      <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 lg:text-5xl">
        {title}
      </h2>

      <p className="mt-6 text-lg leading-8 text-slate-600">
        {description}
      </p>

    </div>
  );
}
