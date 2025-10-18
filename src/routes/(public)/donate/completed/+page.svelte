<script lang="ts">
	import Hero from '$lib/components/layout/Hero.svelte'

	const hero = {
		src: '../img/hero/completed.jpg',
		alt: 'Group of Malagasy children waving',
		title: 'Donation Completed',
		subtitle: 'Your donation went through'
	}
</script>

<svelte:head>
	<title>Elevatus | Compeleted</title>
</svelte:head>

<Hero {...hero} />

<div class="max-w-6xl px-8 py-12 mx-auto text-center">
	<p>
		Thank you infinitely for your generous donation. Please, use our <a
			href="/contact"
			class="text-orange-800 underline hover:text-orange-600">Contact Form</a
		> if you have any question.
	</p>
</div>
