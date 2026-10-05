import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Politique de confidentialité · Dr Nora Leghzaoui" };

export default function Confidentialite() {
  return (
    <LegalPage title="Politique de confidentialité">
      <section>
        <h2>Données collectées</h2>
        <p>
          Le formulaire de rendez-vous recueille votre nom, votre téléphone et, si vous le souhaitez, votre
          e-mail, le soin qui vous intéresse et un message.
        </p>
      </section>
      <section>
        <h2>Utilisation</h2>
        <p>
          Ces données servent uniquement à vous recontacter pour organiser votre consultation. Elles ne sont
          ni vendues ni cédées à des tiers.
        </p>
      </section>
      <section>
        <h2>Vos droits (loi 09-08)</h2>
        <p>
          Conformément à la loi 09-08 relative à la protection des personnes physiques à l&apos;égard du
          traitement des données à caractère personnel, vous disposez d&apos;un droit d&apos;accès, de
          rectification et d&apos;opposition. Pour l&apos;exercer, contactez le cabinet au {SITE.phoneDisplay}.
          <br />
          Déclaration CNDP : [numéro à compléter]
        </p>
      </section>
    </LegalPage>
  );
}
