import Image from "next/image";
import type { BentoItem } from "@/lib/treatments/types";
import { Reveal } from "@/components/ui/Reveal";

// Grille "bento" : cases de tailles variées sur 4 colonnes (desktop).
// span : big = 2×2 avec image, wide = 2×1, tall = 1×2, normal = 1×1.
const SPAN: Record<NonNullable<BentoItem["span"]>, string> = {
  big: "md:col-span-2 md:row-span-2",
  wide: "md:col-span-2",
  tall: "md:row-span-2",
  normal: "",
};

export function BentoGrid({ items }: { items: BentoItem[] }) {
  return (
    <div className="grid auto-rows-[minmax(220px,auto)] gap-4 md:grid-cols-4">
      {items.map((item, i) => {
        const span = SPAN[item.span ?? "normal"];
        const withImage = Boolean(item.image);
        return (
          <Reveal
            key={item.title}
            delay={0.05 * i}
            className={`group relative flex flex-col justify-end overflow-hidden rounded-3xl p-7 ${span} ${
              withImage ? "min-h-[360px] text-ivory" : "border border-line bg-ivory text-ink"
            }`}
          >
            {item.image && (
              <>
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 92vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
              </>
            )}
            <div className="relative">
              {item.tag && (
                <p
                  className={`text-xs font-semibold uppercase tracking-[0.16em] ${
                    withImage ? "text-champagne" : "text-champagne-700"
                  }`}
                >
                  {item.tag}
                </p>
              )}
              <h3 className={`mt-3 font-serif leading-tight ${withImage ? "text-3xl" : "text-2xl"}`}>{item.title}</h3>
              <p className={`mt-2 text-[15px] leading-relaxed ${withImage ? "text-ivory/80" : "text-stone"}`}>
                {item.text}
              </p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
