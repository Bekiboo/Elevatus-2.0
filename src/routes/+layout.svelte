<script lang="ts">
	import '../app.css'
	import { injectAnalytics } from '@vercel/analytics/sveltekit'
	import { page } from '$app/state'
	import ViewTransition from '$lib/components/ViewTransition.svelte'
	interface Props {
		children?: import('svelte').Snippet
	}

	let { children }: Props = $props()

	injectAnalytics()
</script>

<ViewTransition />

<main class="mx-auto min-h-[80vh] bg-light">
	{#if !page.error}
		{@render children?.()}
	{:else}
		<div
			class="flex items-center justify-center w-full h-[80vh]
		text-4xl font-bold text-amber-400
		"
		>
			{page.error.message}
		</div>
	{/if}
</main>
