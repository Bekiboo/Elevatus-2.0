<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData, PageData } from './$types'

	let { data, form }: { data: PageData; form: ActionData } = $props()

	const input =
		'rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500'
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
	<input name="name" required placeholder="Nom de l'école *" class="{input} w-56" />
	<input name="locality" placeholder="Localité" class="{input} w-40" />
	<input name="notes" placeholder="Notes" class="{input} w-56" />
	<button
		type="submit"
		class="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition
		hover:bg-slate-700"
	>
		+ Ajouter
	</button>
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
				<input name="name" required value={school.name} class="{input} w-56" />
				<input name="locality" value={school.locality ?? ''} placeholder="Localité" class="{input} w-40" />
				<input name="notes" value={school.notes ?? ''} placeholder="Notes" class="{input} w-56" />
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
					<button
						type="submit"
						class="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600
						transition hover:bg-slate-50"
					>
						Enregistrer
					</button>
					<button
						type="submit"
						formaction="?/delete"
						class="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 transition
						hover:bg-red-50"
						onclick={(e) => {
							if (!confirm(`Supprimer « ${school.name} » ?`)) e.preventDefault()
						}}
					>
						Suppr.
					</button>
				</div>
			</form>
		</div>
	{:else}
		<div class="rounded-xl border border-slate-200 bg-white p-10 text-center text-slate-400">
			Aucune école pour le moment — ajoute la première ci-dessus.
		</div>
	{/each}
</div>
