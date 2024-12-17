<script lang="ts">
	import { intersectObs } from '$lib/intersectObs.svelte'
	import { Tween } from 'svelte/motion'

	const tweenOptions = {
		delay: 0,
		duration: 3000,
		easing: (t: number) => --t * t * t + 1
	}

	const firstTween = new Tween(0, tweenOptions)
	const secondTween = new Tween(0, tweenOptions)
	const thirdTween = new Tween(0, tweenOptions)
	const intersectorOptions = {
		root: null,
		threshold: 0.5,
		unobserveOnEnter: true
	}
</script>

<section
	use:intersectObs={intersectorOptions}
	oninview_change={(e: any) => {
		firstTween.target = 80
		secondTween.target = 8000
		thirdTween.target = 520
	}}
	class="flex justify-center max-w-2xl mx-auto lg:max-w-4xl maxsm:flex-col"
>
	<div class="w-56 h-32 px-8 py-4 text-lg text-center maxMd:w-48 lg:w-80 lg:text-2xl">
		<b>{Math.round(firstTween.current)}%</b> high school <br /> success rate <br />
		<small>vs. national 56%</small>
	</div>
	<div
		class="w-56 h-32 px-8 py-4 text-lg text-center maxMd:w-48 lg:w-80 lg:text-2xl maxsm:border-t-2 maxsm:border-b-2 sm:border-l-2 sm:border-r-2"
	>
		<b>{Math.round(secondTween.current)}</b> meals <br /> distributed in 2023
	</div>
	<div class="w-56 h-32 px-8 py-4 text-lg text-center maxMd:w-48 lg:w-80 lg:text-2xl">
		<b>{Math.round(thirdTween.current)}+</b> hours <br />of tutoring provided
	</div>
</section>
