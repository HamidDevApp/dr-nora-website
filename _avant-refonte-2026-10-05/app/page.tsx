import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";

// Page d'accueil = vue d'ensemble. Header, Footer et bouton WhatsApp sont
// communs à toutes les pages et vivent dans app/layout.tsx.
// Chaque bloc de soins renvoie vers sa page détaillée (/laser, /esthetique,
// /nutrition), la section À propos vers /cabinet.
export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Reviews />
      <Contact />
    </>
  );
}
