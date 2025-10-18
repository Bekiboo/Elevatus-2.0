<script lang="ts">
	import { intersectObs } from '$lib/intersectObs.svelte'

	let { program, index } = $props()

	const { src, title, body } = program
	const odd = index % 2 == 0

	const blobValues = [
		['70% 30% 30% 70% / 30% 30% 70% 70%'],
		['70% 30% 30% 70% / 70% 70% 30% 30%'],
		['30% 70% 70% 30% / 70% 70% 30% 30%'],
		['30% 70% 70% 30% / 30% 30% 70% 70%']
	]

	const random = Math.floor(Math.random() * blobValues.length)

	const intersectorOptions = {
		root: null,
		threshold: 0.33,
		unobserveOnEnter: true,
		onIntersect: (entry: any) => {
			if (entry.isIntersecting) {
				slideIn = true
			}
		}
	}

	let slideIn = $state(false)
</script>

<div
	use:intersectObs={intersectorOptions}
	class="flex flex-col items-center opacity-0
  {odd ? 'md:flex-row' : 'md:flex-row-reverse'}"
	style="transform: translateX({odd ? '4rem' : '-4rem'});"
	class:slideIn
>
	<img
		class="object-cover h-96 w-96 md:basis-1/3"
		style="border-radius: {blobValues[random]}"
		{src}
		alt={title}
	/>
	<div
		class="md:basis-2/3 flex flex-col md:px-16
	{odd ? 'md:text-left' : 'md:text-right'} 
	{odd ? 'md:items-start' : 'md:items-end'}"
	>
		<h5 class="mb-2 text-4xl font-bold text-slate-600">{title}</h5>
		{#each body as paragraph}
			<p class="mb-3 font-normal text-gray-700 max-w-[40ch]">{paragraph}</p>
		{/each}
	</div>
</div>
