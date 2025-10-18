<script lang="ts">
	import { cn } from '$lib/utils'

	const { className }: { className?: string } = $props()
</script>

<section id="about-section" class={cn([className, 'p-4'])}>
	<div class="flex flex-col items-center max-w-md m-auto text-center sm:max-w-[720px]">
		<h2 class="mb-2 text-4xl font-[900] uppercase sm:mb-4 sm:text-6xl">
			Our <span class="text-brand">Mission</span>
		</h2>
		<h3 class="text-xl sm:text-3xl font-light">
			Preventing child labor in Madagascar through access to education
		</h3>
		<span class="w-[90%] h-[1px] sm:h-0.5 bg-brand my-2 sm:my-4"></span>
		<p class="text-sm sm:text-lg">
			Founded in 2011, Elevatus has grown into a foundation dedicated to giving children in
			Madagascar the tools they need to rise above child labor, to end the cycle of generational
			poverty, and to build successful lives.
		</p>
	</div>
</section>
