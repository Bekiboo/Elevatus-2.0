<script lang="ts">
	import { page } from '$app/state'
	import type { LayoutData } from './$types'
	import type { Snippet } from 'svelte'

	let { data, children }: { data: LayoutData; children?: Snippet } = $props()

	const links = [
		{ href: '/portal', label: 'Tableau de bord', exact: true },
		{ href: '/portal/field', label: 'Saisie terrain', exact: false },
		{ href: '/portal/children', label: 'Enfants', exact: false },
		{ href: '/portal/schools', label: 'Écoles', exact: false }
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
		<div class="mx-auto max-w-6xl px-4 pt-3">
			<div class="flex items-center justify-between gap-3">
				<a href="/portal" class="text-sm font-semibold tracking-wide text-slate-800">
					Elevatus <span class="font-normal text-slate-400">· Portail</span>
				</a>
				<div class="flex items-center gap-3">
					<span class="hidden text-sm text-slate-600 sm:inline">
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
			<nav class="-mx-4 mt-1 flex gap-1 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
				{#each links as link (link.href)}
					<a
						href={link.href}
						class="whitespace-nowrap rounded-lg px-3 py-2 text-sm transition
						{isActive(link)
							? 'bg-slate-800 font-medium text-white'
							: 'text-slate-600 hover:bg-slate-100'}"
					>
						{link.label}
					</a>
				{/each}
			</nav>
		</div>
	</header>

	<div class="mx-auto max-w-6xl px-4 py-6 sm:py-8">
		{@render children?.()}
	</div>
</div>
