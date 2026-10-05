// Gabarit sobre pour les pages légales.
export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-36 pb-24 sm:px-8">
        <h1 className="font-serif text-5xl text-ink">{title}</h1>
        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-stone [&_h2]:mb-2 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-ink">
          {children}
        </div>
    </div>
  );
}
