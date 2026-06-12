<script lang="ts">
	import { enhance } from '$app/forms'
	import { btnPrimaryLg, card, input, label } from '$lib/portal/ui'
	import type { ActionData } from './$types'

	let { form }: { form: ActionData } = $props()
	let loading = $state(false)
</script>

<svelte:head>
	<title>Connexion — Portail Elevatus</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="flex min-h-screen items-center justify-center bg-paper px-4">
	<div class="w-full max-w-sm">
		<p class="text-center font-saira text-3xl uppercase leading-none tracking-wider text-ink">
			Elevatus<span class="ml-1.5 text-brand">Portail</span>
		</p>

		<div class="{card} mt-5 p-6 shadow-sm sm:p-8">
			<p class="text-sm text-ink-soft">Connexion réservée à l'équipe.</p>

			<form
				method="POST"
				class="mt-5 space-y-4"
				use:enhance={() => {
					loading = true
					return async ({ update }) => {
						loading = false
						await update()
					}
				}}
			>
				<div>
					<label for="email" class={label}>Email</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						autocomplete="email"
						value={form?.email ?? ''}
						class="mt-1 {input}"
					/>
				</div>

				<div>
					<label for="password" class={label}>Mot de passe</label>
					<input
						id="password"
						name="password"
						type="password"
						required
						autocomplete="current-password"
						class="mt-1 {input}"
					/>
				</div>

				{#if form?.error}
					<p class="text-sm text-red-600" role="alert">{form.error}</p>
				{/if}

				<button type="submit" disabled={loading} class={btnPrimaryLg}>
					{loading ? 'Connexion…' : 'Se connecter'}
				</button>
			</form>
		</div>
	</div>
</div>
