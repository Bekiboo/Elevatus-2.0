<script lang="ts">
	import { enhance } from '$app/forms'
	import PageHeader from '$lib/components/portal/PageHeader.svelte'
	import SchoolChips from '$lib/components/portal/SchoolChips.svelte'
	import { age, bmi, fmtDate } from '$lib/portal/format'
	import { btnSecondary, card, input, label, labelXs } from '$lib/portal/ui'
	import type { ActionData, PageData } from './$types'

	let { data, form }: { data: PageData; form: ActionData } = $props()
</script>

<svelte:head>
	<title>Taille & poids — Portail Elevatus</title>
</svelte:head>

<PageHeader
	title="Taille & poids"
	sub={data.currentYearLabel
		? `Enfants inscrits en ${data.currentYearLabel}. L'IMC se calcule automatiquement.`
		: undefined}
	back={{ href: '/portal/field', label: 'Saisie terrain' }}
/>

{#if data.schools.length === 0}
	<p class="rounded-xl border border-secondary/60 bg-secondary/15 p-4 text-sm text-ink">
		Ajoute d'abord une école dans <a href="/portal/schools" class="font-medium underline">Écoles</a>.
	</p>
{:else}
	<SchoolChips
		schools={data.schools}
		selectedId={data.selectedSchoolId}
		makeHref={(id) => `?ecole=${id}&date=${data.measureDate}`}
	/>

	<!-- Date de la séance de mesure -->
	<form method="GET" class="mt-4 flex items-end gap-2 sm:max-w-md">
		<input type="hidden" name="ecole" value={data.selectedSchoolId} />
		<div class="flex-1">
			<label for="date" class={label}>Date des mesures</label>
			<input
				id="date"
				name="date"
				type="date"
				value={data.measureDate}
				max={data.today}
				class="mt-1 {input}"
			/>
		</div>
		<button type="submit" class="h-12 px-4 {btnSecondary}">Afficher</button>
	</form>

	{#if data.children.length === 0}
		<p class="mt-6 text-sm text-ink-soft">
			Aucun enfant inscrit dans cette école pour l'année en cours — les inscriptions se font sur la
			<a href="/portal/children" class="underline">fiche de chaque enfant</a>.
		</p>
	{:else}
		<div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.children as child (child.id)}
				<form method="POST" action="?/save" use:enhance class="{card} p-4">
					<input type="hidden" name="beneficiaryId" value={child.id} />
					<input type="hidden" name="measuredOn" value={data.measureDate} />

					<div class="flex items-baseline justify-between gap-2">
						<h2 class="font-semibold text-ink">{child.fullName}</h2>
						<span class="text-xs text-ink-soft">
							{child.grade}{child.birthDate ? ` · ${age(child.birthDate)}` : ''}
						</span>
					</div>
					<p class="mt-0.5 text-xs text-ink-soft/80">
						{#if child.todays}
							Déjà mesuré ce jour-là (IMC {bmi(child.todays.heightCm, child.todays.weightKg)}) —
							corrige si besoin.
						{:else if child.last}
							Dernière mesure {fmtDate(child.last.measuredOn)} : {child.last.heightCm} cm ·
							{child.last.weightKg} kg · IMC {bmi(child.last.heightCm, child.last.weightKg)}
						{:else}
							Première mesure.
						{/if}
					</p>

					<div class="mt-3 flex items-end gap-2">
						<div class="flex-1">
							<label for="h-{child.id}" class={labelXs}>Taille (cm)</label>
							<input
								id="h-{child.id}"
								name="heightCm"
								type="text"
								inputmode="decimal"
								placeholder="142"
								value={child.todays?.heightCm ?? ''}
								required
								class="mt-1 {input}"
							/>
						</div>
						<div class="flex-1">
							<label for="w-{child.id}" class={labelXs}>Poids (kg)</label>
							<input
								id="w-{child.id}"
								name="weightKg"
								type="text"
								inputmode="decimal"
								placeholder="33,5"
								value={child.todays?.weightKg ?? ''}
								required
								class="mt-1 {input}"
							/>
						</div>
						<button
							type="submit"
							class="h-12 rounded-lg bg-ink px-4 text-sm font-semibold text-white transition
							hover:bg-ink/90 active:bg-ink"
						>
							OK
						</button>
					</div>

					{#if form?.formId === `g-${child.id}`}
						{#if 'error' in form && form.error}
							<p class="mt-2 text-sm text-red-600" role="alert">{form.error}</p>
						{:else}
							<p class="mt-2 text-sm font-medium text-emerald-600">Enregistré ✓</p>
						{/if}
					{/if}
				</form>
			{/each}
		</div>
	{/if}
{/if}
