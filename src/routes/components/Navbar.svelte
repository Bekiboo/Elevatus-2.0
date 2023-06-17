<script lang="ts">
	import { page } from '$app/stores';
	$: currentPage = $page.url.pathname;

	let width: number;
	let translateX: number;
	const LINK_GAP: number = 20;

	let linksDiv: HTMLDivElement;

	const LINKS = [
		{ name: 'Home', path: '/' },
		{ name: 'Contact', path: '/contact' },
		{ name: 'Team', path: '/team' },
		{ name: 'About', path: '/about' },
		{ name: 'Donate', path: '/donate' }
	];

	$: {
		const currentPageIndex = LINKS.findIndex((link) => link.path === currentPage);
		width = linksDiv?.children[currentPageIndex].clientWidth;
	}

	$: {
		translateX = 0;
		for (let i = 0; i < LINKS.length; i++) {
			if (LINKS[i].path === currentPage) {
				break;
			}
			translateX += linksDiv?.children[i].clientWidth;
		}
	}
</script>

<nav
	class="flex justify-between px-12 py-1 w-screen bg-amber-400 text-white items-center uppercase font-bold"
>
	<!-- Logo -->
	<a href="/"><img class="h-16" src="img/white_logo.png" alt="logo" /></a>

	<div class="relative">
		<!-- Top Bar -->
		<span
			class="bar h-1 bg-red-500 absolute -top-1 transition-all duration-300 ease-in-out"
			style="width: {width}px; translate: {translateX}px;"
		/>
		<!-- Bottom Bar -->
		<span
			class="bar h-1 bg-red-500 absolute -bottom-1 transition-all duration-200 ease-in-out"
			style="width: {width}px; translate: {translateX}px;"
		/>

		<!-- Links -->
		<div class="flex items-center w-96 relative" style="gap: {0}px" bind:this={linksDiv}>
			{#each LINKS as link}
				<a
					href={link.path}
					id={link.name}
					class="hover:text-red-500 transition-all duration-100 ease-in-out"
					class:active={currentPage === link.path}
					style="padding: 0 {LINK_GAP / 2}px;"
					aria-current={currentPage === link.path}>{link.name}</a
				>
			{/each}
		</div>
	</div>
</nav>

<style>
	.active {
		color: rgb(239 68 68 / var(--tw-bg-opacity));
	}
</style>
