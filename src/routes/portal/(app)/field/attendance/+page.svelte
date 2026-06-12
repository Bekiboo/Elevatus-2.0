<script lang="ts">
	import { enhance } from '$app/forms'
	import PageHeader from '$lib/components/portal/PageHeader.svelte'
	import { monthLabel } from '$lib/portal/format'
	import { btnSecondary, card, input, label, labelXs } from '$lib/portal/ui'
	import type { ActionData, PageData } from './$types'

	let { data, form }: { data: PageData; form: ActionData } = $props()

	function occupancy(avg: string | number, capacity: number): number {
		return Math.round((Number(avg) / capacity) * 100)
	}
</script>

<svelte:head>
	<title>Présences du centre — Portail Elevatus</title>
</svelte:head>

<PageHeader
	title="Présences du centre"
	sub="Une fois par mois : la moyenne de présence par classe, d'après les feuilles d'appel."
	back={{ href: '/portal/field', label: 'Saisie terrain' }}
/>

<form method="GET" class="flex items-end gap-2 sm:max-w-md">
	<div class="flex-1">
		<label for="mois" class={label}>Mois</label>
		<input
			id="mois"
			name="mois"
			type="month"
			value={data.month}
			max={data.currentMonth}
			class="mt-1 {input}"
		/>
	</div>
	<button type="submit" class="h-12 px-4 {btnSecondary}">Afficher</button>
</form>

<div class="mt-4 grid gap-3 sm:max-w-3xl sm:grid-cols-3">
	{#each data.courses as course (course.id)}
		{@const entry = data.entries[course.id]}
		<form method="POST" action="?/save" use:enhance class="{card} p-4">
			<input type="hidden" name="courseId" value={course.id} />
			<input type="hidden" name="month" value={data.month} />

			<div class="flex items-baseline justify-between">
				<h2 class="font-semibold text-ink">{course.name}</h2>
				<span class="text-xs text-ink-soft">{course.capacity} places</span>
			</div>

			{#if entry}
				<p class="mt-0.5 text-xs font-medium text-emerald-600">
					{monthLabel(data.month)} : {entry.averageAttendance} présents en moyenne
					({occupancy(entry.averageAttendance, course.capacity)} % de remplissage)
				</p>
			{:else}
				<p class="mt-0.5 text-xs text-ink-soft/80">Pas encore saisi pour {monthLabel(data.month)}.</p>
			{/if}

			<div class="mt-3 space-y-2">
				<div>
					<label for="avg-{course.id}" class={labelXs}>Présence moyenne</label>
					<input
						id="avg-{course.id}"
						name="averageAttendance"
						type="text"
						inputmode="decimal"
						placeholder="ex. 18"
						value={entry?.averageAttendance ?? ''}
						required
						class="mt-1 {input}"
					/>
				</div>
				<div>
					<label for="sess-{course.id}" class={labelXs}>
						Séances tenues <span class="font-normal">(facultatif)</span>
					</label>
					<input
						id="sess-{course.id}"
						name="sessionsHeld"
						type="text"
						inputmode="numeric"
						pattern="[0-9]*"
						placeholder="ex. 8"
						value={entry?.sessionsHeld ?? ''}
						class="mt-1 {input}"
					/>
				</div>
				<button
					type="submit"
					class="h-12 w-full rounded-lg bg-ink text-sm font-semibold text-white transition
					hover:bg-ink/90 active:bg-ink"
				>
					Enregistrer
				</button>
			</div>

			{#if form?.formId === `a-${course.id}`}
				{#if 'error' in form && form.error}
					<p class="mt-2 text-sm text-red-600" role="alert">{form.error}</p>
				{:else}
					<p class="mt-2 text-sm font-medium text-emerald-600">Enregistré ✓</p>
				{/if}
			{/if}
		</form>
	{/each}
</div>

{#if data.history.length > 0}
	<section class="mt-8 sm:max-w-3xl">
		<h2 class="text-xs font-semibold uppercase tracking-[0.15em] text-ink-soft">Historique</h2>
		<div class="mt-2 overflow-x-auto {card}">
			<table class="w-full text-left text-sm">
				<thead class="border-b border-ink/10 text-xs uppercase tracking-wide text-ink-soft">
					<tr>
						<th class="px-4 py-2.5 font-medium">Mois</th>
						{#each data.courses as course (course.id)}
							<th class="px-4 py-2.5 font-medium">{course.name}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each data.history as row (row.month)}
						<tr class="border-b border-ink/5 capitalize last:border-0">
							<td class="px-4 py-2.5 font-medium text-ink">{monthLabel(row.month)}</td>
							{#each data.courses as course (course.id)}
								<td class="px-4 py-2.5 text-ink-soft">
									{#if row.byCourse[course.id]}
										{row.byCourse[course.id]}
										<span class="text-xs text-ink-soft/70">
											({occupancy(row.byCourse[course.id], course.capacity)} %)
										</span>
									{:else}
										—
									{/if}
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>
{/if}
