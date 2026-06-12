<script lang="ts">
	import { enhance } from '$app/forms'
	import { DateTime } from 'luxon'
	import type { ActionData, PageData } from './$types'

	let { data, form }: { data: PageData; form: ActionData } = $props()

	function monthLabel(m: string): string {
		return DateTime.fromFormat(m, 'yyyy-MM').setLocale('fr').toFormat('LLLL yyyy')
	}

	function occupancy(avg: string | number, capacity: number): number {
		return Math.round((Number(avg) / capacity) * 100)
	}

	const input =
		'h-12 w-full rounded-lg border border-slate-300 px-3 text-base focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500'
</script>

<svelte:head>
	<title>Présences du centre — Portail Elevatus</title>
</svelte:head>

<a href="/portal/field" class="text-sm text-slate-500 hover:underline">← Saisie terrain</a>
<h1 class="mt-1 text-2xl font-semibold text-slate-800">🧑‍🏫 Présences du centre</h1>
<p class="mt-1 text-sm text-slate-500">
	Une fois par mois : la moyenne de présence par classe, d'après les feuilles d'appel.
</p>

<form method="GET" class="mt-4 flex items-end gap-2 sm:max-w-md">
	<div class="flex-1">
		<label for="mois" class="block text-sm font-medium text-slate-700">Mois</label>
		<input
			id="mois"
			name="mois"
			type="month"
			value={data.month}
			max={data.currentMonth}
			class={input}
		/>
	</div>
	<button
		type="submit"
		class="h-12 rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-600"
	>
		OK
	</button>
</form>

<div class="mt-4 grid gap-3 sm:grid-cols-3 sm:max-w-3xl">
	{#each data.courses as course (course.id)}
		{@const entry = data.entries[course.id]}
		<form
			method="POST"
			action="?/save"
			use:enhance
			class="rounded-xl border border-slate-200 bg-white p-4"
		>
			<input type="hidden" name="courseId" value={course.id} />
			<input type="hidden" name="month" value={data.month} />

			<div class="flex items-baseline justify-between">
				<h2 class="font-medium text-slate-800">{course.name}</h2>
				<span class="text-xs text-slate-400">{course.capacity} places</span>
			</div>

			{#if entry}
				<p class="mt-0.5 text-xs text-emerald-600">
					{monthLabel(data.month)} : {entry.averageAttendance} présents en moyenne
					({occupancy(entry.averageAttendance, course.capacity)} % de remplissage)
				</p>
			{:else}
				<p class="mt-0.5 text-xs text-slate-400">Pas encore saisi pour {monthLabel(data.month)}.</p>
			{/if}

			<div class="mt-3 space-y-2">
				<div>
					<label for="avg-{course.id}" class="block text-xs font-medium text-slate-500">
						Présence moyenne
					</label>
					<input
						id="avg-{course.id}"
						name="averageAttendance"
						type="text"
						inputmode="decimal"
						placeholder="ex. 18"
						value={entry?.averageAttendance ?? ''}
						required
						class={input}
					/>
				</div>
				<div>
					<label for="sess-{course.id}" class="block text-xs font-medium text-slate-500">
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
						class={input}
					/>
				</div>
				<button
					type="submit"
					class="h-12 w-full rounded-lg bg-slate-800 text-sm font-medium text-white transition
					hover:bg-slate-700 active:bg-slate-900"
				>
					Enregistrer
				</button>
			</div>

			{#if form?.formId === `a-${course.id}`}
				{#if 'error' in form && form.error}
					<p class="mt-2 text-sm text-red-600" role="alert">{form.error}</p>
				{:else}
					<p class="mt-2 text-sm text-emerald-600">Enregistré ✓</p>
				{/if}
			{/if}
		</form>
	{/each}
</div>

{#if data.history.length > 0}
	<div class="mt-8 sm:max-w-3xl">
		<h2 class="text-sm font-medium uppercase tracking-wide text-slate-500">Historique</h2>
		<div class="mt-2 overflow-x-auto rounded-xl border border-slate-200 bg-white">
			<table class="w-full text-left text-sm">
				<thead class="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
					<tr>
						<th class="px-4 py-2.5">Mois</th>
						{#each data.courses as course (course.id)}
							<th class="px-4 py-2.5">{course.name}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each data.history as row (row.month)}
						<tr class="border-b border-slate-100 capitalize last:border-0">
							<td class="px-4 py-2.5 font-medium text-slate-700">{monthLabel(row.month)}</td>
							{#each data.courses as course (course.id)}
								<td class="px-4 py-2.5 text-slate-600">
									{#if row.byCourse[course.id]}
										{row.byCourse[course.id]}
										<span class="text-xs text-slate-400">
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
	</div>
{/if}
