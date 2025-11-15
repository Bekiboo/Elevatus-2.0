<script lang="ts">
	import Hero from '$lib/components/layout/Hero.svelte'

	const hero = {
		src: 'img/hero/four_kids.jpg',
		alt: 'Under Construction',
		title: 'Education',
		subtitle: 'Empowering Children, Transforming Futures'
	}
</script>

<svelte:head>
	<title>Elevatus | Education</title>
</svelte:head>

<Hero {...hero} />

<!-- Our Team -->
<section class="flex flex-col items-center w-full max-w-6xl gap-8 px-8 mx-auto my-8"></section>
