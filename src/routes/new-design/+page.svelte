<script>
	import Mission from './home/Mission.svelte'
	import Programs from './home/Programs.svelte'
	import Donations from './home/Donations.svelte'
	import Impact from './home/Impact.svelte'
	import ProblemSolution from './home/ProblemSolution.svelte'
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
<div class="flex flex-col justify-center gap-12 my-12 sm:my-24 sm:gap-24">
	<Mission />

	<Impact />

	<ProblemSolution />

	<Programs />

	<Donations />
</div>
