import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import "./globals.css";

// Titres : esprit éditorial haute couture.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

// Texte courant et interface : léger, très lisible.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr Nora Leghzaoui · Médecine esthétique, laser & nutrition à Agadir",
  description:
    "Cabinet médico-laser esthétique et nutrition de la Baie d'Agadir. Épilation laser, soins du visage, injections et accompagnement nutritionnel par le Dr Nora Leghzaoui.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${jakarta.variable} bg-alabaster`}>
      <body>
        <MotionProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
        </MotionProvider>
      </body>
    </html>
  );
}
