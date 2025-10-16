<script lang="ts">
	import { page } from '$app/stores'
	import Hamburger from './Hamburger.svelte'
	import { onMount } from 'svelte'
	let scrolled = $state(false)

	onMount(() => {
		const handleScroll = () => (scrolled = window.scrollY > 20)
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	})

	let currentPage = $derived.by(() => {
		const segments = $page.url.pathname.split('/').filter(Boolean)
		return segments.length ? `/${segments[0]}` : '/'
	})

	// svelte-ignore non_reactive_update
	let barTranslate: number = 0 // cannot be a $state or we get infinite loop
	let barWidth: number = $state(0)

	let linksWrapper: HTMLDivElement | null = $state(null)

	let open = $state(false)

	const LINKS = [
		{ name: 'Home', href: '/', color: 'white' },
		{ name: 'Team', href: '/team', color: 'white' },
		{ name: 'Blog', href: '/blog', color: 'white' },
		{ name: 'Contact', href: '/contact', color: 'white' },
		{ name: 'Donate', href: '/donate', color: 'orange' }
	]

	$effect(() => {
		barTranslate = 0
		for (let i = 0; i < LINKS.length; i++) {
			if (LINKS[i].href.includes(currentPage)) break
			if (linksWrapper && linksWrapper.children[i]) {
				barTranslate += linksWrapper.children[i].clientWidth
			}
		}
	})
</script>

<!-- Desktop Nav -->
<nav
	class="hidden w-full px-12 py-1 font-bold text-white uppercase {scrolled
		? 'bg-amber-400'
		: 'bg-transparent'} md:block fixed z-50 duration-300"
>
	<div class="flex items-center justify-between max-w-6xl px-8 mx-auto">
		<!-- Logo -->
		<a href="/"><img class="h-16" src="../img/icons/white_logo.png" alt="logo" /></a>
		<div class="relative">
			{#if LINKS.some((link) => link.href === currentPage)}
				<!-- Top Bar -->
				<span
					class="absolute h-[.2rem] transition-all duration-300 ease-in-out {currentPage ==
					'/donate'
						? 'bg-red-500'
						: 'bg-white'} top-1"
					style="width: {barWidth}px; translate: {barTranslate}px;"
					aria-hidden="true"
				></span>
				<!-- Bottom Bar -->
				<span
					class="absolute h-[.2rem] transition-all duration-200 ease-in-out {currentPage ==
					'/donate'
						? 'bg-red-500'
						: 'bg-white'} bottom-1"
					style="width: {barWidth}px; translate: {barTranslate}px;"
					aria-hidden="true"
				></span>
			{/if}
			<!-- Links -->
			<div class="relative flex items-center w-96" bind:this={linksWrapper}>
				{#each LINKS as link}
					{@const { href, name, color } = link}
					{#if href === currentPage}
						<a
							class="p-2 hover:text-red-500"
							class:text-red-500={color === 'orange'}
							{href}
							bind:clientWidth={barWidth}
							aria-current={currentPage === href}>{name}</a
						>
					{:else}
						<a
							class="p-2 duration-100 ease-in-out hover:text-red-500"
							{href}
							class:text-red-500={color === 'orange'}>{name}</a
						>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</nav>

<!-- Mobile Nav -->
<div class="absolute z-50 m-2 md:hidden">
	<a href="/"><img class="h-16" src="../img/icons/Phoenix-white-stroke-heavy.png" alt="logo" /></a>
</div>
<button
	class="fixed right-0 z-50 {open ? 'text-orange-500' : 'text-white'} md:hidden"
	onclick={() => (open = !open)}
>
	<Hamburger {open} />
</button>
{#if open}
	<div
		class="fixed inset-0 top-0 z-30 w-full h-full bg-white/95 md:hidden"
		onclick={() => (open = false)}
		aria-hidden="true"
	></div>
	<nav
		class="fixed z-40 flex items-center justify-center w-screen h-screen duration-300 ease-in-out md:hidden"
		aria-labelledby="mobile-menu"
	>
		<div class="px-8 py-4">
			<div class="mt-6">
				{#each LINKS as link}
					{@const { href, name, color } = link}
					<a
						class="block px-3 py-2 text-4xl font-medium text-center uppercase underline-offset-4"
						{href}
						aria-current={currentPage === href}
						class:text-red-500={color === 'orange'}
						class:underline={currentPage === href}
						onclick={() => (open = false)}>{name}</a
					>
				{/each}
			</div>
		</div>
	</nav>
{/if}
