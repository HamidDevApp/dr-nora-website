import type { Metadata } from "next";
import { NUTRITION } from "@/lib/treatments/nutrition";
import { TreatmentPageView } from "@/components/treatment/TreatmentPageView";

export const metadata: Metadata = {
  title: NUTRITION.metaTitle,
  description: NUTRITION.metaDescription,
};

// Le contenu de la page vit dans lib/treatments/nutrition.ts ;
// la mise en page est partagée avec les autres pages de soins.
export default function Page() {
  return <TreatmentPageView data={NUTRITION} />;
}
