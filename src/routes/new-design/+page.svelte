<script>
	import Mission from './home/Mission.svelte'
	import Response from './home/Response.svelte'
	import Donations from './home/Donations.svelte'
	import Impact from './home/Impact.svelte'
	import Challenges from './home/Challenges.svelte'
	import { onMount } from 'svelte'
	import Header from './home/Header.svelte'

	let mounted = $state(false)

	onMount(() => {
		mounted = true
	})
</script>

<Header />

<!-- <div
	class="container flex flex-col justify-center max-w-6xl gap-12 px-4 mx-auto my-12 sm:my-24 sm:gap-24"
> -->
<div class="flex flex-col justify-center">
	<Mission className="min-h-[60vh] py-16!" />

	<Impact className="min-h-[60vh] py-16!" />

	<Challenges className="min-h-[60vh] py-16!" />

	<Response className="min-h-[60vh] pt-16!" />
</div>
