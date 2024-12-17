<script lang="ts">
	import Header from './home/Header.svelte'
	import Mission from './home/Mission.svelte'
	import Programs from './home/Programs.svelte'
	import Donations from './home/Donations.svelte'
	import { MetaTags } from 'svelte-meta-tags'
	import Impact from './home/Impact.svelte'
	import ProblemSolution from './home/ProblemSolution.svelte'
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

<div
	class="container flex flex-col justify-center max-w-6xl gap-12 px-4 mx-auto my-12 sm:my-24 sm:gap-24"
>
	<Mission />

	<Impact />

	<ProblemSolution />

	<Programs />

	<Donations />
</div>
