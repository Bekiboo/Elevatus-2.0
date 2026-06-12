// Classes Tailwind partagées du portail — une seule source pour le style des
// formulaires (un changement de focus/erreur/dark-mode = un seul fichier).
//
// Langage visuel : encre pétrole (`ink`) sur fond `paper`, l'orange de la
// marque (`brand`) réservé aux accents « maintenant » (onglet actif,
// aujourd'hui, sélection) — pas aux aplats.

// Champs de saisie terrain : hauteur tactile (44px+) et text-base (pas de zoom iOS).
export const input =
	'h-12 w-full rounded-lg border border-ink/20 bg-white px-3 text-base text-ink placeholder:text-ink-soft/50 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink'

// Variante compacte pour les écrans denses (tables, formulaires desktop).
export const inputSm =
	'w-full rounded-lg border border-ink/20 bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-soft/50 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink'

export const label = 'block text-sm font-medium text-ink'
export const labelXs = 'block text-xs font-medium text-ink-soft'

export const btnPrimary =
	'rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-ink/90 active:bg-ink disabled:opacity-50'

export const btnPrimaryLg =
	'h-12 w-full rounded-lg bg-ink text-base font-semibold text-white transition hover:bg-ink/90 active:bg-ink disabled:opacity-50'

export const btnSecondary =
	'rounded-lg border border-ink/20 bg-white px-3 py-1.5 text-sm font-medium text-ink-soft transition hover:border-ink/40 hover:text-ink'

export const btnDanger =
	'rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50'

// La carte du portail : blanc sur papier, bord encre très dilué.
export const card = 'rounded-xl border border-ink/10 bg-white'

// Titre de page : la voix Elevatus (Saira Extra Condensed Black), en capitales.
export const pageTitle = 'font-saira text-4xl uppercase leading-none tracking-wide text-ink'
