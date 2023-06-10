<script lang="ts">
	import { page } from '$app/stores';
	$: currentPage = $page.url.pathname;

	const links = [
		{ name: 'Home', href: '/' },
		{ name: 'Contact', href: '/contact' },
		{ name: 'Team', href: '/team' },
		{ name: 'About', href: '/about' },
		{ name: 'Donate', href: '/donate' }
	];

	let width = 100 / links.length;

	$: translation =
		currentPage === '/'
			? 0
			: currentPage === '/contact'
			? 100
			: currentPage === '/team'
			? 200
			: currentPage === '/about'
			? 300
			: currentPage === '/donate'
			? 400
			: 0;
</script>

<nav
	class="flex justify-between px-12 py-1 w-screen bg-amber-400 text-white items-center uppercase font-bold"
>
	<img class="h-16" src="img/white_logo.png" alt="logo" />

	<div class="relative">
		<span
			class="bar w-[25%] h-2 bg-red-500 absolute"
			style="width: {width}%; translate: {translation}%;"
		/>
		<div class="grid grid-cols-5 items-center relative">
			{#each links as link}
				<a href={link.href} class="hover:text-white">{link.name}</a>
			{/each}
		</div>
	</div>
</nav>

<style>
	.bar {
		top: 0;
		left: 0;
		transition: all 0.3s ease-in-out;
	}
</style>
