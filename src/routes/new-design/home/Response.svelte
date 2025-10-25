<script lang="ts">
	import { cn } from '$lib/utils'

	const { className }: { className?: string } = $props()
</script>

<section id="about-section" class={cn([className, 'p-4 flex items-center'])}>
	<div class="flex flex-col items-center max-w-md m-auto text-center sm:max-w-[720px]">
		<h2 class="text-4xl sm:text-6xl font-extrabold text-dark text-center uppercase mb-4">
			Our
			<span class="relative z-0 text-light"
				>Response
				<span
					class="absolute opacity-100 -z-10 w-[105%] top-0 -left-2 h-full -rotate-1.5 bg-accent duration-800"
				></span></span
			>
		</h2>

		<p class="max-w-3xl text-center mb-8 sm:mb-16">
			Breaking the cycle through education, nutrition, and safety — <b>
				because every child deserves their childhood back
			</b>. Elevatus programs directly advance the
			<a href="https://sdgs.un.org/goals" target="_blank" class="underline hover:text-brand">
				United Nations Sustainable Development Goals (SDGs)
			</a>, global benchmarks for ending poverty and building a better future for every child.
		</p>
	</div>
</section>
