<script lang="ts">
	import Hero from '$lib/components/layout/Hero.svelte'

	const hero = {
		src: '../img/hero/cancel.jpg',
		alt: 'Stop Sign',
		title: 'Donation Cancelled',
		subtitle: 'Your donation did not go through'
	}
</script>

<svelte:head>
	<title>Elevatus | Canceled</title>
</svelte:head>

<Hero {...hero} />

<div class="max-w-6xl px-8 py-12 mx-auto text-center">
	<p>
		If you encountered a problem, please reach out to us at <a
			href="mailto:correspondence.elevatus@gmail.com"
			class="text-orange-800 underline hover:text-orange-600">correspondence.elevatus@gmail.com</a
		>.
	</p>
</div>
