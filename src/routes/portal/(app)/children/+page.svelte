<script lang="ts">
	import PageHeader from '$lib/components/portal/PageHeader.svelte'
	import { GENDER_LABELS } from '$lib/portal/constants'
	import { age } from '$lib/portal/format'
	import { btnPrimary, btnSecondary, card, inputSm } from '$lib/portal/ui'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	const counter = $derived(
		`${data.children.length} enfant${data.children.length > 1 ? 's' : ''}` +
			(data.currentYearLabel ? ` · année scolaire ${data.currentYearLabel}` : '')
	)
</script>

<svelte:head>
	<title>Enfants — Portail Elevatus</title>
</svelte:head>

<PageHeader title="Enfants" sub={counter}>
	{#snippet actions()}
		<a href="/portal/children/new" class={btnPrimary}>+ Ajouter un enfant</a>
	{/snippet}
</PageHeader>

<form method="GET" class="flex flex-wrap items-center gap-3">
	<input
		type="search"
		name="q"
		value={data.q}
		placeholder="Rechercher par nom…"
		class="{inputSm} max-w-64"
	/>
	<label class="flex items-center gap-2 text-sm text-ink-soft">
		<input type="checkbox" name="archives" value="1" checked={data.showArchived} />
		Afficher les archivés
	</label>
	<button type="submit" class={btnSecondary}>Filtrer</button>
</form>

<!-- Mobile : une carte par enfant, lisible au pouce -->
<ul class="mt-4 space-y-2 sm:hidden">
	{#each data.children as child (child.id)}
		<li>
			<a href="/portal/children/{child.id}" class="{card} block p-4 active:bg-paper">
				<div class="flex items-center justify-between gap-2">
					<span class="font-semibold text-ink">
						{child.fullName}
						{#if child.preferredName}
							<span class="font-normal text-ink-soft">({child.preferredName})</span>
						{/if}
					</span>
					<span class="flex shrink-0 items-center gap-1.5">
						{#if child.isSponsored}
							<span class="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
								Parrainé
							</span>
						{/if}
						{#if child.archived}
							<span class="rounded-full bg-ink/10 px-2 py-0.5 text-xs text-ink-soft">archivé</span>
						{/if}
					</span>
				</div>
				<p class="mt-1 text-sm text-ink-soft">
					{child.gender ? GENDER_LABELS[child.gender] : '—'} · {age(child.birthDate)}
					{#if child.schoolName}
						· {child.schoolName}{child.grade ? ` · ${child.grade}` : ''}
					{/if}
				</p>
			</a>
		</li>
	{:else}
		<li class="{card} p-8 text-center text-sm text-ink-soft">
			{data.q
				? 'Aucun enfant ne correspond à la recherche.'
				: 'Aucun enfant pour le moment — ajoute le premier !'}
		</li>
	{/each}
</ul>

<!-- Desktop : la table complète -->
<div class="mt-4 hidden overflow-x-auto sm:block {card}">
	<table class="w-full text-left text-sm">
		<thead class="border-b border-ink/10 text-xs uppercase tracking-wide text-ink-soft">
			<tr>
				<th class="px-4 py-3 font-medium">Nom</th>
				<th class="px-4 py-3 font-medium">Genre</th>
				<th class="px-4 py-3 font-medium">Âge</th>
				<th class="px-4 py-3 font-medium">École</th>
				<th class="px-4 py-3 font-medium">Classe</th>
				<th class="px-4 py-3 font-medium">Parrainé</th>
			</tr>
		</thead>
		<tbody>
			{#each data.children as child (child.id)}
				<tr class="border-b border-ink/5 last:border-0 hover:bg-paper">
					<td class="px-4 py-3">
						<a href="/portal/children/{child.id}" class="font-medium text-ink hover:underline">
							{child.fullName}
						</a>
						{#if child.preferredName}
							<span class="text-ink-soft">({child.preferredName})</span>
						{/if}
						{#if child.archived}
							<span class="ml-1 rounded-full bg-ink/10 px-2 py-0.5 text-xs text-ink-soft">
								archivé
							</span>
						{/if}
					</td>
					<td class="px-4 py-3 text-ink-soft">
						{child.gender ? GENDER_LABELS[child.gender] : '—'}
					</td>
					<td class="px-4 py-3 text-ink-soft">{age(child.birthDate)}</td>
					<td class="px-4 py-3 text-ink-soft">{child.schoolName ?? '—'}</td>
					<td class="px-4 py-3 text-ink-soft">{child.grade ?? '—'}</td>
					<td class="px-4 py-3">
						{#if child.isSponsored}
							<span class="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
								Oui
							</span>
						{:else}
							<span class="text-ink-soft/50">—</span>
						{/if}
					</td>
				</tr>
			{:else}
				<tr>
					<td colspan="6" class="px-4 py-10 text-center text-ink-soft">
						{data.q
							? 'Aucun enfant ne correspond à la recherche.'
							: 'Aucun enfant pour le moment — ajoute le premier !'}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
