<script lang="ts">
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	const modules: { title: string; description: string; href?: string }[] = [
		{
			title: 'Enfants & parrainages',
			description: 'Dossiers élèves, scolarité, progression (indicateurs 1.1–1.3).',
			href: '/portal/children'
		},
		{
			title: 'Écoles',
			description: 'Les établissements partenaires où les enfants sont inscrits.',
			href: '/portal/schools'
		},
		{
			title: 'Saisie terrain',
			description: 'Repas, présences, mesures, enquêtes de confiance (indicateurs 2.x / 3.x).'
		},
		{
			title: 'Blog',
			description: 'Rédaction et publication des articles du site.'
		},
		{
			title: 'Dashboard · Stripe',
			description: 'Indicateurs agrégés, paiements et abonnements des donateurs.'
		},
		{
			title: 'Messages',
			description: 'Messages du formulaire de contact, traités directement ici (adieu SendGrid).'
		}
	]
</script>

<svelte:head>
	<title>Portail Elevatus</title>
</svelte:head>

<h1 class="text-2xl font-semibold text-slate-800">Bienvenue, {data.user.name}</h1>
<p class="mt-1 text-sm text-slate-500">
	Le portail remplace progressivement Kobo et les fichiers Excel. Les modules arrivent un par un.
</p>

<div class="mt-8 grid gap-4 sm:grid-cols-2">
	{#each modules as { title, description, href } (title)}
		{#if href}
			<a
				{href}
				class="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-400
				hover:shadow-sm"
			>
				<div class="flex items-center justify-between">
					<h2 class="font-medium text-slate-800">{title}</h2>
					<span class="text-slate-400">→</span>
				</div>
				<p class="mt-2 text-sm text-slate-500">{description}</p>
			</a>
		{:else}
			<div class="rounded-xl border border-slate-200 bg-white p-5 opacity-75">
				<div class="flex items-center justify-between">
					<h2 class="font-medium text-slate-800">{title}</h2>
					<span class="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
						À venir
					</span>
				</div>
				<p class="mt-2 text-sm text-slate-500">{description}</p>
			</div>
		{/if}
	{/each}
</div>
