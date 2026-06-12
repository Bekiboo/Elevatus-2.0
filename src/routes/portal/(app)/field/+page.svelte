<script lang="ts">
	const tools = [
		{
			href: '/portal/field/meals',
			emoji: '🍽️',
			title: 'Repas servis',
			description: 'Le registre quotidien de la cantine, école par école.',
			cadence: 'Chaque jour de cantine'
		},
		{
			href: '/portal/field/growth',
			emoji: '📏',
			title: 'Taille & poids',
			description: "Les mesures des enfants, l'IMC se calcule tout seul.",
			cadence: 'Chaque trimestre'
		},
		{
			href: '/portal/field/attendance',
			emoji: '🧑‍🏫',
			title: 'Présences du centre',
			description: 'La moyenne de présence par classe : couture, informatique, tutorat.',
			cadence: 'Une fois par mois'
		}
	]
</script>

<svelte:head>
	<title>Saisie terrain — Portail Elevatus</title>
</svelte:head>

<h1 class="text-2xl font-semibold text-slate-800">Saisie terrain</h1>
<p class="mt-1 text-sm text-slate-500">
	Les trois registres du quotidien. Tout fonctionne sur téléphone.
</p>

<div class="mt-6 grid gap-4 sm:grid-cols-3">
	{#each tools as { href, emoji, title, description, cadence } (href)}
		<a
			{href}
			class="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-slate-400
			hover:shadow-sm active:bg-slate-50"
		>
			<div class="text-3xl">{emoji}</div>
			<h2 class="mt-3 font-medium text-slate-800">{title}</h2>
			<p class="mt-1 text-sm text-slate-500">{description}</p>
			<p class="mt-3 text-xs font-medium uppercase tracking-wide text-slate-400">{cadence}</p>
		</a>
	{/each}
</div>
