<script lang="ts">
	import { enhance } from '$app/forms'
	import { DateTime } from 'luxon'
	import Icon from '$lib/components/portal/Icon.svelte'
	import PageHeader from '$lib/components/portal/PageHeader.svelte'
	import { btnDanger, btnPrimary, btnSecondary, card, input, inputSm, label } from '$lib/portal/ui'
	import type { PageData, ActionData } from './$types'

	let { data, form }: { data: PageData; form: ActionData } = $props()

	function dateEn(iso: string): string {
		return DateTime.fromISO(iso).setLocale('en').toFormat('d LLL yyyy')
	}

	// Le mot de passe à transmettre, affiché une seule fois après création ou
	// réinitialisation. On retrouve l'email concerné pour le contexte.
	const credential = $derived.by(() => {
		if (!form || !('tempPassword' in form) || !form.tempPassword) return null
		const email =
			'createdEmail' in form
				? form.createdEmail
				: data.users.find((u) => u.id === ('resetUserId' in form ? form.resetUserId : ''))?.email
		const created = 'createdEmail' in form
		return { email: email ?? '—', password: form.tempPassword, created }
	})

	let copied = $state(false)
	async function copy(value: string) {
		try {
			await navigator.clipboard.writeText(value)
			copied = true
			setTimeout(() => (copied = false), 1500)
		} catch {
			copied = false
		}
	}

	function rowError(id: string): string | null {
		return form && 'error' in form && form.formId === `row-${id}` ? (form.error ?? null) : null
	}

	const createError = $derived(
		form && 'error' in form && form.formId === 'create' ? form.error : null
	)
	const createValues = $derived(form && 'values' in form ? (form.values ?? {}) : {})
</script>

<svelte:head>
	<title>Team accounts — Elevatus Portal</title>
</svelte:head>

<PageHeader
	title="Team accounts"
	sub="Create and manage staff access to the portal."
	back={{ href: '/portal/admin', label: 'Dashboard' }}
/>

