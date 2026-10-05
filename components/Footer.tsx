import Link from "next/link";
import { NAV, SITE } from "@/lib/site";
import { FacebookIcon, InstagramIcon } from "@/components/ui/icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ivory pt-20 pb-28 md:pb-10" aria-labelledby="footer-title">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 border-b border-line pb-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p id="footer-title" className="font-serif text-3xl text-ink">
              Dr Nora Leghzaoui
            </p>
            <p className="mt-2 text-[15px] text-stone">{SITE.tagline}</p>
            <div className="mt-6 flex gap-3">
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram du cabinet"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-sand"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook du cabinet"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-sand"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne-700">
              Le cabinet
            </h2>
            <address className="mt-4 text-[15px] not-italic leading-relaxed text-ink">
              {SITE.address.line1}
              <br />
              {SITE.address.line2}, {SITE.address.city}
              <br />
              {SITE.address.country}
            </address>
            <a href={SITE.phoneHref} className="mt-3 inline-block text-[15px] text-ink hover:underline">
              {SITE.phoneDisplay}
            </a>
          </div>

          <nav className="md:col-span-3" aria-label="Plan du site">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-champagne-700">
              Navigation
            </h2>
            <ul className="mt-4 space-y-2 text-[15px]">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-ink/80 hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-[13px] text-stone sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Dr Nora Leghzaoui. Tous droits réservés.</p>
          <ul className="flex gap-6">
            <li>
              <Link href="/mentions-legales" className="hover:text-ink">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/confidentialite" className="hover:text-ink">
                Politique de confidentialité
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
