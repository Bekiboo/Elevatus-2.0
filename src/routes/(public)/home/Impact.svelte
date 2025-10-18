<script lang="ts">
	import { intersectObs } from '$lib/intersectObs.svelte'
	import { Tween } from 'svelte/motion'

	const tweenOptions = {
		delay: 0,
		duration: 2000,
		easing: (t: number) => --t * t * t + 1
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
	use:intersectObs={intersectorOptions}
	class="flex justify-center max-w-xl mx-auto opacity-0 md:max-w-2xl lg:max-w-3xl max-sm:flex-col"
	style="transform: translateY(4rem)"
	class:slideIn
>
	<div
		class="w-56 h-32 px-8 py-4 text-lg text-center max-sm:content-center sm:w-52 lg:w-80 lg:text-2xl"
	>
		<b>{Math.round(firstTween.current)}%</b> high school <br /> success rate <br />
		<small>vs. national 56%</small>
	</div>
	<div
		class="w-56 h-32 px-8 py-4 text-lg text-center max-sm:content-center sm:w-52 lg:w-80 lg:text-2xl max-sm:border-t-2 max-sm:border-b-2 sm:border-l-2 sm:border-r-2"
	>
		<b>{Math.round(secondTween.current)}</b> meals <br /> distributed
	</div>
	<div
		class="w-56 h-32 px-8 py-4 text-lg text-center max-sm:content-center sm:w-52 lg:w-80 lg:text-2xl"
	>
		<b>{Math.round(thirdTween.current)}+</b> hours <br />of tutoring provided
	</div>
</section>
