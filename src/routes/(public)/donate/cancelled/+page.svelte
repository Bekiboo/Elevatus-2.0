<script lang="ts">
	import Button from '$lib/components/UI/Button.svelte'
	import Hero from '$lib/components/layout/Hero.svelte'

	const hero = {
		src: '/img/hero/donate.jpg',
		alt: 'Donation cancelled',
		title: 'Payment Cancelled',
		subtitle: 'Your donation was not processed'
	}
</script>

<Hero {...hero} />

<div class="container mx-auto px-4 py-16 max-w-2xl text-center">
	<div class="bg-white rounded-lg shadow-lg p-12">
		<div class="text-6xl mb-6">✕</div>
		<h1 class="text-4xl font-black text-dark mb-4">Payment Cancelled</h1>
		<p class="text-lg text-dark/70 mb-8">
			Your donation was not completed. No charges have been made to your account.
		</p>
		<p class="text-dark/60 mb-8">
			If you encountered any issues or have questions, please don't hesitate to contact us.
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<Button href="/donate" class="px-8 py-3">Try Again</Button>
			<Button href="/contact" variant="outline" class="px-8 py-3">Contact Us</Button>
		</div>
	</div>
</div>
