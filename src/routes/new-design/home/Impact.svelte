<script lang="ts">
	import { intersectObs } from '$lib/intersectObs.svelte'
	import { Tween } from 'svelte/motion'
	import { cn } from '$lib/utils'

	const { className }: { className?: string } = $props()

	const tweenOptions = {
		delay: 0,
		duration: 2000,
		easing: (t: number) => 1 - Math.pow(2, -10 * t)
	}

	const firstTween = new Tween(0, tweenOptions)
	const secondTween = new Tween(0, tweenOptions)
	const thirdTween = new Tween(0, tweenOptions)

	const intersectorOptions = {
		root: null,
		threshold: 0.5,
		unobserveOnEnter: true,
		onIntersect: (entry: any) => {
			if (entry.isIntersecting) {
				firstTween.target = 80
				secondTween.target = 8000
				thirdTween.target = 520
				slideIn = true
			}
		}
	}

	let slideIn = $state(false)
</script>

<section
	class={cn([className, 'bg-brand py-8 sm:py-16 text-white flex flex-col items-center px-4'])}
	use:intersectObs={intersectorOptions}
>
	<h2 class="text-4xl sm:text-6xl font-extrabold text-dark text-center uppercase mb-4">
		Your <span class="text-light">Impact</span> in 2024
	</h2>
	<p class="mb-6 sm:mb-12 text-center max-w-2xl mx-auto text-lg">
		With your support, Elevatus has made significant strides in combating child labor in Madagascar.
		Here are some of the key impacts we've achieved together this year:
	</p>
	<!-- opacity-0 
	class:slideIn
	style="transform: translateY(4rem)" -->
	<div class="flex justify-center max-sm:flex-col">
		<div
			class="flex flex-col items-center w-56 px-8 py-4 text-lg max-sm:content-center sm:w-52 lg:w-80 lg:text-2xl"
		>
			<div class="font-bold text-6xl font-saira">
				{Math.round(firstTween.current)}%
			</div>
			<div>
				high school <br /> success rate <br />
				<small>vs. national 56%</small>
			</div>
		</div>
		<div
			class="flex flex-col items-center w-56 px-8 py-4 text-lg max-sm:content-center sm:w-52 lg:w-80 lg:text-2xl max-sm:border-t-2 max-sm:border-b-2 sm:border-l-2 sm:border-r-2"
		>
			<div class="font-bold text-6xl font-saira">
				{Math.round(secondTween.current)}<span class="text-dark font-sans text-6xl">+</span>
			</div>
			<span>meals <br /> distributed</span>
		</div>
		<div
			class="flex flex-col items-center w-56 px-8 py-4 text-lg max-sm:content-center sm:w-52 lg:w-80 lg:text-2xl"
		>
			<div class="font-bold text-6xl font-saira">
				{Math.round(thirdTween.current)}<span class="text-dark font-sans text-6xl">+</span>
			</div>
			<span>hours of<br /> tutoring <br /> provided</span>
		</div>
	</div>
</section>
