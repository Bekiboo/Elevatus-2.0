<script lang="ts">
	import { enhance } from '$app/forms'
	import PageHeader from '$lib/components/portal/PageHeader.svelte'
	import { btnPrimary, card, inputSm, label } from '$lib/portal/ui'
	import type { ActionData } from './$types'

	let { form }: { form: ActionData } = $props()

	const input = `mt-1 ${inputSm}`
</script>

<svelte:head>
	<title>Nouvel enfant — Portail Elevatus</title>
</svelte:head>

<PageHeader title="Ajouter un enfant" back={{ href: '/portal/children', label: 'Enfants' }} />

<form method="POST" use:enhance class="{card} max-w-lg space-y-4 p-5 sm:p-6">
	<div>
		<label for="fullName" class={label}>Nom complet *</label>
		<input id="fullName" name="fullName" required value={form?.values?.fullName ?? ''} class={input} />
	</div>
	<div>
		<label for="preferredName" class={label}>Nom d'usage / surnom</label>
		<input
			id="preferredName"
			name="preferredName"
			value={form?.values?.preferredName ?? ''}
			class={input}
		/>
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
			<input
				id="birthDate"
				name="birthDate"
				type="date"
				value={form?.values?.birthDate ?? ''}
				class={input}
			/>
		</div>
	</div>
	<div>
		<label for="notes" class={label}>Notes</label>
		<textarea id="notes" name="notes" rows="3" class={input}>{form?.values?.notes ?? ''}</textarea>
	</div>

	{#if form?.error}
		<p class="text-sm text-red-600" role="alert">{form.error}</p>
	{/if}

	<button type="submit" class={btnPrimary}>Créer la fiche</button>
</form>
