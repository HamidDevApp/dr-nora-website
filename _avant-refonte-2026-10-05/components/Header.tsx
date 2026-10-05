"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { NAV, SITE } from "@/lib/site";
import { EASE } from "@/lib/motion";
import { CloseIcon, MenuIcon, PhoneIcon } from "@/components/ui/icons";

// Barre fixe : transparente en haut de page, ivoire translucide + flou au défilement.
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href);

  // Referme le menu mobile à chaque changement de page.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-line/70 bg-ivory/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="leading-none" aria-label={`${SITE.name}, accueil`}>
          <span className="block font-serif text-2xl text-ink">Dr Nora Leghzaoui</span>
          <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.22em] text-champagne-700">
            Laser · Esthétique · Nutrition
          </span>
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-7 lg:flex">
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`relative text-[15px] transition-colors hover:text-ink ${
                isActive(l.href) ? "text-ink" : "text-ink/70"
              }`}
            >
              {l.label}
              {isActive(l.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1.5 left-0 h-px w-full bg-champagne"
                  transition={{ duration: 0.4, ease: EASE }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a href={SITE.phoneHref} className="hidden items-center gap-2 text-[15px] text-ink/80 hover:text-ink xl:inline-flex">
            <PhoneIcon className="h-4 w-4 text-sage-600" />
            {SITE.phoneDisplay}
          </a>
          <Link
            href="/#contact"
            className="inline-flex h-10 items-center rounded-full bg-ink px-5 text-sm font-medium text-ivory transition-colors hover:bg-ink/90"
          >
            Réserver
          </Link>
        </div>

        <button
          type="button"
          className="-mr-2 p-2 text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-mobile"
            aria-label="Navigation mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="h-[calc(100dvh-72px)] overflow-y-auto bg-ivory px-5 pt-4 pb-10 lg:hidden"
          >
            <ul className="divide-y divide-line">
              {NAV.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={`block py-4 font-serif text-3xl ${isActive(l.href) ? "text-sage-600" : "text-ink"}`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-8 flex h-12 items-center justify-center rounded-full bg-ink text-[15px] font-medium text-ivory"
            >
              Réserver une consultation
            </Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
