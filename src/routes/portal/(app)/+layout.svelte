<script lang="ts">
	import { page } from '$app/state'
	import Icon from '$lib/components/portal/Icon.svelte'
	import type { IconName } from '$lib/components/portal/Icon.svelte'
	import type { LayoutData } from './$types'
	import type { Snippet } from 'svelte'

	let { data, children }: { data: LayoutData; children?: Snippet } = $props()

	const links: { href: string; label: string; icon: IconName; exact: boolean }[] = [
		{ href: '/portal', label: 'Accueil', icon: 'home', exact: true },
		{ href: '/portal/field', label: 'Terrain', icon: 'field', exact: false },
		{ href: '/portal/children', label: 'Enfants', icon: 'children', exact: false },
		{ href: '/portal/schools', label: 'Écoles', icon: 'school', exact: false }
	]

	function isActive(link: (typeof links)[number]): boolean {
		const { pathname } = page.url
		return link.exact ? pathname === link.href : pathname.startsWith(link.href)
	}
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="flex min-h-screen flex-col bg-paper">
	<!-- Barre supérieure : l'encre Elevatus, la navigation sur desktop -->
	<header class="bg-ink text-white">
		<div class="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
			<div class="flex items-center gap-8">
				<a href="/portal" class="font-saira text-2xl uppercase leading-none tracking-wider">
					Elevatus<span class="ml-1.5 text-brand">Portail</span>
				</a>
				<nav class="hidden items-center gap-1 sm:flex" aria-label="Navigation principale">
					{#each links as link (link.href)}
						<a
							href={link.href}
							aria-current={isActive(link) ? 'page' : undefined}
							class="relative flex h-14 items-center px-3 text-sm font-medium transition
							{isActive(link) ? 'text-white' : 'text-white/60 hover:text-white'}"
						>
							{link.label}
							{#if isActive(link)}
								<span class="absolute inset-x-3 bottom-0 h-0.5 rounded-t bg-brand"></span>
							{/if}
						</a>
					{/each}
				</nav>
			</div>
			<div class="flex items-center gap-3">
				<span class="hidden text-sm text-white/70 sm:inline">
					{data.user.name}
					{#if data.user.role === 'admin'}
						<span class="ml-1.5 rounded-full bg-white/15 px-2 py-0.5 text-xs font-medium text-white">
							admin
						</span>
					{/if}
				</span>
				<form method="POST" action="/portal/logout">
					<button
						type="submit"
						title="Déconnexion"
						class="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 transition
						hover:bg-white/10 hover:text-white"
					>
						<Icon name="logout" size={18} />
						<span class="sr-only">Déconnexion</span>
					</button>
				</form>
			</div>
		</div>
	</header>

	<div class="mx-auto w-full max-w-5xl flex-1 px-4 py-6 pb-24 sm:py-8 sm:pb-10">
		{@render children?.()}
	</div>

	<!-- Barre d'onglets mobile : le portail se navigue au pouce sur le terrain -->
	<nav
		class="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white pb-[env(safe-area-inset-bottom)] sm:hidden"
		aria-label="Navigation mobile"
	>
		<div class="grid grid-cols-4">
			{#each links as link (link.href)}
				<a
					href={link.href}
					aria-current={isActive(link) ? 'page' : undefined}
					class="flex flex-col items-center gap-0.5 pb-2 pt-2.5 text-[11px] font-medium transition
					{isActive(link) ? 'text-brand-dark' : 'text-ink-soft'}"
				>
					<Icon name={link.icon} size={22} />
					{link.label}
				</a>
			{/each}
		</div>
	</nav>
</div>
