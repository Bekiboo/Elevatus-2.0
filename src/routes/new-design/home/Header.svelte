<script lang="ts">
	import { fade } from 'svelte/transition'
	import { onMount } from 'svelte'
	import Button from '$lib/components/UI/Button.svelte'
	import { Tween } from 'svelte/motion'

	let mounted = $state(false)
	let bgParallax = $state(54)
	const bgUrl = 'http://www.elevatus-foundation.org/img/child_labor.jpg'

	const blurTween = new Tween(1, {
		duration: 6000,
		easing: (t: number) => 1 - Math.pow(2, -10 * t)
	})

	onMount(() => {
		const img = new Image()
		img.src = bgUrl
		blurTween.target = 0
		img.onload = () => {
			mounted = true
		}
	})
	let isLoading = $state(false)
</script>

<div class="relative w-full h-screen bg-dark flex flex-col items-center justify-center">
	{#if mounted}
		<h1
			in:fade={{ duration: 300, delay: 500 }}
			class="mx-auto mb-16 text-[10rem] sm:text-[30vh] font-light uppercase
			bg-clip-text text-transparent bg-cover bg-center leading-[75%] text-center font-saira"
			style="
				background-image: linear-gradient(rgba(255,255,255,{blurTween.current}), rgba(255,255,255,{blurTween.current})), url('{bgUrl}');
				background-size: 100%;
				background-position: 100% {bgParallax}%;
			"
		>
			<span class="tracking-tight">Ending</span>
			<br />
			<div>Child</div>
			<div class="tracking-wide">Labor</div>
		</h1>

		<div
			in:fade={{ duration: 300, delay: 1000 }}
			class="absolute bottom-8 flex gap-4 sm:gap-8 mt-8"
		>
			<Button
				onclick={() => {
					isLoading = true
					setTimeout(() => {
						isLoading = false
					}, 1000)
				}}
				{isLoading}>Donate</Button
			>
			<Button
				variant="outline"
				onclick={() => {
					window.scrollBy({ top: window.innerHeight - 80, behavior: 'smooth' })
				}}>Learn More</Button
			>
		</div>
	{/if}
</div>

<svelte:window
	on:scroll={() => {
		bgParallax = 54 - window.scrollY * 0.33
	}}
/>
