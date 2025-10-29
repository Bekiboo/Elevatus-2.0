<script lang="ts">
	import HighlightedText from '$lib/components/UI/HighlightedText.svelte'
	import { cn } from '$lib/utils'
	import { onMount, onDestroy } from 'svelte'
	import { slide } from 'svelte/transition'

	const { className }: { className?: string } = $props()

	let selectedImage: number = $state(0)
	let autoCycle: boolean = $state(true)
	let intervalId: ReturnType<typeof setInterval> | null = null

	const totalImages = 4
	const cycleDelay = 4000

	function startCycle() {
		stopCycle()
		intervalId = setInterval(() => {
			if (autoCycle) {
				selectedImage = (selectedImage + 1) % totalImages
			}
		}, cycleDelay)
	}

	function stopCycle() {
		if (intervalId) clearInterval(intervalId)
	}

	onMount(() => {
		startCycle()
	})

	onDestroy(() => {
		stopCycle()
	})

	function handleOutsideClick(event: MouseEvent) {
		const section = document.getElementById('challenges-section')
		if (section && !section.contains(event.target as Node)) {
			autoCycle = true
			startCycle()
		}
	}

	// réactive la détection du clic à l’extérieur
	onMount(() => {
		document.addEventListener('click', handleOutsideClick)
		return () => document.removeEventListener('click', handleOutsideClick)
	})
</script>

<section
	id="challenges-section"
	class={cn([className, 'flex flex-col items-center justify-center px-4 bg-dark text-light'])}
>
	<h2 class="text-4xl sm:text-6xl font-black text-center uppercase mb-4 leading-12 sm:leading-20">
		The <HighlightedText color="light" text="dark">Challenges</HighlightedText>
	</h2>
	<p class="max-w-3xl text-center mb-8 sm:mb-16">
		Child labor remains a pervasive issue in Madagascar, with many children forced to work in
		hazardous conditions instead of attending school. At Elevatus, we are dedicated to breaking this
		cycle by providing education, resources, and support to these children and their families.
	</p>

	<!-- Challenge Cards -->
	<div class="flex max-sm:flex-col w-[90vw] h-[800px] sm:h-[600px] overflow-hidden">
		{@render Challenge(
			'/img/child_redhood_breaking_rocks-l.jpg',
			'Child Labor',
			'Many children in Madagascar are forced to work in hazardous conditions, depriving them of their childhood and education.',
			0
		)}
		{@render Challenge(
			'/img/chronic_malnutrition.png',
			'Chronic Malnutrition',
			'Over 50% of children under five in Madagascar suffer from chronic malnutrition, impacting their growth and cognitive development.',
			1
		)}
		{@render Challenge(
			'/img/child_labor.jpg',
			'Barriers to Education',
			'Only 63% of children finish primary school, and 95% leave without basic reading skills.',
			2
		)}
		{@render Challenge(
			'/img/education_problem.jpg',
			'Failing Education System',
			'The nation invests just 2.5% of GDP in education, far below regional averages. Underqualified community teachers (FRAM) make up 63 percent of the primary teaching workforce.',
			3
		)}
	</div>
</section>

{#snippet Challenge(image: string, title: string, content: string, index: number)}
	<button
		onclick={() => {
			selectedImage = index
			autoCycle = false
			stopCycle()
		}}
		class="relative duration-500 ease-in-out h-[600px] overflow-hidden {selectedImage != index
			? `hover:opacity-100 max-sm:h-[36.6%] sm:w-[17%]`
			: `w-full h-full sm:w-1/2`} "
		aria-label={title}
	>
		<!-- Fixed-size image -->
		<div
			class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
			w-full sm:w-[50vw] sm:h-full h-[600px]"
			style="
				background-image: url({image});
				background-size: cover;
				background-position: top center;
				filter: grayscale({selectedImage != index ? '100%' : '0%'}) blur({selectedImage != index
				? '1px'
				: '0px'});
				transition: all 700ms cubic-bezier(0.4,0,0.2,1);
			"
		>
			<!-- Overlay -->
			<div class="absolute inset-0 bg-linear-to-b from-transparent from-0% to-dark"></div>
		</div>

		<!-- Text -->
		<div class="relative z-20 h-full w-full flex flex-col justify-end p-4">
			<h3 class="text-2xl text-left font-bold text-brand mb-2 sm:max-w-[16.6%]">{title}</h3>
			{#if selectedImage === index}
				<p in:slide={{ delay: 300 }} out:slide class="sm:w-[40vw] text-left">{content}</p>
			{/if}
		</div>
	</button>
{/snippet}
