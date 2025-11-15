<script lang="ts">
	import { page } from '$app/stores'
	import { fade } from 'svelte/transition'
	import Hamburger from './Hamburger.svelte'
	import { onMount } from 'svelte'
	let scrolled = $state(false)

	onMount(() => {
		scrolled = window.scrollY > 20
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
	let activeDropdown = $state<string | null>(null)

	const LINKS = [
		{ name: 'Home', href: '/', color: 'white' },
		{
			name: 'Programs',
			href: '/programs',
			color: 'white',
			sublinks: [
				{ name: 'Education', href: '/programs/education' },
				{ name: 'Nutrition', href: '/programs/nutrition' },
				{ name: 'Skills', href: '/programs/skills' }
			]
		},
		{ name: 'Team', href: '/team', color: 'white' },
		{ name: 'Blog', href: '/blog', color: 'white' },
		{ name: 'Contact', href: '/contact', color: 'white' },
		{ name: 'Donate', href: '/donate', color: 'orange' }
	]

	function toggleDropdown(linkName: string) {
		activeDropdown = activeDropdown === linkName ? null : linkName
	}

	function closeDropdown() {
		activeDropdown = null
	}

	$effect(() => {
		barTranslate = 0
		for (let i = 0; i < LINKS.length; i++) {
			if (LINKS[i].href.includes(currentPage)) break
			if (linksWrapper && linksWrapper.children[i]) {
				barTranslate += linksWrapper.children[i].clientWidth
			}
		}
	})

	let mounted = $state(false)

	onMount(() => {
		mounted = true

		// Click outside listener for dropdown
		const handleClickOutside = (event: MouseEvent) => {
			if (activeDropdown && linksWrapper && !linksWrapper.contains(event.target as Node)) {
				activeDropdown = null
			}
		}

		document.addEventListener('click', handleClickOutside)
		return () => document.removeEventListener('click', handleClickOutside)
	})
</script>

<!-- Desktop Nav -->
{#if mounted}
	<nav
		in:fade={{ duration: 300, delay: 1000 }}
		class="hidden w-full px-12 py-1 font-bold text-white md:block fixed z-50 duration-300 {scrolled &&
			'shadow-2xl bg-dark/80 backdrop-blur-sm'}"
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
							? 'bg-brand'
							: 'bg-white'} top-1"
						style="width: {barWidth}px; translate: {barTranslate}px;"
						aria-hidden="true"
					></span>
					<!-- Bottom Bar -->
					<span
						class="absolute h-[.2rem] transition-all duration-200 ease-in-out {currentPage ==
						'/donate'
							? 'bg-brand'
							: 'bg-white'} bottom-1"
						style="width: {barWidth}px; translate: {barTranslate}px;"
						aria-hidden="true"
					></span>
				{/if}
				<!-- Links -->
				<div class="relative flex items-center" bind:this={linksWrapper}>
					{#each LINKS as link}
						{@const { href, name, color } = link}
						{#if link.sublinks}
							<div class="relative">
								{#if href === currentPage}
									<button
										class="p-2 hover:text-brand uppercase font-light {name == 'Donate' &&
											'text-brand font-bold!'}"
										bind:clientWidth={barWidth}
										aria-current={currentPage === href}
										onclick={() => toggleDropdown(name)}
									>
										{name}
									</button>
								{:else}
									<button
										class="p-2 duration-100 ease-in-out hover:text-brand uppercase font-light {name ==
											'Donate' && 'text-brand font-bold!'}"
										onclick={() => toggleDropdown(name)}
									>
										{name}
									</button>
								{/if}
								<!-- Dropdown -->
								{#if activeDropdown === name}
									<div
										class="absolute flex flex-col gap-2 p-4 mt-2 bg-light shadow-lg min-w-[150px] z-50"
									>
										{#each link.sublinks as sublink}
											<a
												href={sublink.href}
												class="px-3 py-2 text-sm font-medium uppercase text-dark hover:bg-gray-100"
												onclick={closeDropdown}>{sublink.name}</a
											>
										{/each}
									</div>
								{/if}
							</div>
						{:else if href === currentPage}
							<a
								class="p-2 hover:text-brand uppercase font-light {name == 'Donate' &&
									'text-brand font-bold!'}"
								{href}
								bind:clientWidth={barWidth}
								aria-current={currentPage === href}
							>
								{name}
							</a>
						{:else}
							<a
								class="p-2 duration-100 ease-in-out uppercase hover:text-brand font-light {name ==
									'Donate' && 'text-brand font-bold!'}"
								{href}>{name}</a
							>
						{/if}
					{/each}
				</div>
			</div>
		</div>
	</nav>
{/if}

<!-- Mobile Nav -->
<div class="absolute z-50 m-2 md:hidden">
	<a href="/"><img class="h-16" src="../img/icons/Phoenix-white-stroke-heavy.png" alt="logo" /></a>
</div>
<button
	class="fixed right-2 top-2 z-50 {open
		? 'text-brand'
		: 'text-white bg-dark rounded-full shadow-lg shadow-gray-900'} md:hidden"
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
						class:text-brand={color === 'orange'}
						class:underline={currentPage === href}
						onclick={() => (open = false)}>{name}</a
					>
				{/each}
			</div>
		</div>
	</nav>
{/if}
