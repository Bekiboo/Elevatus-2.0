<script lang="ts">
	import { cn } from '$lib/utils'

	const { className }: { className?: string } = $props()

	let selectedImage: number = $state(0)
</script>

<section
	class={cn([className, 'flex flex-col items-center justify-center px-4 bg-dark text-light'])}
>
	<h2 class="text-4xl sm:text-6xl font-extrabold text-center uppercase mb-4">
		The <span class="text-brand">Challenges</span>
	</h2>
	<p class="max-w-3xl text-center mb-8 sm:mb-16">
		Child labor remains a pervasive issue in Madagascar, with many children forced to work in
		hazardous conditions instead of attending school. At Elevatus, we are dedicated to breaking this
		cycle by providing education, resources, and support to these children and their families.
	</p>
	<div class="flex w-[90vw] h-96">
		{@render Challenge(
			'/img/child_labor.jpg',
			'Child Labor in Madagascar',
			'Many children in Madagascar are forced to work in hazardous conditions, depriving them of their childhood and education.',
			0
		)}
		{@render Challenge(
			'/img/child_labor.jpg',
			'Barriers to Education',
			'Poverty, lack of access to schools, and cultural factors often prevent children from attending school regularly.',
			1
		)}
		{@render Challenge(
			'/img/child_labor.jpg',
			'Health Risks',
			'Children engaged in labor are often exposed to dangerous environments that can lead to serious health issues.',
			2
		)}
		{@render Challenge(
			'/img/child_labor.jpg',
			'Community Impact',
			'Child labor affects not only the children but also their families and communities, perpetuating the cycle of poverty.',
			3
		)}
	</div>
</section>

{#snippet Challenge(image: string, title: string, content: string, index: number)}
	<button
		onclick={() => (selectedImage = index)}
		class="duration-500 ease-in-out h-96 {selectedImage != index
			? 'opacity-70 hover:opacity-100'
			: ''}"
		style="width: {selectedImage === index ? '50%' : 50 / 3 + '%'}"
		aria-label={title}
	>
		<div
			class="overflow-hidden w-full h-full bg-cover bg-center {selectedImage != index
				? 'grayscale-100 opacity-50 blur-[1px] hover:blur-none hover:grayscale-0'
				: ''}"
			style="background-image: url({image});
			transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);"
		>
			<div
				class="h-full w-full flex flex-col justify-end p-4 {selectedImage === index
					? ''
					: 'hidden'} "
			>
				<h3 class="text-2xl font-bold mb-2">{title}</h3>
				<p class={selectedImage === index ? '' : 'hidden sm:block'}>{content}</p>
			</div>
		</div>
	</button>
{/snippet}
