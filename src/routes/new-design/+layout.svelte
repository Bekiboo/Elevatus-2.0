<script lang="ts">
	import { page } from '$app/stores'
	import Footer from '$lib/components/layout/Footer.svelte'
	import Navbar from '$lib/components/layout/Navbar.svelte'
	import ViewTransition from '$lib/components/ViewTransition.svelte'
	interface Props {
		children?: import('svelte').Snippet
	}

	let { children }: Props = $props()
</script>

<ViewTransition />

<Navbar />

<main class="mx-auto min-h-[80vh]">
	{#if !$page.error}
		{@render children?.()}
	{:else}
		<div
			class="flex items-center justify-center w-full h-[80vh]
		text-4xl font-bold text-amber-400
		"
		>
			{$page.error.message}
		</div>
	{/if}
</main>

<Footer />
