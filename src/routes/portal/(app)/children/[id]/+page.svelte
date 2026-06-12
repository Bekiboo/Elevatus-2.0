<script lang="ts">
	import { enhance } from '$app/forms'
	import PageHeader from '$lib/components/portal/PageHeader.svelte'
	import { GRADES } from '$lib/portal/constants'
	import { btnDanger, btnPrimary, btnSecondary, card, inputSm, label } from '$lib/portal/ui'
	import type { ActionData, PageData } from './$types'

	let { data, form }: { data: PageData; form: ActionData } = $props()

	const input = `mt-1 ${inputSm}`
	const select =
		'rounded-lg border border-ink/20 bg-white px-2 py-1 text-sm text-ink focus:border-ink focus:outline-none'

	const isAdmin = $derived(data.user.role === 'admin')

	// Années pas encore utilisées pour ce enfant, pour le formulaire d'ajout
	const availableYears = $derived(
		data.years.filter((y) => !data.enrollments.some((e) => e.schoolYearId === y.id))
	)

	function triValue(v: boolean | null): string {
		return v === null ? '' : v ? 'yes' : 'no'
	}
</script>

<svelte:head>
	<title>{data.child.fullName} — Portail Elevatus</title>
</svelte:head>

<PageHeader
	title={data.child.fullName}
	sub={data.child.archived ? 'Fiche archivée' : undefined}
	back={{ href: '/portal/children', label: 'Enfants' }}
