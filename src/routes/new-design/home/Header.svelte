<script>
	import { fade } from 'svelte/transition'
	import { onMount } from 'svelte'

	let mounted = $state(false)
	let bgParallax = $state(54)
	const bgUrl = 'http://www.elevatus-foundation.org/img/child_labor.jpg'

	onMount(() => {
		const img = new Image()
		img.src = bgUrl
		img.onload = () => {
			mounted = true
		}
	})
</script>

<div class="w-full h-screen bg-dark flex flex-col items-center justify-center">
	{#if mounted}
		<h1
			in:fade={{ duration: 1000, delay: 200 }}
			class="mx-auto text-[10rem] sm:text-[18rem] font-light uppercase
			bg-clip-text text-transparent bg-cover bg-center leading-none text-center
			font-saira"
			style="
				background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), url('{bgUrl}');
				background-size: 100%;
				background-position: 100% {bgParallax}%;
			"
		>
			<span class="tracking-tight">Ending</span>
			<br />
			<div class="sm:-mt-20 -mt-10">Child</div>
			<div class="sm:-mt-20 -mt-10 tracking-wide">Labor</div>
		</h1>

		<div in:fade={{ duration: 300, delay: 1000 }} class="flex gap-4 max-sm:mt-8">
			<a
				href="/donate"
				class="w-40 sm:w-60 py-4 max-sm:text-sm sm:py-6 bg-brand text-white font-semibold rounded-full hover:bg-[#f59e0b] transition duration-200 cursor-pointer uppercase flex items-center justify-center"
			>
				Donate
			</a>
			<button
				class="w-40 sm:w-60 py-4 max-sm:text-sm sm:py-6 text-white hover:text-dark font-semibold rounded-full hover:bg-gray-200 border transition duration-200 cursor-pointer uppercase"
				onclick={() => {
					window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
				}}>Learn More</button
			>
		</div>
	{/if}
</div>

<svelte:window
	on:scroll={() => {
		bgParallax = 54 - window.scrollY * 0.33
	}}
/>
