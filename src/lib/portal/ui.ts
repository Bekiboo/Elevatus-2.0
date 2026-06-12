// Classes Tailwind partagées du portail — une seule source pour le style des
// formulaires (un changement de focus/erreur/dark-mode = un seul fichier).

// Champs de saisie terrain : hauteur tactile (44px+) et text-base (pas de zoom iOS).
export const input =
	'h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-base focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500'

// Variante compacte pour les écrans denses (tables, formulaires desktop).
export const inputSm =
	'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500'

export const label = 'block text-sm font-medium text-slate-700'
export const labelXs = 'block text-xs font-medium text-slate-500'

export const btnPrimary =
	'rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 active:bg-slate-900 disabled:opacity-50'

export const btnPrimaryLg =
	'h-12 w-full rounded-lg bg-slate-800 text-base font-medium text-white transition hover:bg-slate-700 active:bg-slate-900 disabled:opacity-50'

export const btnSecondary =
	'rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-600 transition hover:bg-slate-50'

export const btnDanger =
	'rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 transition hover:bg-red-50'
