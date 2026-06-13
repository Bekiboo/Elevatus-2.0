<script lang="ts" module>
	// Pictogrammes du portail — traits simples dessinés à la main (24×24),
	// pas de librairie d'icônes pour trois traits.
	const ICONS = {
		home: '<path d="m4 10 8-7 8 7v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/><path d="M9 21v-6h6v6"/>',
		field:
			'<rect x="8" y="3" width="8" height="4" rx="1"/><path d="M16 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"/><path d="M9 12h6"/><path d="M9 16h4"/>',
		children:
			'<circle cx="9" cy="8" r="3.5"/><path d="M3 20v-1a6 6 0 0 1 12 0v1"/><circle cx="17" cy="9" r="2.5"/><path d="M16.5 14.5a4.5 4.5 0 0 1 5 4.5v1"/>',
		school: '<path d="m3 10 9-6 9 6"/><path d="M5 9v11h14V9"/><path d="M10 20v-5h4v5"/>',
		meals: '<path d="M5 3v6a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V3"/><path d="M7 3v18"/><path d="M18 3a3 3 0 0 0-3 3v7h3zm0 0v18"/>',
		growth: '<path d="M7 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16z"/><path d="M12 7h5"/><path d="M14 11h3"/><path d="M12 15h5"/>',
		attendance:
			'<circle cx="9" cy="8" r="3.5"/><path d="M3 20v-1a6 6 0 0 1 12 0v1"/><path d="m15 10 2.5 2.5L22 8"/>',
		logout: '<path d="M9 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
		user: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20v-1a7 7 0 0 1 14 0v1"/>',
		team: '<circle cx="9" cy="8" r="3"/><path d="M2 20v-1a6 6 0 0 1 12 0v1"/><path d="M16 5.5a3 3 0 0 1 0 5.8"/><path d="M18 14.2a5.5 5.5 0 0 1 4 5.3V20"/>',
		key: '<circle cx="8" cy="12" r="4"/><path d="M11.5 11.5 21 2"/><path d="m18 5 2.5 2.5"/><path d="m15 8 2 2"/>',
		chart: '<path d="M4 4v16h16"/><path d="M9 17v-4"/><path d="M13.5 17V7"/><path d="M18 17v-7"/>',
		donations:
			'<path d="M12 20s-6.5-4.2-8.7-8.3A5.2 5.2 0 0 1 12 6.3a5.2 5.2 0 0 1 8.7 5.4C18.5 15.8 12 20 12 20z"/>',
		back: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
		search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.5-4.5"/>',
		plus: '<path d="M12 5v14"/><path d="M5 12h14"/>'
	} as const

	export type IconName = keyof typeof ICONS
</script>

<script lang="ts">
	let { name, size = 20 }: { name: IconName; size?: number } = $props()
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.8"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	<!-- eslint-disable-next-line svelte/no-at-html-tags — chaînes statiques internes, jamais de données -->
	{@html ICONS[name]}
</svg>
