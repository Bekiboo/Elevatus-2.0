<script lang="ts">
	import { intersectObs } from '$lib/intersectObs.svelte'
	import { Tween } from 'svelte/motion'
	import { cn } from '$lib/utils'
	import Button from '$lib/components/UI/Button.svelte'

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

	const intersectorOptionsTitle = {
		root: null,
		threshold: 0.5,
		unobserveOnEnter: true,
		onIntersect: (entry: any) => {
			if (entry.isIntersecting) {
				appear = true
			}
		}
	}

	let slideIn = $state(false)
	let appear = $state(false)
</script>

<section
	class={cn([className, 'bg-brand py-8 sm:py-16 text-dark flex flex-col items-center px-4'])}
	use:intersectObs={intersectorOptions}
>
	<h2 class="text-4xl sm:text-6xl font-extrabold text-dark text-center uppercase mb-4">
		Your
		<span class="relative z-0 text-brand"
			>Impact
			<span
				class="absolute opacity-0 -z-10 w-full top-0 -left-2 h-full -rotate-2 bg-light duration-800"
				use:intersectObs={intersectorOptionsTitle}
				class:opacity-100={appear}
			></span></span
		>in 2024
	</h2>
	<p class="mb-6 sm:mb-12 text-center max-w-2xl mx-auto text-lg">
		With your support, Elevatus has made significant strides in combating child labor in Madagascar.
		Here are some of the key impacts we've achieved together this year:
	</p>

	<div class="flex gap-x-24 gap-y-12 justify-center flex-wrap mb-6 font-medium">
		<div
			class="relative flex flex-col items-start w-56 px-8 py-4 text-lg max-sm:content-center lg:text-2xl"
		>
			<div class="z-10 font-bold text-light text-8xl font-saira">
				{Math.round(firstTween.current)}%
			</div>
			<div class="z-10">
				high school <br /> success rate <br />
				<small>vs. national 56%</small>
			</div>
			<div class="absolute w-16 mx-auto h-full left-0 bg-brand-light mt-auto"></div>
			<div class="absolute w-4/5 mx-auto h-1.5 bottom-0 bg-accent mt-auto"></div>
		</div>
		<div
			class="relative flex flex-col items-start w-56 px-8 py-4 text-lg max-sm:content-center lg:text-2xl"
		>
			<div class="z-10 font-bold text-light text-8xl font-saira">
				{Math.round(secondTween.current)}<span class="font-sans text-8xl">+</span>
			</div>
			<div class="z-10">meals <br /> distributed</div>
			<div class="absolute w-16 mx-auto h-full left-0 bg-brand-light mt-auto"></div>
			<div class="absolute w-4/5 mx-auto h-1.5 bottom-0 bg-accent mt-auto"></div>
		</div>
		<div
			class="relative flex flex-col items-start w-56 px-8 py-4 text-lg max-sm:content-center lg:text-2xl"
		>
			<div class="z-10 font-bold text-light text-8xl font-saira">
				{Math.round(thirdTween.current)}<span class="font-sans text-8xl">+</span>
			</div>
			<div class="z-10">hours of<br /> tutoring <br /> provided</div>
			<div class="absolute w-16 mx-auto h-full left-0 bg-brand-light mt-auto"></div>
			<div class="absolute w-4/5 mx-auto h-1.5 bottom-0 bg-accent mt-auto"></div>
		</div>
	</div>
	<Button href="/impact" size="small" variant="outline" class="mt-8">See more impacts</Button>
</section>

{#snippet Stat()}
	<div class="flex gap-12 justify-center flex-wrap mb-6 font-medium">
		<div
			class="relative flex flex-col items-start w-56 px-8 py-4 text-lg max-sm:content-center lg:text-2xl"
		>
			<div class="z-10 font-bold text-light text-8xl font-saira">
				{Math.round(firstTween.current)}%
			</div>
			<div class="z-10">
				high school <br /> success rate <br />
				<small>vs. national 56%</small>
			</div>
			<div class="absolute w-16 mx-auto h-full left-0 bg-brand-light mt-auto"></div>
			<div class="absolute w-4/5 mx-auto h-1.5 bottom-0 bg-accent mt-auto"></div>
		</div>
		<div
			class="relative flex flex-col items-start w-56 px-8 py-4 text-lg max-sm:content-center lg:text-2xl"
		>
			<div class="z-10 font-bold text-light text-8xl font-saira">
				{Math.round(secondTween.current)}<span class="font-sans text-8xl">+</span>
			</div>
			<div class="z-10">meals <br /> distributed</div>
			<div class="absolute w-16 mx-auto h-full left-0 bg-brand-light mt-auto"></div>
			<div class="absolute w-4/5 mx-auto h-1.5 bottom-0 bg-accent mt-auto"></div>
		</div>
		<div
			class="relative flex flex-col items-start w-56 px-8 py-4 text-lg max-sm:content-center lg:text-2xl"
		>
			<div class="z-10 font-bold text-light text-8xl font-saira">
				{Math.round(thirdTween.current)}<span class="font-sans text-8xl">+</span>
			</div>
			<div class="z-10">hours of<br /> tutoring <br /> provided</div>
			<div class="absolute w-16 mx-auto h-full left-0 bg-brand-light mt-auto"></div>
			<div class="absolute w-4/5 mx-auto h-1.5 bottom-0 bg-accent mt-auto"></div>
		</div>
	</div>
{/snippet}
