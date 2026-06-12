<script lang="ts">
	import type { Snippet } from 'svelte'
	import Icon from './Icon.svelte'
	import { pageTitle } from '$lib/portal/ui'

	// L'en-tête commun des pages du portail : fil d'Ariane court, titre dans
	// la voix Elevatus, sous-titre optionnel, actions à droite.
	let {
		title,
		sub,
		back,
		actions
	}: {
		title: string
		sub?: string
		back?: { href: string; label: string }
		actions?: Snippet
	} = $props()
</script>

<header class="mb-6">
	{#if back}
		<a
			href={back.href}
			class="mb-2 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft transition hover:text-ink"
		>
			<Icon name="back" size={16} />
			{back.label}
		</a>
	{/if}
	<div class="flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
		<div>
			<h1 class={pageTitle}>{title}</h1>
			{#if sub}
				<p class="mt-1.5 text-sm text-ink-soft">{sub}</p>
			{/if}
		</div>
		{#if actions}
			<div class="flex items-center gap-2">
				{@render actions()}
			</div>
		{/if}
	</div>
</header>
