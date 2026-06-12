<script lang="ts">
	import { DateTime } from 'luxon'
	import { GENDER_LABELS } from '$lib/portal/constants'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	function age(birthDate: string | null): string {
		if (!birthDate) return '—'
		const years = Math.floor(-DateTime.fromISO(birthDate).diffNow('years').years)
		return `${years} ans`
	}
</script>

<svelte:head>
	<title>Enfants — Portail Elevatus</title>
</svelte:head>

<div class="flex flex-wrap items-end justify-between gap-4">
	<div>
		<h1 class="text-2xl font-semibold text-slate-800">Enfants</h1>
		<p class="mt-1 text-sm text-slate-500">
			{data.children.length} enfant{data.children.length > 1 ? 's' : ''}
			{#if data.currentYearLabel}
				· année scolaire {data.currentYearLabel}
			{/if}
		</p>
	</div>
	<a
		href="/portal/children/new"
		class="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition
		hover:bg-slate-700"
	>
		+ Ajouter un enfant
	</a>
</div>

<form method="GET" class="mt-6 flex flex-wrap items-center gap-3">
	<input
		type="search"
		name="q"
		value={data.q}
		placeholder="Rechercher par nom…"
		class="w-64 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm
		focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
	/>
	<label class="flex items-center gap-2 text-sm text-slate-600">
		<input type="checkbox" name="archives" value="1" checked={data.showArchived} />
		Afficher les archivés
	</label>
	<button
		type="submit"
		class="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-600
		transition hover:bg-slate-50"
	>
		Filtrer
	</button>
</form>

<div class="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
	<table class="w-full text-left text-sm">
		<thead class="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
			<tr>
				<th class="px-4 py-3">Nom</th>
				<th class="px-4 py-3">Genre</th>
				<th class="px-4 py-3">Âge</th>
				<th class="px-4 py-3">École</th>
				<th class="px-4 py-3">Classe</th>
				<th class="px-4 py-3">Parrainé</th>
			</tr>
		</thead>
		<tbody>
			{#each data.children as child (child.id)}
				<tr class="border-b border-slate-100 last:border-0 hover:bg-slate-50">
					<td class="px-4 py-3">
						<a href="/portal/children/{child.id}" class="font-medium text-slate-800 hover:underline">
							{child.fullName}
						</a>
						{#if child.preferredName}
							<span class="text-slate-400">({child.preferredName})</span>
						{/if}
						{#if child.archived}
							<span class="ml-1 rounded-full bg-slate-200 px-2 py-0.5 text-xs text-slate-600">
								archivé
							</span>
						{/if}
					</td>
					<td class="px-4 py-3 text-slate-600">
						{child.gender ? GENDER_LABELS[child.gender] : '—'}
					</td>
					<td class="px-4 py-3 text-slate-600">{age(child.birthDate)}</td>
					<td class="px-4 py-3 text-slate-600">{child.schoolName ?? '—'}</td>
					<td class="px-4 py-3 text-slate-600">{child.grade ?? '—'}</td>
					<td class="px-4 py-3">
						{#if child.isSponsored}
							<span class="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
								Oui
							</span>
						{:else}
							<span class="text-slate-400">—</span>
						{/if}
					</td>
				</tr>
			{:else}
				<tr>
					<td colspan="6" class="px-4 py-10 text-center text-slate-400">
						{data.q ? 'Aucun enfant ne correspond à la recherche.' : 'Aucun enfant pour le moment — ajoute le premier !'}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
