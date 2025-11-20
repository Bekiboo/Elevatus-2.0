<script lang="ts">
	import ExternalLink from '$lib/components/icons/ExternalLink.svelte'
	import { cn } from '$lib/utils'
	import { intersectObs } from '$lib/intersectObs.svelte'

	const { className }: { className?: string } = $props()

	// Track visibility state for each challenge card
	let visibleCards: boolean[] = $state([false, false, false, false])

	const challenges = [
		{
			image: '/img/child_redhood_breaking_rocks-l.jpg',
			title: 'Child Labor',
			statistic: '47%',
			statisticLabel: 'of children ages 5-17',
			description:
				'According to the U.S. Department of Labor, 47% of children ages 5 to 17 in Madagascar are engaged in child labor, including 32% in hazardous work. Children mainly work in the informal sector and agriculture, with hazardous tasks in agriculture, mining, and fishing. A recent study in Antananarivo reported that nearly half of street children rely on begging for survival.',
			source:
				'https://www.dol.gov/sites/dolgov/files/ILAB/child_labor_reports/tda2021/Madagascar.pdf'
		},
		{
			image: '/img/girl_with_soccer_ball.jpg',
			title: 'Chronic Malnutrition',
			statistic: '40%',
			statisticLabel: 'of children affected',
			description:
				'The World Food Programme reports that nearly 40% of children suffer from chronic malnutrition, in a country where over 90% of the population lives on less than US$3.10 per day. Food insecurity is driven by limited crop diversification, reliance on rain-fed agriculture, low incomes, and rising food prices. Increasing climate shocks further damage agriculture, infrastructure, and livelihoods.',
			source: 'https://www.wfp.org/countries/madagascar'
		},
		{
			image: '/img/kids_on_cart.jpg',
			title: 'Barriers to Education',
			statistic: '95%',
			statisticLabel: 'cannot read proficiently',
			description:
				'According to the World Bank (2025), only 63.3% of girls and 57.6% of boys complete primary school. By the end of primary school, 95% of children cannot read proficiently. The education system faces high repetition rates—25.3% in public schools, double the Sub-Saharan Africa average.',
			source:
				'https://www.worldbank.org/en/news/press-release/2025/07/22/madagascar-to-boost-learning-outcomes-for-4-7-million-students'
		},
		{
			image: '/img/kids_waiting_in_school_uniforms.jpg',
			title: 'Failing Education System',
			statistic: '2.5%',
			statisticLabel: 'of GDP on education',
			description:
				'The World Bank (2025) highlights systemic challenges: 63% of primary teachers are underqualified community teachers (FRAM), fully financed by parents. Infrastructure is severely inadequate, with 1,000–2,000 classrooms destroyed by cyclones each year. National investment in education is low at 2.5% of GDP, below the regional average of 3.7%.',
			source:
				'https://www.worldbank.org/en/news/press-release/2025/07/22/madagascar-to-boost-learning-outcomes-for-4-7-million-students'
		}
	]
</script>

<section
	id="challenges-section"
	class={cn([className, 'flex flex-col items-center justify-center px-4 bg-dark text-light'])}
>
	<h2 class="text-4xl sm:text-6xl font-black text-center uppercase mb-4 leading-12 sm:leading-20">
		The <span class="uppercase bg-light text-dark px-2 pb-1.5">Challenges</span>
	</h2>
	<p class="max-w-3xl text-center mb-8 sm:mb-16 text-lg">
		Madagascar faces critical challenges that trap children in cycles of poverty and exploitation.
		These stark realities demand urgent action and sustained support.
	</p>

	<!-- Challenge Cards Grid -->
	<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl">
		{#each challenges as challenge, index}
			<div
				class="relative overflow-hidden rounded-lg shadow-2xl min-h-[500px] lg:min-h-[600px]"
				use:intersectObs={{
					root: null,
					threshold: Array.from({ length: 21 }, (_, i) => i / 20),
					onIntersect: (entry) => {
						const visiblePx = entry.intersectionRect.height
						const viewportHeight = window.innerHeight

						visibleCards[index] = visiblePx >= viewportHeight * 0.7
					},
					onLeave: () => {
						visibleCards[index] = false
					}
				}}
			>
				<!-- Background Image -->
				<div
					class="absolute inset-0 bg-cover bg-center transition-transform duration-700"
					style="background-image: url({challenge.image})"
				></div>

				<!-- Content Overlay with fade effect -->
				<div
					class="relative z-10 flex flex-col m-4 lg:m-12 transition-all duration-300 ease-out {visibleCards[
						index
					]
						? 'opacity-100 translate-y-0 backdrop-blur-sm'
						: 'opacity-0 translate-y-8 backdrop-blur-none'}"
				>
					<div class="bg-black/60 rounded-lg flex-1 flex flex-col p-4">
						<!-- Statistic - Large Impact Number -->
						<div class="mb-4">
							<div
								class="text-8xl lg:text-9xl font-black font-saira text-brand leading-none drop-shadow-2xl"
							>
								{challenge.statistic}
							</div>
							<div class="text-xl lg:text-2xl font-semibold text-secondary mt-2 drop-shadow-lg">
								{challenge.statisticLabel}
							</div>
						</div>
						<!-- Title -->
						<h3 class="text-3xl lg:text-4xl font-black text-light mb-4 uppercase drop-shadow-lg">
							{challenge.title}
						</h3>
						<!-- Description with enhanced backdrop -->
						<div class="mb-6">
							<p class="text-md lg:text-xl text-light leading-relaxed max-w-2xl">
								{challenge.description}
							</p>
						</div>
						<!-- Source Link -->
						<a
							href={challenge.source}
							target="_blank"
							rel="noopener noreferrer"
							class="inline-flex items-center gap-2 text-secondary hover:text-brand transition-colors duration-300 font-semibold px-4 py-2 w-fit bg-black/60 backdrop-blur rounded-lg"
						>
							<span>View Source</span>
							<ExternalLink size="4" color="currentColor" />
						</a>
					</div>
				</div>

				<!-- Accent Border -->
				<div
					class="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-brand to-secondary"
				></div>
			</div>
		{/each}
	</div>
</section>
