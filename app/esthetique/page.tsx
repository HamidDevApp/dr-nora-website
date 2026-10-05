import type { Metadata } from "next";
import { ESTHETIQUE } from "@/lib/treatments/esthetique";
import { TreatmentPageView } from "@/components/treatment/TreatmentPageView";

export const metadata: Metadata = {
  title: ESTHETIQUE.metaTitle,
  description: ESTHETIQUE.metaDescription,
};

// Le contenu de la page vit dans lib/treatments/esthetique.ts ;
// la mise en page est partagée avec les autres pages de soins.
export default function Page() {
  return <TreatmentPageView data={ESTHETIQUE} />;
}
