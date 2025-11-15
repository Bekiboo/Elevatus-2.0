<script lang="ts">
	import Mission from '../(public)/home/Mission.svelte'
	import Response from '../(public)/home/Response.svelte'
	import Donations from '../(public)/home/Donations.svelte'
	import Impact from '../(public)/home/Impact.svelte'
	import Challenges from '../(public)/home/Challenges.svelte'
	import { onMount } from 'svelte'
	import Header from '../(public)/home/Header.svelte'
	import { MetaTags } from 'svelte-meta-tags'
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

<Header />

<div class="flex flex-col justify-center">
	<Mission className="min-h-[60vh] py-16!" />

	<Impact className="min-h-[60vh] py-16!" />

	<Challenges className="min-h-[60vh] py-16!" />

	<Response className="min-h-[60vh] pt-16!" />
</div>
