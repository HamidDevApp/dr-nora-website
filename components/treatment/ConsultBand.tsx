import Link from "next/link";
import { SITE, whatsappUrl } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { btnOnDark } from "@/components/ui/buttons";
import { PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";

// Bandeau de fin de page : rappel "sans prix en ligne" + prise de rendez-vous.
export function ConsultBand({ topic }: { topic?: string }) {
  return (
    <section className="bg-ink py-20 text-ivory md:py-28">
      <Reveal className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne">Consultation médicale</p>
        <h2 className="mt-4 font-serif text-4xl leading-[1.1] sm:text-5xl">
          Chaque protocole commence <em className="text-champagne">par une écoute.</em>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-ivory/75">
          Les tarifs ne sont pas communiqués en ligne : le prix est défini après la consultation, une fois
          le diagnostic posé et le protocole établi avec vous.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={whatsappUrl(
              topic
                ? `Bonjour Dr Nora, je souhaite prendre rendez-vous (${topic}).`
                : undefined
            )}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnOnDark} h-14 px-9 text-base`}
          >
            <WhatsAppIcon className="h-5 w-5 text-sage-600" />
            Réserver via WhatsApp
          </a>
          <a
            href={SITE.phoneHref}
            className="inline-flex h-14 items-center gap-2 rounded-full border border-ivory/25 px-8 text-base text-ivory transition-colors hover:bg-ivory/10"
          >
            <PhoneIcon className="h-5 w-5 text-champagne" />
            {SITE.phoneDisplay}
          </a>
        </div>
        <Link href="/#contact" className="mt-6 inline-block text-sm text-ivory/70 underline-offset-4 hover:text-ivory hover:underline">
          Ou laisser vos coordonnées pour être rappelée
        </Link>
      </Reveal>
    </section>
  );
}
