<script lang="ts">
	import Icon from '$lib/components/portal/Icon.svelte'
	import PageHeader from '$lib/components/portal/PageHeader.svelte'
	import { btnSecondary, card, labelXs } from '$lib/portal/ui'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	const isAdmin = $derived(data.user.role === 'admin')
	const initials = $derived(
		data.user.name
			.split(' ')
			.map((p) => p[0])
			.slice(0, 2)
			.join('')
			.toUpperCase()
	)
</script>

<svelte:head>
	<title>Mon compte — Portail Elevatus</title>
</svelte:head>

<PageHeader title="Mon compte" sub="Ton accès au portail." />

<div class="max-w-lg space-y-4">
	<div class="{card} p-5 sm:p-6">
		<div class="flex items-center gap-4">
			<span
				class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink
				font-saira text-2xl uppercase leading-none text-white"
			>
				{initials}
			</span>
			<div class="min-w-0">
				<p class="truncate font-semibold text-ink">{data.user.name}</p>
				<p class="truncate text-sm text-ink-soft">{data.user.email}</p>
			</div>
		</div>

		<dl class="mt-5 space-y-3 border-t border-ink/10 pt-4">
			<div class="flex items-center justify-between gap-4">
				<dt class={labelXs}>Rôle</dt>
				<dd class="text-sm font-medium text-ink">
					{isAdmin ? 'Administrateur' : 'Agent de terrain'}
				</dd>
			</div>
		</dl>
	</div>

	<div class="{card} flex items-center justify-between gap-4 p-5 sm:p-6">
		<div>
			<p class="font-semibold text-ink">Session</p>
			<p class="mt-0.5 text-sm text-ink-soft">Connecté en tant que {data.user.email}.</p>
		</div>
		<form method="POST" action="/portal/logout">
			<button type="submit" class="{btnSecondary} flex items-center gap-2">
				<Icon name="logout" size={16} />
				Se déconnecter
			</button>
		</form>
	</div>

	{#if isAdmin}
		<a
			href="/portal/admin/team"
			class="{card} group flex items-center justify-between gap-4 p-5 transition hover:border-ink/30 hover:shadow-sm sm:p-6"
		>
			<div>
				<p class="font-semibold text-ink">Comptes de l’équipe</p>
				<p class="mt-0.5 text-sm text-ink-soft">Créer et gérer les accès des agents.</p>
			</div>
			<span class="text-ink-soft transition group-hover:text-ink"><Icon name="team" size={22} /></span>
		</a>
	{/if}

	<div class="rounded-xl border border-dashed border-ink/15 p-4">
		<div class="flex items-center justify-between">
			<h2 class="font-semibold text-ink/60">Mot de passe</h2>
			<span class="rounded-full bg-secondary/25 px-2 py-0.5 text-xs font-medium text-ink/70">
				À venir
			</span>
		</div>
		<p class="mt-1 text-sm text-ink-soft/80">Tu pourras bientôt changer ton mot de passe ici.</p>
	</div>
</div>
