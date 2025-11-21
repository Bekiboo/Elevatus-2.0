<script lang="ts">
	import Mission from '../(public)/home/Mission.svelte'
	import Response from '../(public)/home/Response.svelte'
	import Donations from '../(public)/home/Donations.svelte'
	import Impact from '../(public)/home/Impact.svelte'
	import Challenges from '../(public)/home/Challenges.svelte'
	import { onMount } from 'svelte'
	import Header from '../(public)/home/Header.svelte'
	import Button from '$lib/components/UI/Button.svelte'
	import { MetaTags } from 'svelte-meta-tags'
	import { fade } from 'svelte/transition'

	let isScrolled = $state(false)
</script>

<svelte:head>
	<title>Elevatus | Home Page</title>
</svelte:head>

<MetaTags
	title="Fighting Child Labor in Madagascar - Elevatus"
	description="We give children in Madagascar the tools they need to avoid being trafficked and to be successful in life."
	openGraph={{
		url: 'https://www.elevatus-foundation.org/home',
		title: 'Fighting Child Labor in Madagascar - Elevatus',
		description:
			'We give children in Madagascar the tools they need to avoid being trafficked and to be successful in life.',
		images: [
			{
				url: 'https://www.elevatus-foundation.org/img/hero/group_picture_zoo.jpg',
				width: 800,
				height: 600,
				alt: 'Sponsored Children'
			}
		],
		siteName: 'Elevatus' // Used to be site-name, check if causing a bug
	}}
/>

<Header onScrollChange={(scrolled) => (isScrolled = scrolled)} />

<div class="flex flex-col justify-center relative">
	<Mission className="min-h-[60vh] py-16!" />

	<Impact className="min-h-[60vh] py-16!" />

	<Challenges className="min-h-[60vh] py-16!" />

	<Response className="min-h-[60vh] pt-16!" />

	{#if isScrolled}
		<div
			in:fade={{ duration: 200 }}
			out:fade={{ duration: 200 }}
			class="sticky bottom-8 z-[25] flex justify-end pointer-events-none -mb-16 lg:-mb-8"
		>
			<div class="pointer-events-auto mr-8">
				<Button href="/donate" size="medium" class="shadow-[0_12px_30px_rgba(0,0,0,0.5)]"
					>Donate</Button
				>
			</div>
		</div>
	{/if}
</div>
