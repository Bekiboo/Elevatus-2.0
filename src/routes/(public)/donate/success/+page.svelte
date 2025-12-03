<script lang="ts">
	import Button from '$lib/components/UI/Button.svelte'
	import Hero from '$lib/components/layout/Hero.svelte'

	const hero = {
		src: '/img/hero/donate.jpg',
		alt: 'Thank you for your donation',
		title: 'Thank You!',
		subtitle: 'Your generosity makes a difference'
	}
</script>

<Hero {...hero} />

<div class="container mx-auto px-4 py-16 max-w-2xl text-center">
	<div class="bg-dark text-light rounded-lg shadow-lg p-12">
		<div class="text-6xl mb-6">✓</div>
		<h1 class="text-4xl font-black mb-4">Payment Successful!</h1>
		<p class="text-lg /70 mb-8">
			Thank you for your generous donation. Your support helps us provide education, nutrition, and
			hope to children in Madagascar.
		</p>
		<p class="/60 mb-8">
			You will receive a confirmation email shortly with your donation receipt.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<Button href="/">Return to Home</Button>
			<Button href="/blog" variant="outline">Read Our Blog</Button>
		</div>
	</div>
</div>
