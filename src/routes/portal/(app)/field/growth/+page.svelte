<script lang="ts">
	import { enhance } from '$app/forms'
	import { DateTime } from 'luxon'
	import type { ActionData, PageData } from './$types'

	let { data, form }: { data: PageData; form: ActionData } = $props()

	function age(birthDate: string | null): string {
		if (!birthDate) return ''
		return `${Math.floor(-DateTime.fromISO(birthDate).diffNow('years').years)} ans`
	}

	function bmi(heightCm: string, weightKg: string): string {
		const h = Number(heightCm) / 100
		const w = Number(weightKg)
		if (!h || !w) return '—'
		return (w / (h * h)).toFixed(1)
	}

	function fmtDate(iso: string): string {
		return DateTime.fromISO(iso).setLocale('fr').toFormat('d LLL yyyy')
	}

	const input =
		'h-12 w-full rounded-lg border border-slate-300 px-3 text-base focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500'
</script>

<svelte:head>
	<title>Taille & poids — Portail Elevatus</title>
</svelte:head>

<a href="/portal/field" class="text-sm text-slate-500 hover:underline">← Saisie terrain</a>
<h1 class="mt-1 text-2xl font-semibold text-slate-800">📏 Taille & poids</h1>
{#if data.currentYearLabel}
	<p class="mt-1 text-sm text-slate-500">
		Enfants inscrits en {data.currentYearLabel}. L'IMC se calcule automatiquement.
	</p>
{/if}

{#if data.schools.length === 0}
	<p class="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
		Ajoute d'abord une école dans <a href="/portal/schools" class="underline">Écoles</a>.
	</p>
{:else}
	<div class="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1">
		{#each data.schools as school (school.id)}
			<a
				href="?ecole={school.id}&date={data.measureDate}"
				class="whitespace-nowrap rounded-full border px-4 py-2 text-sm transition
				{school.id === data.selectedSchoolId
					? 'border-slate-800 bg-slate-800 font-medium text-white'
					: 'border-slate-300 bg-white text-slate-600'}"
			>
				{school.name}
			</a>
		{/each}
	</div>

	<!-- Date de la séance de mesure -->
	<form method="GET" class="mt-4 flex items-end gap-2 sm:max-w-md">
		<input type="hidden" name="ecole" value={data.selectedSchoolId} />
		<div class="flex-1">
			<label for="date" class="block text-sm font-medium text-slate-700">Date des mesures</label>
			<input id="date" name="date" type="date" value={data.measureDate} max={data.today} class={input} />
		</div>
		<button
			type="submit"
			class="h-12 rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-600"
		>
			OK
		</button>
	</form>

	{#if data.children.length === 0}
		<p class="mt-6 text-sm text-slate-400">
			Aucun enfant inscrit dans cette école pour l'année en cours — les inscriptions se font sur la
			<a href="/portal/children" class="underline">fiche de chaque enfant</a>.
		</p>
	{:else}
		<div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.children as child (child.id)}
				<form
					method="POST"
					action="?/save"
					use:enhance
					class="rounded-xl border border-slate-200 bg-white p-4"
				>
					<input type="hidden" name="beneficiaryId" value={child.id} />
					<input type="hidden" name="measuredOn" value={data.measureDate} />

					<div class="flex items-baseline justify-between gap-2">
						<h2 class="font-medium text-slate-800">{child.fullName}</h2>
						<span class="text-xs text-slate-400">{child.grade}{child.birthDate ? ` · ${age(child.birthDate)}` : ''}</span>
					</div>
					<p class="mt-0.5 text-xs text-slate-400">
						{#if child.todays}
							Déjà mesuré ce jour-là (IMC {bmi(child.todays.heightCm, child.todays.weightKg)}) — corrige si besoin.
						{:else if child.last}
							Dernière mesure {fmtDate(child.last.measuredOn)} : {child.last.heightCm} cm ·
							{child.last.weightKg} kg · IMC {bmi(child.last.heightCm, child.last.weightKg)}
						{:else}
							Première mesure.
						{/if}
					</p>

					<div class="mt-3 flex items-end gap-2">
						<div class="flex-1">
							<label for="h-{child.id}" class="block text-xs font-medium text-slate-500">
								Taille (cm)
							</label>
							<input
								id="h-{child.id}"
								name="heightCm"
								type="text"
								inputmode="decimal"
								placeholder="142"
								value={child.todays?.heightCm ?? ''}
								required
								class={input}
							/>
						</div>
						<div class="flex-1">
							<label for="w-{child.id}" class="block text-xs font-medium text-slate-500">
								Poids (kg)
							</label>
							<input
								id="w-{child.id}"
								name="weightKg"
								type="text"
								inputmode="decimal"
								placeholder="33,5"
								value={child.todays?.weightKg ?? ''}
								required
								class={input}
							/>
						</div>
						<button
							type="submit"
							class="h-12 rounded-lg bg-slate-800 px-4 text-sm font-medium text-white transition
							hover:bg-slate-700 active:bg-slate-900"
						>
							OK
						</button>
					</div>

					{#if form?.formId === `g-${child.id}`}
						{#if 'error' in form && form.error}
							<p class="mt-2 text-sm text-red-600" role="alert">{form.error}</p>
						{:else}
							<p class="mt-2 text-sm text-emerald-600">Enregistré ✓</p>
						{/if}
					{/if}
				</form>
			{/each}
		</div>
	{/if}
{/if}
