// Classes partagées des boutons, pour garder la même hiérarchie partout :
// primaire = encre pleine, secondaire = contour, jamais de bouton doré.

const base =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-600";

export const btnPrimary = `${base} bg-ink text-ivory hover:bg-ink/90`;
export const btnSecondary = `${base} border border-ink/20 text-ink hover:border-ink/40 hover:bg-sand`;
export const btnOnDark = `${base} bg-ivory text-ink hover:bg-sand`;
