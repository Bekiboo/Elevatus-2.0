<script lang="ts">
	import { enhance } from '$app/forms'
	import Icon from '$lib/components/portal/Icon.svelte'
	import PageHeader from '$lib/components/portal/PageHeader.svelte'
	import { age } from '$lib/portal/format'
	import { SURVEY_QUESTIONS, SURVEY_SCALE, SURVEY_TERMS, termLabel } from '$lib/portal/surveys'
	import { btnSecondary, card, input, label } from '$lib/portal/ui'
	import type { ActionData, PageData } from './$types'

	let { data, form }: { data: PageData; form: ActionData } = $props()

	let query = $state('')
	const filtered = $derived(
		query.trim()
			? data.youth.filter((y) => y.fullName.toLowerCase().includes(query.trim().toLowerCase()))
			: data.youth
	)

	function isDone(scores: Record<string, number>): boolean {
		return SURVEY_QUESTIONS.every((q) => scores[q.key] != null)
	}

	function rowState(id: string): 'ok' | 'error' | null {
		if (!form || !('formId' in form) || form.formId !== `s-${id}`) return null
		return 'error' in form && form.error ? 'error' : 'success' in form && form.success ? 'ok' : null
	}
	function rowError(id: string): string | null {
		return form && 'error' in form && form.formId === `s-${id}` ? (form.error ?? null) : null
	}
</script>

<svelte:head>
	<title>Enquêtes de confiance — Portail Elevatus</title>
</svelte:head>

<PageHeader
	title="Enquêtes de confiance"
	sub="Auto-évaluation des jeunes du centre, une fois par trimestre (indicateurs 2.2–2.4)."
	back={{ href: '/portal/field', label: 'Saisie terrain' }}
>
	{#snippet actions()}
		<a href="/portal/kiosk" class="{btnSecondary} flex items-center gap-1.5">
			<Icon name="survey" size={16} />
			Mode kiosque
		</a>
	{/snippet}
</PageHeader>

{#if !data.selectedYearId}
	<p class="rounded-xl border border-secondary/60 bg-secondary/15 p-4 text-sm text-ink">
		Aucune année scolaire n'est encore définie.
	</p>
{:else}
	<!-- Année + trimestre -->
	<form method="GET" class="flex flex-wrap items-end gap-2">
		<div>
			<label for="annee" class={label}>Année scolaire</label>
			<select id="annee" name="annee" class="mt-1 {input}">
				{#each data.years as y (y.id)}
					<option value={y.id} selected={y.id === data.selectedYearId}>{y.label}</option>
				{/each}
			</select>
		</div>
		<div>
			<label for="trim" class={label}>Trimestre</label>
			<select id="trim" name="trim" class="mt-1 {input}">
				{#each SURVEY_TERMS as t (t.value)}
					<option value={t.value} selected={t.value === data.term}>{t.label}</option>
				{/each}
			</select>
		</div>
		<button type="submit" class="h-12 px-4 {btnSecondary}">Afficher</button>
	</form>

	<!-- État d'avancement du trimestre -->
	<p class="mt-4 text-sm text-ink-soft">
		<span class="font-medium text-ink">{termLabel(data.term)}</span> —
		{data.doneCount}/{data.youth.length} jeune{data.youth.length > 1 ? 's' : ''} évalué{data.doneCount >
		1
			? 's'
			: ''}.
	</p>

	<!-- Recherche par nom -->
	<div class="relative mt-3 sm:max-w-sm">
		<span class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft">
			<Icon name="search" size={18} />
		</span>
		<input
			type="search"
			bind:value={query}
			placeholder="Chercher un jeune…"
			class="{input} pl-10"
		/>
	</div>

	{#if filtered.length === 0}
		<p class="mt-6 text-sm text-ink-soft">
			{data.youth.length === 0
				? 'Aucun jeune enregistré — ajoute des fiches dans Enfants.'
				: 'Aucun jeune ne correspond à cette recherche.'}
		</p>
	{:else}
		<div class="mt-4 grid gap-3 lg:grid-cols-2">
			{#each filtered as youth (youth.id)}
				{@const done = isDone(youth.scores)}
				{@const state = rowState(youth.id)}
				{@const err = rowError(youth.id)}
				<form method="POST" action="?/save" use:enhance class="{card} p-4">
					<input type="hidden" name="beneficiaryId" value={youth.id} />
					<input type="hidden" name="schoolYearId" value={data.selectedYearId} />
					<input type="hidden" name="term" value={data.term} />

					<div class="flex items-baseline justify-between gap-2">
						<h2 class="font-semibold text-ink">{youth.fullName}</h2>
						<span class="flex items-center gap-2 text-xs text-ink-soft">
							{#if youth.birthDate}{age(youth.birthDate)}{/if}
							{#if done}
								<span class="rounded-full bg-emerald-100 px-2 py-0.5 font-medium text-emerald-700">
									Évalué
								</span>
							{/if}
						</span>
					</div>

					<div class="mt-3 space-y-4">
						{#each SURVEY_QUESTIONS as q (q.key)}
							<fieldset>
								<legend class="text-sm text-ink">{q.statement}</legend>
								<div class="mt-2 flex gap-1.5">
									{#each SURVEY_SCALE as s (s.value)}
										<label
											class="flex flex-1 cursor-pointer flex-col items-center gap-0.5 rounded-lg border
											border-ink/15 py-2 transition hover:border-ink/40
											has-[:checked]:border-brand has-[:checked]:bg-brand/10 has-[:checked]:ring-1
											has-[:checked]:ring-brand"
										>
											<input
												type="radio"
												name="score-{q.key}"
												value={s.value}
												checked={youth.scores[q.key] === s.value}
												class="sr-only"
												aria-label="{s.value} — {s.label}"
												required
											/>
											<span class="text-xl leading-none" aria-hidden="true">{s.face}</span>
											<span class="text-xs font-medium text-ink-soft">{s.value}</span>
										</label>
									{/each}
								</div>
							</fieldset>
						{/each}
					</div>

					<div class="mt-4 flex items-center justify-between gap-3">
						<button
							type="submit"
							class="h-11 rounded-lg bg-ink px-5 text-sm font-semibold text-white transition
							hover:bg-ink/90 active:bg-ink"
						>
							{done ? 'Mettre à jour' : 'Enregistrer'}
						</button>
						{#if state === 'ok'}
							<span class="text-sm font-medium text-emerald-600">Enregistré ✓</span>
						{:else if err}
							<span class="text-sm text-red-600" role="alert">{err}</span>
						{/if}
					</div>
				</form>
			{/each}
		</div>

		<p class="mt-4 text-xs text-ink-soft/70">
			L'échelle va de 1 (pas du tout) à 5 (tout à fait). Re-saisir corrige une réponse, sans
			doublon. Un mode kiosque (le jeune répond lui-même) arrivera ensuite.
		</p>
	{/if}
{/if}
