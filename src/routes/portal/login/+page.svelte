<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData } from './$types'

	let { form }: { form: ActionData } = $props()
	let loading = $state(false)
</script>

<svelte:head>
	<title>Connexion — Portail Elevatus</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="flex min-h-[80vh] items-center justify-center bg-slate-100 px-4">
	<div class="w-full max-w-sm">
		<div class="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
			<h1 class="text-xl font-semibold text-slate-800">Portail Elevatus</h1>
			<p class="mt-1 text-sm text-slate-500">Connexion réservée à l'équipe.</p>

			<form
				method="POST"
				class="mt-6 space-y-4"
				use:enhance={() => {
					loading = true
					return async ({ update }) => {
						loading = false
						await update()
					}
				}}
			>
				<div>
					<label for="email" class="block text-sm font-medium text-slate-700">Email</label>
					<input
						id="email"
						name="email"
						type="email"
						required
						autocomplete="email"
						value={form?.email ?? ''}
						class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
						focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
					/>
				</div>

				<div>
					<label for="password" class="block text-sm font-medium text-slate-700">
						Mot de passe
					</label>
					<input
						id="password"
						name="password"
						type="password"
						required
						autocomplete="current-password"
						class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm
						focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
					/>
				</div>

				{#if form?.error}
					<p class="text-sm text-red-600" role="alert">{form.error}</p>
				{/if}

				<button
					type="submit"
					disabled={loading}
					class="w-full rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white
					transition hover:bg-slate-700 disabled:opacity-50"
				>
					{loading ? 'Connexion…' : 'Se connecter'}
				</button>
			</form>
		</div>
	</div>
</div>
