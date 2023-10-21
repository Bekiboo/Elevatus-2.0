<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Navbar from '$lib/components/layout/Navbar.svelte';
</script>

<Navbar />

<main class="mx-auto min-h-[80vh]">
	{#if !$page.error}
		<slot />
	{:else}
		<div>An error occured</div>
	{/if}
</main>

<Footer />