>
	{#snippet actions()}
		<form method="POST" action="?/toggleArchive" use:enhance>
			<button type="submit" class={btnSecondary}>
				{data.child.archived ? 'Restaurer' : 'Archiver'}
			</button>
		</form>
		<!-- Suppression définitive : action admin (le serveur le garantit aussi) -->
		{#if isAdmin}
			<form
				method="POST"
				action="?/delete"
				onsubmit={(e) => {
					if (!confirm('Supprimer définitivement cette fiche et toute sa scolarité ?')) {
						e.preventDefault()
					}
				}}
			>
				<button type="submit" class={btnDanger}>Supprimer</button>
			</form>
		{/if}
	{/snippet}
</PageHeader>

<div class="grid items-start gap-6 lg:grid-cols-[24rem_1fr]">
	<!-- Identité -->
	<form method="POST" action="?/update" use:enhance class="{card} space-y-4 p-5 sm:p-6">
		<h2 class="font-semibold text-ink">Identité</h2>
		<div>
			<label for="fullName" class={label}>Nom complet *</label>
			<input id="fullName" name="fullName" required value={data.child.fullName} class={input} />
		</div>
		<div>
			<label for="preferredName" class={label}>Nom d'usage / surnom</label>
			<input
				id="preferredName"
				name="preferredName"
				value={data.child.preferredName ?? ''}
				class={input}
			/>
		</div>
		<div class="grid grid-cols-2 gap-4">
			<div>
				<label for="gender" class={label}>Genre</label>
				<select id="gender" name="gender" class={input}>
					<option value="">—</option>
					<option value="female" selected={data.child.gender === 'female'}>Fille</option>
					<option value="male" selected={data.child.gender === 'male'}>Garçon</option>
				</select>
			</div>
			<div>
				<label for="birthDate" class={label}>Date de naissance</label>
				<input
					id="birthDate"
					name="birthDate"
					type="date"
					value={data.child.birthDate ?? ''}
					class={input}
				/>
			</div>
		</div>
		<div>
			<label for="notes" class={label}>Notes</label>
			<textarea id="notes" name="notes" rows="3" class={input}>{data.child.notes ?? ''}</textarea>
		</div>

		{#if form?.formId === 'update'}
			{#if 'error' in form && form.error}
				<p class="text-sm text-red-600" role="alert">{form.error}</p>
			{:else}
				<p class="text-sm font-medium text-emerald-600">Enregistré ✓</p>
			{/if}
		{/if}

		<button type="submit" class={btnPrimary}>Enregistrer</button>
	</form>

	<!-- Scolarité -->
	<div class="space-y-4">
		<div class="{card} p-5 sm:p-6">
			<h2 class="font-semibold text-ink">Scolarité</h2>
			<p class="mt-1 text-xs text-ink-soft/80">
				« Année validée » et « Passage » se remplissent en fin d'année, à réception des bulletins
				(indicateurs 1.1 et 1.2).
			</p>

			{#if data.enrollments.length === 0}
				<p class="mt-4 text-sm text-ink-soft">Aucune inscription pour le moment.</p>
			{:else}
				<div class="mt-4 overflow-x-auto">
					<table class="w-full text-left text-sm">
						<thead class="text-xs uppercase tracking-wide text-ink-soft">
							<tr>
								<th class="py-2 pr-3 font-medium">Année</th>
								<th class="py-2 pr-3 font-medium">École</th>
								<th class="py-2 pr-3 font-medium">Classe</th>
								<th class="py-2 pr-3 font-medium">Parrainé</th>
								<th class="py-2 pr-3 font-medium">Année validée</th>
								<th class="py-2 pr-3 font-medium">Passage</th>
								<th class="py-2"></th>
							</tr>
						</thead>
						<tbody>
							{#each data.enrollments as e (e.id)}
								<tr class="border-t border-ink/5">
									<td class="py-2 pr-3 font-medium text-ink">{e.yearLabel}</td>
									<td class="py-2 pr-3 text-ink-soft">{e.schoolName}</td>
									<td class="py-2 pr-3 text-ink-soft">{e.grade}</td>
									<td class="py-2 pr-3">
										{#if e.isSponsored}
											<span
												class="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700"
											>
												Oui
											</span>
										{:else}
											<span class="text-ink-soft/50">—</span>
										{/if}
									</td>
									<td class="py-2 pr-3" colspan="2">
										<form
											method="POST"
											action="?/updateOutcome"
											use:enhance
											class="flex items-center gap-2"
										>
											<input type="hidden" name="enrollmentId" value={e.id} />
											<select name="completedYear" class={select} value={triValue(e.completedYear)}>
												<option value="">?</option>
												<option value="yes">Oui</option>
												<option value="no">Non</option>
											</select>
											<select name="promoted" class={select} value={triValue(e.promoted)}>
												<option value="">?</option>
												<option value="yes">Oui</option>
												<option value="no">Non</option>
											</select>
											<button
												type="submit"
												class="rounded-lg border border-ink/20 px-2 py-1 text-xs font-medium
												text-ink-soft transition hover:border-ink/40 hover:text-ink"
											>
												OK
											</button>
											{#if form?.formId === `outcome-${e.id}`}
												<span class="text-xs font-medium text-emerald-600">✓</span>
											{/if}
										</form>
									</td>
									<td class="py-2 text-right">
										<!-- Avec des résultats saisis, l'inscription fait partie de
										     l'historique des indicateurs : suppression admin uniquement. -->
										{#if isAdmin || (e.completedYear === null && e.promoted === null)}
											<form
												method="POST"
												action="?/deleteEnrollment"
												use:enhance
												onsubmit={(ev) => {
													if (!confirm('Supprimer cette inscription ?')) ev.preventDefault()
												}}
											>
												<input type="hidden" name="enrollmentId" value={e.id} />
												<button type="submit" class="text-xs text-red-500 hover:underline">
													Suppr.
												</button>
											</form>
										{/if}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}

			{#if form?.formId === 'outcome' || form?.formId === 'enrollments'}
				{#if 'error' in form && form.error}
					<p class="mt-2 text-sm text-red-600" role="alert">{form.error}</p>
				{/if}
			{/if}
		</div>

		<!-- Nouvelle inscription -->
		<form method="POST" action="?/addEnrollment" use:enhance class="{card} p-5 sm:p-6">
			<h2 class="font-semibold text-ink">Nouvelle inscription</h2>
			{#if data.schools.length === 0}
				<p class="mt-3 text-sm text-ink">
					Ajoute d'abord une école dans
					<a href="/portal/schools" class="font-medium underline">Écoles</a>.
				</p>
			{:else if availableYears.length === 0}
				<p class="mt-3 text-sm text-ink-soft">
					Cet enfant est déjà inscrit sur toutes les années scolaires connues.
				</p>
			{:else}
				<div class="mt-4 flex flex-wrap items-end gap-3">
					<div>
						<label for="schoolYearId" class={label}>Année *</label>
						<select id="schoolYearId" name="schoolYearId" required class={input}>
							{#each availableYears as y (y.id)}
								<option value={y.id}>{y.label}</option>
							{/each}
						</select>
					</div>
					<div>
						<label for="schoolId" class={label}>École *</label>
						<select id="schoolId" name="schoolId" required class={input}>
							{#each data.schools as s (s.id)}
								<option value={s.id}>{s.name}</option>
							{/each}
						</select>
					</div>
					<div>
						<label for="grade" class={label}>Classe *</label>
						<select id="grade" name="grade" required class={input}>
							{#each GRADES as g (g.value)}
								<option value={g.value}>{g.value} ({g.cycle})</option>
							{/each}
						</select>
					</div>
					<label class="mb-2 flex items-center gap-2 text-sm text-ink-soft">
						<input type="checkbox" name="isSponsored" />
						Parrainé Elevatus
					</label>
					<button type="submit" class="mb-0.5 {btnPrimary}">Inscrire</button>
				</div>
				{#if form?.formId === 'addEnrollment' && 'error' in form && form.error}
					<p class="mt-2 text-sm text-red-600" role="alert">{form.error}</p>
				{/if}
			{/if}
		</form>
	</div>
</div>
