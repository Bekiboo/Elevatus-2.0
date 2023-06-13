<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	$: currentPage = $page.url.pathname;

	let width: number;
	let translateX: number;
	let LINK_GAP: number = 20;

	let linksDiv: HTMLDivElement;

	const links = [
		{ name: 'Home', path: '/' },
		{ name: 'Contact', path: '/contact' },
		{ name: 'Team', path: '/team' },
		{ name: 'About', path: '/about' },
		{ name: 'Donate', path: '/donate' }
	];

	onMount(() => {
		const currentPageIndex = links.findIndex((link) => link.path === currentPage);
		width = linksDiv?.children[currentPageIndex].clientWidth;
	});

	$: {
		const currentPageIndex = links.findIndex((link) => link.path === currentPage);
		width = linksDiv?.children[currentPageIndex].clientWidth;
	}

	$: {
		translateX = 0;
		for (let i = 0; i < links.length; i++) {
			if (links[i].path === currentPage) {
				break;
			}
			translateX += linksDiv?.children[i].clientWidth + LINK_GAP;
		}
	}
</script>

<nav
	class="flex justify-between px-12 py-1 w-screen bg-amber-400 text-white items-center uppercase font-bold"
>
	<img class="h-16" src="img/white_logo.png" alt="logo" />

	<div class="relative">
		<span
			class="bar w-[25%] h-2 bg-red-500 absolute -top-2 transition-all duration-300 ease-in-out"
			style="width: {width}px; translate: {translateX}px;"
		/>
		<div class="flex items-center w-96 relative" style="gap: {LINK_GAP}px" bind:this={linksDiv}>
			{#each links as link}
				<a href={link.path} id={link.name} class="hover:text-white">{link.name}</a>
			{/each}
		</div>
	</div>
</nav>
