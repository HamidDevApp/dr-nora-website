import type { Metadata } from "next";
import { LASER } from "@/lib/treatments/laser";
import { TreatmentPageView } from "@/components/treatment/TreatmentPageView";

export const metadata: Metadata = {
  title: LASER.metaTitle,
  description: LASER.metaDescription,
};

// Le contenu de la page vit dans lib/treatments/laser.ts ;
// la mise en page est partagée avec les autres pages de soins.
export default function Page() {
  return <TreatmentPageView data={LASER} />;
}
