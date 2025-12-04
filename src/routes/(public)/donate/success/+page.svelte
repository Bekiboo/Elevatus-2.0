<script lang="ts">
	import { page } from '$app/stores'
	import Button from '$lib/components/UI/Button.svelte'
	import Hero from '$lib/components/layout/Hero.svelte'

	const hero = {
		src: '/img/hero/donate.jpg',
		alt: 'Thank you for your donation',
		title: 'Thank You!',
		subtitle: 'Your generosity makes a difference'
	}

	let loading = $state(false)
	const sessionId = $derived($page.url.searchParams.get('session_id'))

	async function openCustomerPortal() {
		if (!sessionId) return

		loading = true
		try {
			const response = await fetch('/api/customer-portal', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ sessionId })
			})

			const { url, error } = await response.json()

			if (error) {
				throw new Error(error)
			}

			if (url) {
				window.location.href = url
			}
		} catch (error) {
			console.error('Portal error:', error)
			alert('Unable to open customer portal. Please try again.')
		} finally {
			loading = false
		}
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

		{#if sessionId}
			<div class="mb-8 p-4 bg-light/10 rounded-lg">
				<p class="text-sm mb-3">Want to manage your subscription or update your payment method?</p>
				<Button
					onclick={openCustomerPortal}
					disabled={loading}
					variant="outline"
					class="bg-light text-dark hover:bg-light/90"
				>
					{loading ? 'Loading...' : 'Manage Subscription'}
				</Button>
			</div>
		{/if}

		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<Button href="/">Return to Home</Button>
			<Button href="/blog" variant="outline">Read Our Blog</Button>
		</div>
	</div>
</div>
