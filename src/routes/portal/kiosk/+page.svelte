<script lang="ts">
	import { enhance } from '$app/forms'
	import { SURVEY_QUESTIONS, SURVEY_SCALE } from '$lib/portal/surveys'
	import { btnPrimaryLg, card, input, label } from '$lib/portal/ui'
	import type { ActionData, PageData } from './$types'

	let { data, form }: { data: PageData; form: ActionData } = $props()

	type Youth = { id: string; fullName: string }

	let step = $state<'pick' | 'survey' | 'thanks'>('pick')
	let selected = $state<Youth | null>(null)
	let query = $state('')
	let submitting = $state(false)
	let submitError = $state<string | null>(null)
	let thanksName = $state('')

	const youth = $derived(data.unlocked ? data.youth : [])
	const filtered = $derived(
		query.trim()
			? youth.filter((y) => y.fullName.toLowerCase().includes(query.trim().toLowerCase()))
			: youth
	)

	function pick(y: Youth) {
		selected = y
		submitError = null
		step = 'survey'
	}

	function backToPick() {
		selected = null
		step = 'pick'
	}
</script>

<svelte:head>
	<title>Enquête de confiance</title>
	<meta name="robots" content="noindex" />
</svelte:head>

{#if !data.unlocked}
	<!-- Écran d'ouverture : réservé à l'encadrant qui connaît le code -->
	<div class="flex min-h-screen items-center justify-center bg-paper px-4">
		<div class="w-full max-w-sm">
			<p class="text-center font-saira text-3xl uppercase leading-none tracking-wider text-ink">
				Mode kiosque
			</p>
			<div class="{card} mt-5 p-6 shadow-sm sm:p-8">
				{#if !data.pinConfigured}
					<p class="text-sm text-ink-soft">
						Le mode kiosque n'est pas encore configuré sur ce serveur (variable
						<code class="text-xs">KIOSK_PIN</code>).
					</p>
				{:else}
					<p class="text-sm text-ink-soft">Code d'ouverture (encadrant).</p>
					<form method="POST" action="?/unlock" class="mt-5 space-y-4" use:enhance>
						<div>
							<label for="pin" class={label}>Code</label>
							<input
								id="pin"
								name="pin"
								type="password"
								inputmode="numeric"
								autocomplete="off"
								required
								class="mt-1 {input}"
							/>
						</div>
						{#if form && 'error' in form && form.stage === 'pin'}
							<p class="text-sm text-red-600" role="alert">{form.error}</p>
						{/if}
						<button type="submit" class={btnPrimaryLg}>Ouvrir le kiosque</button>
					</form>
				{/if}
			</div>
		</div>
	</div>
{:else}
	<div class="min-h-screen bg-paper">
		<div class="mx-auto max-w-2xl px-5 py-8 sm:py-12">
			{#if step === 'pick'}
				<h1 class="font-saira text-4xl uppercase leading-none tracking-wide text-ink sm:text-5xl">
					Bonjour&nbsp;!
				</h1>
				<p class="mt-2 text-lg text-ink-soft">Trouve ton nom pour commencer.</p>

				<input
					type="search"
					bind:value={query}
					placeholder="Cherche ton nom…"
					class="mt-5 {input} h-14 text-lg"
				/>

				{#if filtered.length === 0}
					<p class="mt-6 text-ink-soft">Aucun nom ne correspond. Demande à un encadrant.</p>
				{:else}
					<div class="mt-5 grid gap-3 sm:grid-cols-2">
						{#each filtered as y (y.id)}
							<button
								type="button"
								onclick={() => pick(y)}
								class="rounded-xl border border-ink/15 bg-white px-5 py-4 text-left text-lg font-medium
								text-ink transition hover:border-brand hover:bg-brand/5 active:bg-brand/10"
							>
								{y.fullName}
							</button>
						{/each}
					</div>
				{/if}

				<form method="POST" action="?/lock" use:enhance class="mt-10">
					<button type="submit" class="text-xs text-ink-soft/60 underline">Fermer le kiosque</button
					>
				</form>
			{:else if step === 'survey' && selected}
				{#key selected.id}
					<button
						type="button"
						onclick={backToPick}
						class="text-sm font-medium text-ink-soft underline">← Ce n'est pas moi</button
					>
					<h1
						class="mt-2 font-saira text-3xl uppercase leading-none tracking-wide text-ink sm:text-4xl"
					>
						{selected.fullName}
					</h1>
					<p class="mt-1 text-ink-soft">
						Dis-nous comment tu te sens. Il n'y a pas de mauvaise réponse.
					</p>

					<form
						method="POST"
						action="?/submit"
						class="mt-6 space-y-7"
						use:enhance={() => {
							submitting = true
							submitError = null
							return async ({ result }) => {
								submitting = false
								if (result.type === 'success') {
									thanksName = selected?.fullName ?? ''
									step = 'thanks'
									selected = null
									query = ''
									setTimeout(() => {
										if (step === 'thanks') step = 'pick'
									}, 5000)
								} else if (result.type === 'failure') {
									submitError = (result.data?.error as string) ?? 'Une erreur est survenue.'
								}
							}
						}}
					>
						<input type="hidden" name="beneficiaryId" value={selected.id} />

						{#each SURVEY_QUESTIONS as q (q.key)}
							<fieldset>
								<legend class="text-lg font-medium text-ink">{q.statement}</legend>
								<div class="mt-3 grid grid-cols-5 gap-2">
									{#each SURVEY_SCALE as s (s.value)}
										<label
											class="flex cursor-pointer flex-col items-center gap-1 rounded-xl border border-ink/15
											py-3 transition hover:border-ink/40 has-[:checked]:border-brand
											has-[:checked]:bg-brand/10 has-[:checked]:ring-2 has-[:checked]:ring-brand"
										>
											<input
												type="radio"
												name="score-{q.key}"
												value={s.value}
												class="sr-only"
												aria-label={s.label}
												required
											/>
											<span class="text-3xl leading-none sm:text-4xl" aria-hidden="true"
												>{s.face}</span
											>
											<span class="text-center text-[11px] leading-tight text-ink-soft"
												>{s.label}</span
											>
										</label>
									{/each}
								</div>
							</fieldset>
						{/each}

						{#if submitError}
							<p class="text-sm text-red-600" role="alert">{submitError}</p>
						{/if}

						<button type="submit" disabled={submitting} class={btnPrimaryLg}>
							{submitting ? 'Envoi…' : 'Valider'}
						</button>
					</form>
				{/key}
			{:else if step === 'thanks'}
				<div class="flex min-h-[70vh] flex-col items-center justify-center text-center">
					<span class="text-6xl" aria-hidden="true">🎉</span>
					<h1
						class="mt-4 font-saira text-4xl uppercase leading-none tracking-wide text-ink sm:text-5xl"
					>
						Merci {thanksName}&nbsp;!
					</h1>
					<p class="mt-2 text-lg text-ink-soft">C'est bien enregistré.</p>
					<button
						type="button"
						onclick={() => (step = 'pick')}
						class="{btnPrimaryLg} mt-8 max-w-xs"
					>
						Au suivant
					</button>
				</div>
			{/if}
		</div>
	</div>
{/if}
