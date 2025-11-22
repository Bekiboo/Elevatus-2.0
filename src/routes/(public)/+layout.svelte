<script lang="ts">
	import { page } from '$app/stores'
	import Footer from '$lib/components/layout/Footer.svelte'
	import Navbar from '$lib/components/layout/Navbar.svelte'
	import ViewTransition from '$lib/components/ViewTransition.svelte'
	interface Props {
		children?: import('svelte').Snippet
	}

	let { children }: Props = $props()

	// Compute canonical URL dynamically
	$effect(() => {
		const baseUrl = 'https://www.elevatus-foundation.org'
		const canonicalUrl = `${baseUrl}${$page.url.pathname}`

		// Remove any existing canonical link
		const existingCanonical = document.querySelector('link[rel="canonical"]')
		if (existingCanonical) {
			existingCanonical.remove()
		}

		// Add new canonical link
		const link = document.createElement('link')
		link.setAttribute('rel', 'canonical')
		link.setAttribute('href', canonicalUrl)
		document.head.appendChild(link)
	})
</script>

<ViewTransition />

<Navbar />

<main class="mx-auto min-h-[80vh] font-sans">
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
