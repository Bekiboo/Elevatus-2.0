<script lang="ts">
	import { enhance } from '$app/forms'
	import { btnDanger, btnPrimary, btnSecondary, inputSm } from '$lib/portal/ui'
	import type { ActionData, PageData } from './$types'

	let { data, form }: { data: PageData; form: ActionData } = $props()

	// Formulaire en ligne : largeurs fixes, on retire le w-full du style partagé.
	const inlineInput = inputSm.replace('w-full ', '')

	const isAdmin = $derived(data.user.role === 'admin')
</script>

<svelte:head>
	<title>Écoles — Portail Elevatus</title>
</svelte:head>

<h1 class="text-2xl font-semibold text-slate-800">Écoles</h1>
<p class="mt-1 text-sm text-slate-500">
	Les établissements où les enfants suivis sont inscrits (EPP, CEG, lycées…).
</p>

<form
	method="POST"
	action="?/create"
	use:enhance
	class="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"
>
	<input name="name" required placeholder="Nom de l'école *" class="{inlineInput} w-56" />
	<input name="locality" placeholder="Localité" class="{inlineInput} w-40" />
	<input name="notes" placeholder="Notes" class="{inlineInput} w-56" />
	<button type="submit" class={btnPrimary}>+ Ajouter</button>
	{#if form?.formId === 'create' && 'error' in form && form.error}
		<p class="w-full text-sm text-red-600" role="alert">{form.error}</p>
	{/if}
</form>

<div class="mt-4 space-y-2">
	{#each data.schools as school (school.id)}
		<div class="rounded-xl border border-slate-200 bg-white p-4">
			<form
				method="POST"
				action="?/update"
				use:enhance
				class="flex flex-wrap items-center gap-3"
			>
				<input type="hidden" name="id" value={school.id} />
				<input name="name" required value={school.name} class="{inlineInput} w-56" />
				<input name="locality" value={school.locality ?? ''} placeholder="Localité" class="{inlineInput} w-40" />
				<input name="notes" value={school.notes ?? ''} placeholder="Notes" class="{inlineInput} w-56" />
				<span class="text-xs text-slate-400">
					{school.enrollmentCount} inscription{school.enrollmentCount > 1 ? 's' : ''}
				</span>
				<div class="ml-auto flex items-center gap-2">
					{#if form?.formId === `row-${school.id}`}
						{#if 'error' in form && form.error}
							<span class="text-sm text-red-600">{form.error}</span>
						{:else}
							<span class="text-sm text-emerald-600">✓</span>
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
		<div class="rounded-xl border border-slate-200 bg-white p-10 text-center text-slate-400">
			Aucune école pour le moment — ajoute la première ci-dessus.
		</div>
	{/each}
</div>
