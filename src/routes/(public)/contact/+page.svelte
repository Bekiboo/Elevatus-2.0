<script lang="ts">
	import Hero from '$lib/components/layout/Hero.svelte'

	const hero = {
		src: 'img/hero/contact.jpg',
		alt: 'Package with "You\'ve got mail" written on it',
		title: 'Contact Us',
		subtitle: "We'd love to hear from you"
	}
</script>

<svelte:head>
	<title>Elevatus | Contact Us</title>
</svelte:head>

<Hero {...hero} />

<div class="max-w-4xl px-8 py-16 mx-auto">
	<div class="text-center">
		<h2 class="text-4xl sm:text-5xl font-black text-dark mb-6 uppercase">
			Get in <span class="text-brand">Touch</span>
		</h2>
		<p class="text-lg text-dark/70 mb-12 max-w-2xl mx-auto leading-relaxed">
			Have questions or want to learn more about our work? Feel free to reach out to us via email.
		</p>

		<div class="bg-brand/5 border-2 border-brand/20 p-12 inline-block">
			<p class="text-dark/60 mb-4 text-sm uppercase tracking-wider font-semibold">Email us at:</p>
			<a
				href="mailto:correspondence.elevatus@gmail.com"
				class="text-2xl sm:text-3xl font-black text-brand hover:text-secondary transition-colors duration-300 underline decoration-2 underline-offset-4"
			>
				correspondence.elevatus@gmail.com
			</a>
		</div>

		<p class="text-dark/50 mt-12 text-sm uppercase tracking-wider font-semibold">
			We'll do our best to respond within a week.
		</p>
	</div>
</div>
