<script lang="ts">
	import '../app.css'
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
		<div>An error occured</div>
	{/if}
</main>

<Footer />
