<script lang="ts">
	import HighlightedText from '$lib/components/UI/HighlightedText.svelte'
	import { cn } from '$lib/utils'

	const { className }: { className?: string } = $props()
</script>

<section id="about-section" class={cn([className, '	flex flex-col items-center'])}>
	<div
		class="flex flex-col items-center justify-center max-w-md m-auto text-center sm:max-w-[720px] min-h-80"
	>
		<h2 class="text-4xl sm:text-6xl font-black text-dark text-center uppercase mb-4">
			Our
			<HighlightedText color="dark" text="light">Response</HighlightedText>
		</h2>

		<p class="max-w-3xl text-center mb-8 sm:mb-16">
			Breaking the cycle through education, nutrition, and skill development — <b>
				because every child deserves their childhood back
			</b>. Elevatus programs directly advance the
			<a href="https://sdgs.un.org/goals" target="_blank" class="underline hover:text-brand">
				United Nations Sustainable Development Goals (SDGs)
			</a>, global benchmarks for ending poverty and building a better future for every child.
		</p>
	</div>
	<div class="relative h-[80vh] overflow-hidden bg-dark">
		<img
			src="img/party_youth_center.png"
			class="blur-[0px] object-cover opacity-100 w-screen h-full"
			alt="Party Youth Center"
		/>
		<!-- Overlay -->
		<div class="absolute inset-0 bg-linear-to-t from-transparent from-50% to-dark to-120%"></div>

		<div
			class="absolute top-1/5 lg:top-1/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-light p-4 w-full text-center"
		>
			<h3
				class="text-5xl md:text-5xl lg:text-6xl font-bold mb-2 uppercase font-saira tracking-widest"
			>
				<div class="sm:mb-4 text-6xl md:text-7xl lg:text-9xl">Three pillars</div>
				<div class="flex max-sm:flex-col w-min justify-center mx-auto">
					<HighlightedText color="accent" text="light">Education</HighlightedText>
					<HighlightedText color="secondary" text="light">Nutrition</HighlightedText>
					<HighlightedText color="brand" text="light">Skills</HighlightedText>
				</div>
			</h3>
		</div>
	</div>
</section>
