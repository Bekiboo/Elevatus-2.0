<script lang="ts">
	import { enhance } from '$app/forms'
	import PageHeader from '$lib/components/portal/PageHeader.svelte'
	import SchoolChips from '$lib/components/portal/SchoolChips.svelte'
	import { btnPrimaryLg, card, input, label } from '$lib/portal/ui'
	import type { ActionData, PageData } from './$types'

	let { data, form }: { data: PageData; form: ActionData } = $props()

	// Préremplissage : l'entrée existante du jour sélectionné, sinon « servis ».
	// $derived writable : suit data.formEntry, mais reste modifiable par les radios.
	let served = $derived(data.formEntry ? (data.formEntry.served ? 'yes' : 'no') : 'yes')
</script>

<svelte:head>
	<title>Repas servis — Portail Elevatus</title>
</svelte:head>

<PageHeader title="Repas servis" back={{ href: '/portal/field', label: 'Saisie terrain' }} />

{#if data.schools.length === 0}
	<p class="rounded-xl border border-secondary/60 bg-secondary/15 p-4 text-sm text-ink">
		Ajoute d'abord une école dans <a href="/portal/schools" class="font-medium underline">Écoles</a>.
	</p>
{:else}
	<SchoolChips
		schools={data.schools}
		selectedId={data.selectedSchoolId}
		makeHref={(id) => `?ecole=${id}`}
	/>

	<div class="mt-4 grid items-start gap-6 lg:grid-cols-[24rem_1fr]">
		<!-- Saisie du jour -->
		<form method="POST" action="?/save" use:enhance class="{card} space-y-4 p-4 sm:p-5">
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
				<legend class={label}>Repas du jour</legend>
				<div class="mt-1.5 grid grid-cols-2 gap-2">
					<label
						class="flex h-12 cursor-pointer items-center justify-center rounded-lg border border-ink/20
						text-base text-ink-soft transition has-checked:border-emerald-600 has-checked:bg-emerald-50
						has-checked:font-semibold has-checked:text-emerald-700"
					>
						<input type="radio" name="served" value="yes" bind:group={served} class="sr-only" />
						✓ Servis
					</label>
					<label
						class="flex h-12 cursor-pointer items-center justify-center rounded-lg border border-ink/20
						text-base text-ink-soft transition has-checked:border-red-500 has-checked:bg-red-50
						has-checked:font-semibold has-checked:text-red-600"
					>
						<input type="radio" name="served" value="no" bind:group={served} class="sr-only" />
						✗ Pas de repas
					</label>
				</div>
			</fieldset>

			{#if served === 'yes'}
				<div>
					<label for="mealsCount" class={label}>
						Nombre de repas <span class="font-normal text-ink-soft/70">(si compté)</span>
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
					Notes <span class="font-normal text-ink-soft/70">(facultatif)</span>
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
		<section class="lg:max-w-md">
			<h2 class="text-xs font-semibold uppercase tracking-[0.15em] text-ink-soft">
				14 derniers jours
			</h2>
			<p class="mt-1 text-xs text-ink-soft/70">Touche un jour pour le corriger.</p>
			<ul class="mt-2 divide-y divide-ink/5 {card}">
				{#each data.days as day (day.date)}
					<li class="flex items-center justify-between px-4 py-3">
						<a
							href="?ecole={data.selectedSchoolId}&date={day.date}"
							class="flex-1 text-sm capitalize text-ink {day.date === data.today
								? 'font-semibold'
								: ''}"
						>
							{day.label}
							{#if day.date === data.today}
								<span class="ml-1.5 text-xs font-semibold normal-case text-brand-dark">
									aujourd'hui
								</span>
							{/if}
						</a>
						{#if day.entry}
							{#if day.entry.served}
								<span
									class="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700"
								>
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
									class="px-2 py-1 text-xs text-ink-soft/60 transition hover:text-red-500"
								>
									✕
								</button>
							</form>
						{:else}
							<span class="text-xs text-ink-soft/40">—</span>
						{/if}
					</li>
				{/each}
			</ul>
		</section>
	</div>
{/if}
