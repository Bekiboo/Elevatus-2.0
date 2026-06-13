<script lang="ts">
	import Icon from '$lib/components/portal/Icon.svelte'
	import type { IconName } from '$lib/components/portal/Icon.svelte'
	import PageHeader from '$lib/components/portal/PageHeader.svelte'
	import { card } from '$lib/portal/ui'

	const tools: {
		href: string
		icon: IconName
		title: string
		description: string
		cadence: string
	}[] = [
		{
			href: '/portal/field/meals',
			icon: 'meals',
			title: 'Repas servis',
			description: 'Le registre quotidien de la cantine, école par école.',
			cadence: 'Chaque jour de cantine'
		},
		{
			href: '/portal/field/growth',
			icon: 'growth',
			title: 'Taille & poids',
			description: "Les mesures des enfants, l'IMC se calcule tout seul.",
			cadence: 'Chaque trimestre'
		},
		{
			href: '/portal/field/attendance',
			icon: 'attendance',
			title: 'Présences du centre',
			description: 'La moyenne de présence par classe : couture, informatique, tutorat.',
			cadence: 'Une fois par mois'
		},
		{
			href: '/portal/field/surveys',
			icon: 'survey',
			title: 'Enquêtes de confiance',
			description: 'Auto-évaluation des jeunes du centre, notée de 1 à 5.',
			cadence: 'Chaque trimestre'
		}
	]
</script>

<svelte:head>
	<title>Saisie terrain — Portail Elevatus</title>
</svelte:head>

<PageHeader
	title="Saisie terrain"
	sub="Les trois registres du quotidien. Tout fonctionne sur téléphone."
/>

<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
	{#each tools as { href, icon, title, description, cadence } (href)}
		<a
			{href}
			class="{card} group flex flex-col p-4 transition hover:border-ink/30 hover:shadow-sm active:bg-paper"
		>
			<span
				class="flex h-11 w-11 items-center justify-center rounded-lg bg-ink/5 text-ink transition
				group-hover:bg-ink group-hover:text-white"
			>
				<Icon name={icon} size={22} />
			</span>
			<h2 class="mt-3 font-semibold text-ink">{title}</h2>
			<p class="mt-1 flex-1 text-sm text-ink-soft">{description}</p>
			<p class="mt-3 text-xs font-medium uppercase tracking-wide text-ink-soft/70">{cadence}</p>
		</a>
	{/each}
</div>
