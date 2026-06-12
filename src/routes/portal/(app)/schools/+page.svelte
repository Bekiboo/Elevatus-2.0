<script lang="ts">
	import { enhance } from '$app/forms'
	import PageHeader from '$lib/components/portal/PageHeader.svelte'
	import { btnDanger, btnPrimary, btnSecondary, card, inputSm } from '$lib/portal/ui'
	import type { ActionData, PageData } from './$types'

	let { data, form }: { data: PageData; form: ActionData } = $props()

	// Une rangée = nom / localité / notes / actions ; empilée sur mobile.
	const row = 'grid gap-2 sm:grid-cols-[1.2fr_1fr_1.2fr_auto] sm:items-center'

	const isAdmin = $derived(data.user.role === 'admin')
</script>

<svelte:head>
	<title>Écoles — Portail Elevatus</title>
</svelte:head>

<PageHeader
	title="Écoles"
	sub="Les établissements où les enfants suivis sont inscrits (EPP, CEG, lycées…)."
/>

<form method="POST" action="?/create" use:enhance class="{card} p-4 {row}">
	<input name="name" required placeholder="Nom de l'école *" aria-label="Nom de l'école" class={inputSm} />
	<input name="locality" placeholder="Localité" aria-label="Localité" class={inputSm} />
	<input name="notes" placeholder="Notes" aria-label="Notes" class={inputSm} />
	<button type="submit" class={btnPrimary}>+ Ajouter</button>
	{#if form?.formId === 'create' && 'error' in form && form.error}
		<p class="text-sm text-red-600 sm:col-span-4" role="alert">{form.error}</p>
	{/if}
</form>

<div class="mt-4 space-y-2">
	{#each data.schools as school (school.id)}
		<div class="{card} p-4">
			<form method="POST" action="?/update" use:enhance class={row}>
				<input type="hidden" name="id" value={school.id} />
				<input name="name" required value={school.name} aria-label="Nom de l'école" class={inputSm} />
				<input
					name="locality"
					value={school.locality ?? ''}
					placeholder="Localité"
					aria-label="Localité"
					class={inputSm}
				/>
				<input
					name="notes"
					value={school.notes ?? ''}
					placeholder="Notes"
					aria-label="Notes"
					class={inputSm}
				/>
				<div class="flex items-center justify-between gap-2 sm:justify-end">
					<span class="whitespace-nowrap text-xs text-ink-soft">
						{school.enrollmentCount} inscription{school.enrollmentCount > 1 ? 's' : ''}
					</span>
					{#if form?.formId === `row-${school.id}`}
						{#if 'error' in form && form.error}
							<span class="text-sm text-red-600">{form.error}</span>
						{:else}
							<span class="text-sm font-medium text-emerald-600">✓</span>
						{/if}
					{/if}
					<button type="submit" class={btnSecondary}>Enregistrer</button>
					<!-- Suppression définitive : action admin (le serveur le garantit aussi) -->
					{#if isAdmin}
						<button
							type="submit"
							formaction="?/delete"
							class={btnDanger}
							onclick={(e) => {
								if (!confirm(`Supprimer « ${school.name} » ?`)) e.preventDefault()
							}}
						>
							Suppr.
						</button>
					{/if}
				</div>
			</form>
		</div>
	{:else}
		<div class="{card} p-10 text-center text-sm text-ink-soft">
			Aucune école pour le moment — ajoute la première ci-dessus.
		</div>
	{/each}
</div>
