"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SITE, whatsappUrl } from "@/lib/site";
import { SERVICE_CATEGORIES } from "@/lib/services";
import { EASE } from "@/lib/motion";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { btnOnDark, btnPrimary } from "@/components/ui/buttons";
import { CheckIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/ui/icons";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "mt-2 block w-full rounded-xl border border-line bg-ivory px-4 py-3 text-[15px] text-ink placeholder:text-stone/70 transition-colors focus:border-sage-600 focus:outline-none focus:ring-2 focus:ring-sage-600/20";
const label = "text-sm font-medium text-ink";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("/api/rdv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-ink py-24 text-ivory md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12">
        {/* Colonne gauche : WhatsApp en priorité, puis coordonnées */}
        <div className="lg:col-span-5">
          <SectionHeading
            id="contact-title"
            tone="dark"
            eyebrow="Prendre rendez-vous"
            title={
              <>
                Votre consultation commence <em className="text-champagne">par une écoute.</em>
              </>
            }
            intro="Écrivez-nous sur WhatsApp pour une réponse rapide, ou laissez vos coordonnées : le cabinet vous rappelle pour fixer le rendez-vous."
          />

          <Reveal delay={0.1}>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnOnDark} mt-10 h-14 w-full text-base sm:w-auto sm:px-9`}
            >
              <WhatsAppIcon className="h-5 w-5 text-sage-600" />
              Réserver via WhatsApp
            </a>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-12 space-y-6 border-t border-ivory/15 pt-10 text-[15px]">
              <div className="flex gap-4">
                <dt className="sr-only">Téléphone</dt>
                <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-champagne" />
                <dd>
                  <a href={SITE.phoneHref} className="hover:underline">
                    {SITE.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="sr-only">Adresse</dt>
                <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-champagne" />
                <dd className="text-ivory/85">
                  {SITE.address.line1}
                  <br />
                  {SITE.address.line2}, {SITE.address.city}
                  <br />
                  <a
                    href={SITE.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-ivory underline-offset-4 hover:underline"
                  >
                    Ouvrir dans Google Maps
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* Colonne droite : formulaire */}
        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="relative rounded-[2rem] bg-ivory p-7 text-ink sm:p-10">
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  role="status"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sage-100 text-sage-600">
                    <CheckIcon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 font-serif text-3xl">Merci, votre demande est bien reçue.</h3>
                  <p className="mt-3 max-w-sm text-stone">
                    Le cabinet vous rappelle pour convenir d&apos;un créneau de consultation.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-8 text-sm font-medium text-sage-600 underline-offset-4 hover:underline"
                  >
                    Envoyer une autre demande
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-5 sm:grid-cols-2"
                >
                  <h3 className="font-serif text-3xl sm:col-span-2">Demande de rendez-vous</h3>

                  <div>
                    <label htmlFor="name" className={label}>
                      Nom et prénom
                    </label>
                    <input id="name" name="name" required autoComplete="name" className={field} />
                  </div>
                  <div>
                    <label htmlFor="phone" className={label}>
                      Téléphone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="06 00 00 00 00"
                      className={field}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={label}>
                      E-mail <span className="font-normal text-stone">(facultatif)</span>
                    </label>
                    <input id="email" name="email" type="email" autoComplete="email" className={field} />
                  </div>
                  <div>
                    <label htmlFor="service" className={label}>
                      Soin souhaité
                    </label>
                    <select id="service" name="service" defaultValue="" className={field}>
                      <option value="">Je ne sais pas encore</option>
                      {SERVICE_CATEGORIES.map((c) => (
                        <optgroup key={c.id} label={c.label}>
                          {c.services.map((s) => (
                            <option key={s.title}>{s.title}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className={label}>
                      Message <span className="font-normal text-stone">(facultatif)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Vos attentes, vos disponibilités…"
                      className={`${field} resize-none`}
                    />
                  </div>

                  {/* Piège à robots : champ invisible pour les humains */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden
                    className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  />

                  <label className="flex items-start gap-3 text-[13px] leading-relaxed text-stone sm:col-span-2">
                    <input
                      type="checkbox"
                      name="consent"
                      required
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-line accent-[#1f2a2e]"
                    />
                    J&apos;accepte que mes données soient utilisées uniquement pour me recontacter au
                    sujet de ma demande, conformément à la loi 09-08.{" "}
                  </label>

                  <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
                    <button type="submit" disabled={status === "sending"} className={`${btnPrimary} shrink-0 whitespace-nowrap disabled:opacity-60`}>
                      {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
                    </button>
                    {status === "error" && (
                      <p role="alert" className="text-sm text-[#9b3b2f]">
                        L&apos;envoi a échoué. Réessayez ou{" "}
                        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="underline">
                          écrivez-nous sur WhatsApp
                        </a>
                        .
                      </p>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
