<script lang="ts">
	import { enhance } from '$app/forms'
	import SchoolChips from '$lib/components/portal/SchoolChips.svelte'
	import { btnPrimaryLg, input, label } from '$lib/portal/ui'
	import type { ActionData, PageData } from './$types'

	let { data, form }: { data: PageData; form: ActionData } = $props()

	// Préremplissage : l'entrée existante du jour sélectionné, sinon « servis ».
	// $derived writable : suit data.formEntry, mais reste modifiable par les radios.
	let served = $derived(data.formEntry ? (data.formEntry.served ? 'yes' : 'no') : 'yes')
</script>

<svelte:head>
	<title>Repas servis — Portail Elevatus</title>
</svelte:head>

<a href="/portal/field" class="text-sm text-slate-500 hover:underline">← Saisie terrain</a>
<h1 class="mt-1 text-2xl font-semibold text-slate-800">🍽️ Repas servis</h1>

{#if data.schools.length === 0}
	<p class="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
		Ajoute d'abord une école dans <a href="/portal/schools" class="underline">Écoles</a>.
	</p>
{:else}
	<div class="mt-4">
		<SchoolChips
			schools={data.schools}
			selectedId={data.selectedSchoolId}
			makeHref={(id) => `?ecole=${id}`}
		/>
	</div>

	<!-- Saisie du jour -->
	<form
		method="POST"
		action="?/save"
		use:enhance
		class="mt-4 space-y-4 rounded-xl border border-slate-200 bg-white p-4 sm:max-w-md sm:p-6"
	>
		<input type="hidden" name="schoolId" value={data.selectedSchoolId} />

		<div>
			<label for="date" class={label}>Date</label>
			<input
				id="date"
				name="date"
				type="date"
				value={data.formDate}
				max={data.today}
				required
				class="mt-1 {input}"
			/>
		</div>

		<fieldset>
			<legend class="text-sm font-medium text-slate-700">Repas du jour</legend>
			<div class="mt-2 grid grid-cols-2 gap-2">
				<label
					class="flex h-12 cursor-pointer items-center justify-center rounded-lg border text-base
					transition has-checked:border-emerald-600 has-checked:bg-emerald-50
					has-checked:font-semibold has-checked:text-emerald-700 border-slate-300 text-slate-600"
				>
					<input type="radio" name="served" value="yes" bind:group={served} class="sr-only" />
					✓ Servis
				</label>
				<label
					class="flex h-12 cursor-pointer items-center justify-center rounded-lg border text-base
					transition has-checked:border-red-500 has-checked:bg-red-50 has-checked:font-semibold
					has-checked:text-red-600 border-slate-300 text-slate-600"
				>
					<input type="radio" name="served" value="no" bind:group={served} class="sr-only" />
					✗ Pas de repas
				</label>
			</div>
		</fieldset>

		{#if served === 'yes'}
			<div>
				<label for="mealsCount" class={label}>
					Nombre de repas <span class="font-normal text-slate-400">(si compté)</span>
				</label>
				<input
					id="mealsCount"
					name="mealsCount"
					type="text"
					inputmode="numeric"
					pattern="[0-9]*"
					placeholder="ex. 132"
					value={data.formEntry?.mealsCount ?? ''}
					class="mt-1 {input}"
				/>
			</div>
		{/if}

		<div>
			<label for="notes" class={label}>
				Notes <span class="font-normal text-slate-400">(facultatif)</span>
			</label>
			<input
				id="notes"
				name="notes"
				value={data.formEntry?.notes ?? ''}
				placeholder="ex. école fermée, riz manquant…"
				class="mt-1 {input}"
			/>
		</div>

		{#if form?.formId === 'save' && 'error' in form && form.error}
			<p class="text-sm text-red-600" role="alert">{form.error}</p>
		{/if}

		<button type="submit" class={btnPrimaryLg}>Enregistrer</button>
	</form>

	<!-- Les 14 derniers jours -->
	<div class="mt-6 sm:max-w-md">
		<h2 class="text-sm font-medium uppercase tracking-wide text-slate-500">14 derniers jours</h2>
		<p class="mt-1 text-xs text-slate-400">Touche un jour pour le corriger.</p>
		<ul class="mt-2 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
			{#each data.days as day (day.date)}
				<li class="flex items-center justify-between px-4 py-3">
					<a
						href="?ecole={data.selectedSchoolId}&date={day.date}"
						class="flex-1 text-sm capitalize text-slate-700"
					>
						{day.label}
						{#if day.date === data.today}
							<span class="ml-1 text-xs text-slate-400">aujourd'hui</span>
						{/if}
					</a>
					{#if day.entry}
						{#if day.entry.served}
							<span class="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
								✓ {day.entry.mealsCount ?? 'servis'}
							</span>
						{:else}
							<span class="rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-600">
								✗ pas de repas
							</span>
						{/if}
						<form method="POST" action="?/delete" use:enhance class="ml-2">
							<input type="hidden" name="id" value={day.entry.id} />
							<input type="hidden" name="schoolId" value={data.selectedSchoolId} />
							<button
								type="submit"
								aria-label="Supprimer cette entrée"
								class="px-2 py-1 text-xs text-slate-400 hover:text-red-500"
							>
								✕
							</button>
						</form>
					{:else}
						<span class="text-xs text-slate-300">—</span>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
{/if}
