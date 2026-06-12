<script lang="ts">
	import { page } from '$app/state'
	import type { LayoutData } from './$types'
	import type { Snippet } from 'svelte'

	let { data, children }: { data: LayoutData; children?: Snippet } = $props()

	const links = [
		{ href: '/portal', label: 'Tableau de bord', exact: true },
		{ href: '/portal/children', label: 'Enfants' },
		{ href: '/portal/schools', label: 'Écoles' }
	]

	function isActive(link: (typeof links)[number]): boolean {
		const { pathname } = page.url
		return link.exact ? pathname === link.href : pathname.startsWith(link.href)
	}
</script>

<svelte:head>
	<meta name="robots" content="noindex" />
</svelte:head>

<div class="min-h-[80vh] bg-slate-100">
	<header class="border-b border-slate-200 bg-white">
		<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
			<div class="flex items-center gap-6">
				<a href="/portal" class="text-sm font-semibold tracking-wide text-slate-800">
					Elevatus <span class="font-normal text-slate-400">· Portail</span>
				</a>
				<nav class="flex items-center gap-1">
					{#each links as link (link.href)}
						<a
							href={link.href}
							class="rounded-lg px-3 py-1.5 text-sm transition
							{isActive(link)
								? 'bg-slate-800 font-medium text-white'
								: 'text-slate-600 hover:bg-slate-100'}"
						>
							{link.label}
						</a>
					{/each}
				</nav>
			</div>
			<div class="flex items-center gap-3">
				<span class="text-sm text-slate-600">
					{data.user.name}
					{#if data.user.role === 'admin'}
						<span
							class="ml-1 rounded-full bg-slate-800 px-2 py-0.5 text-xs font-medium text-white"
						>
							admin
						</span>
					{/if}
				</span>
				<form method="POST" action="/portal/logout">
					<button
						type="submit"
						class="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-600
						transition hover:bg-slate-50"
					>
						Déconnexion
					</button>
				</form>
			</div>
		</div>
	</header>

	<div class="mx-auto max-w-6xl px-4 py-8">
		{@render children?.()}
	</div>
</div>