{#if credential}
	<!-- Affiché une fois : à transmettre à la personne, jamais ré-affiché ensuite. -->
	<div class="mb-6 rounded-xl border border-brand/40 bg-brand/5 p-5">
		<div class="flex items-center gap-2 text-ink">
			<Icon name="key" size={18} />
			<h2 class="font-semibold">
				{credential.created ? 'Account created' : 'Password reset'}
			</h2>
		</div>
		<p class="mt-1 text-sm text-ink-soft">
			Share these credentials with <span class="font-medium text-ink">{credential.email}</span>.
			This password is shown only once.
		</p>
		<div class="mt-3 flex flex-wrap items-center gap-3">
			<code class="rounded-lg bg-white px-3 py-2 font-mono text-base text-ink ring-1 ring-ink/15">
				{credential.password}
			</code>
			<button type="button" class={btnSecondary} onclick={() => copy(credential.password)}>
				{copied ? 'Copied' : 'Copy'}
			</button>
		</div>
	</div>
{/if}

<!-- Créer un compte -->
<section class="{card} mb-8 p-5 sm:p-6">
	<h2 class="font-semibold text-ink">New account</h2>
	<p class="mt-0.5 text-sm text-ink-soft">
		A temporary password is generated automatically — you'll see it once, here.
	</p>
	<form method="POST" action="?/create" use:enhance class="mt-4 grid gap-4 sm:grid-cols-2">
		<div>
			<label class={label} for="new-name">Full name</label>
			<input
				id="new-name"
				name="name"
				class="{input} mt-1.5"
				value={createValues.name ?? ''}
				autocomplete="off"
				required
			/>
		</div>
		<div>
			<label class={label} for="new-email">Email</label>
			<input
				id="new-email"
				name="email"
				type="email"
				class="{input} mt-1.5"
				value={createValues.email ?? ''}
				autocomplete="off"
				required
			/>
		</div>
		<div>
			<label class={label} for="new-role">Role</label>
			<select id="new-role" name="role" class="{input} mt-1.5">
				<option value="staff" selected={createValues.role !== 'admin'}>Field agent (staff)</option>
				<option value="admin" selected={createValues.role === 'admin'}>Administrator</option>
			</select>
		</div>
		<div class="flex items-end">
			<button type="submit" class="{btnPrimary} flex items-center gap-2">
				<Icon name="plus" size={16} />
				Create account
			</button>
		</div>
		{#if createError}
			<p class="text-sm text-red-600 sm:col-span-2">{createError}</p>
		{/if}
	</form>
</section>

<!-- Liste des comptes -->
<section>
	<h2 class="text-xs font-semibold uppercase tracking-[0.15em] text-ink-soft">
		Accounts · {data.users.length}
	</h2>

	<div class="mt-3 space-y-3">
		{#each data.users as u (u.id)}
			{@const isSelf = u.id === data.currentUserId}
			{@const err = rowError(u.id)}
			<div class="{card} p-4 {u.banned ? 'opacity-70' : ''}">
				<div class="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
					<div class="min-w-0">
						<div class="flex items-center gap-2">
							<p class="truncate font-semibold text-ink">{u.name}</p>
							{#if isSelf}
								<span class="rounded-full bg-ink/10 px-2 py-0.5 text-xs font-medium text-ink-soft">
									You
								</span>
							{/if}
							{#if u.banned}
								<span class="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
									Disabled
								</span>
							{/if}
						</div>
						<p class="truncate text-sm text-ink-soft">{u.email}</p>
						<p class="mt-0.5 text-xs text-ink-soft/70">Added {dateEn(u.createdAt)}</p>
					</div>

					<div class="flex flex-wrap items-center gap-2">
						<!-- Rôle : changement immédiat à la sélection -->
						<form method="POST" action="?/setRole" use:enhance>
							<input type="hidden" name="userId" value={u.id} />
							<select
								name="role"
								class="{inputSm} w-auto"
								disabled={isSelf}
								onchange={(e) => e.currentTarget.form?.requestSubmit()}
							>
								<option value="staff" selected={u.role !== 'admin'}>Staff</option>
								<option value="admin" selected={u.role === 'admin'}>Admin</option>
							</select>
						</form>

						<!-- Réinitialiser le mot de passe -->
						<form method="POST" action="?/resetPassword" use:enhance>
							<input type="hidden" name="userId" value={u.id} />
							<button type="submit" class="{btnSecondary} flex items-center gap-1.5">
								<Icon name="key" size={14} />
								Reset password
							</button>
						</form>

						<!-- Activer / désactiver -->
						{#if u.banned}
							<form method="POST" action="?/unban" use:enhance>
								<input type="hidden" name="userId" value={u.id} />
								<button type="submit" class={btnSecondary}>Enable</button>
							</form>
						{:else}
							<form method="POST" action="?/ban" use:enhance>
								<input type="hidden" name="userId" value={u.id} />
								<button type="submit" class={btnDanger} disabled={isSelf}>Disable</button>
							</form>
						{/if}

						<!-- Suppression définitive (compte créé par erreur) -->
						{#if !isSelf}
							<form
								method="POST"
								action="?/remove"
								use:enhance
								onsubmit={(e) => {
									if (!confirm(`Permanently delete ${u.email}? This cannot be undone.`))
										e.preventDefault()
								}}
							>
								<input type="hidden" name="userId" value={u.id} />
								<button type="submit" class={btnDanger} aria-label="Delete account">
									<Icon name="logout" size={14} />
								</button>
							</form>
						{/if}
					</div>
				</div>

				{#if err}
					<p class="mt-2 text-sm text-red-600">{err}</p>
				{/if}
			</div>
		{/each}
	</div>

	<p class="mt-4 text-xs text-ink-soft/80">
		Disabling keeps the account and its records but blocks sign-in (the field equivalent of
		archiving). Deletion is for accounts created by mistake.
	</p>
</section>
