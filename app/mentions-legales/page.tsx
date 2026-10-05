import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Mentions légales · Dr Nora Leghzaoui" };

// Les éléments entre crochets sont à compléter avec les informations officielles du cabinet.
export default function MentionsLegales() {
  return (
    <LegalPage title="Mentions légales">
      <section>
        <h2>Éditeur du site</h2>
        <p>
          Cabinet du Dr Nora Leghzaoui, {SITE.tagline.toLowerCase()}.
          <br />
          {SITE.address.line1}, {SITE.address.line2}, {SITE.address.city}, {SITE.address.country}.
          <br />
          Téléphone : {SITE.phoneDisplay}
          <br />
          Inscription au Conseil régional de l&apos;Ordre national des médecins : [à compléter]
          <br />
          Identifiant commun de l&apos;entreprise (ICE) : [à compléter]
        </p>
      </section>
      <section>
        <h2>Directrice de la publication</h2>
        <p>Dr Nora Leghzaoui.</p>
      </section>
      <section>
        <h2>Hébergement</h2>
        <p>Hostinger International Ltd. [adresse de l&apos;hébergeur à compléter]</p>
      </section>
      <section>
        <h2>Information médicale</h2>
        <p>
          Les contenus de ce site sont fournis à titre informatif. Ils ne remplacent pas une consultation
          médicale. Les résultats des soins varient d&apos;une personne à l&apos;autre. Aucun tarif n&apos;est
          communiqué en ligne : le prix est défini après consultation.
        </p>
      </section>
      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          Les textes, photographies et éléments graphiques de ce site sont la propriété du cabinet. Toute
          reproduction sans autorisation est interdite.
        </p>
      </section>
    </LegalPage>
  );
}
