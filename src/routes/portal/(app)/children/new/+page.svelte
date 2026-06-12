<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData } from './$types'

	let { form }: { form: ActionData } = $props()

	const input =
		'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500'
	const label = 'block text-sm font-medium text-slate-700'
</script>

<svelte:head>
	<title>Nouvel enfant — Portail Elevatus</title>
</svelte:head>

<a href="/portal/children" class="text-sm text-slate-500 hover:underline">← Enfants</a>
<h1 class="mt-2 text-2xl font-semibold text-slate-800">Ajouter un enfant</h1>

<form method="POST" use:enhance class="mt-6 max-w-lg space-y-4 rounded-xl border border-slate-200 bg-white p-6">
	<div>
		<label for="fullName" class={label}>Nom complet *</label>
		<input id="fullName" name="fullName" required value={form?.values?.fullName ?? ''} class={input} />
	</div>
	<div>
		<label for="preferredName" class={label}>Nom d'usage / surnom</label>
		<input id="preferredName" name="preferredName" value={form?.values?.preferredName ?? ''} class={input} />
	</div>
	<div class="grid grid-cols-2 gap-4">
		<div>
			<label for="gender" class={label}>Genre</label>
			<select id="gender" name="gender" class={input}>
				<option value="">—</option>
				<option value="female" selected={form?.values?.gender === 'female'}>Fille</option>
				<option value="male" selected={form?.values?.gender === 'male'}>Garçon</option>
			</select>
		</div>
		<div>
			<label for="birthDate" class={label}>Date de naissance</label>
			<input id="birthDate" name="birthDate" type="date" value={form?.values?.birthDate ?? ''} class={input} />
		</div>
	</div>
	<div>
		<label for="notes" class={label}>Notes</label>
		<textarea id="notes" name="notes" rows="3" class={input}>{form?.values?.notes ?? ''}</textarea>
	</div>

	{#if form?.error}
		<p class="text-sm text-red-600" role="alert">{form.error}</p>
	{/if}

	<button
		type="submit"
		class="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
	>
		Créer la fiche
	</button>
</form>
