<script lang="ts">
	import { page } from '$app/stores'
	import { onMount } from 'svelte'

	let status = $state<'verifying' | 'success' | 'error' | 'expired'>('verifying')
	let message = $state('')

	onMount(async () => {
		const token = $page.url.searchParams.get('token')

		if (!token) {
			status = 'error'
			message = 'Invalid link. Please request a new one.'
			return
		}

		try {
			// Verify token on server
			const response = await fetch(`/manage-subscription/verify?token=${encodeURIComponent(token)}`)
			const data = await response.json()

			if (data.error) {
				if (data.expired) {
					status = 'expired'
					message = data.error
				} else {
					status = 'error'
					message = data.error
				}
				return
			}

			// Redirect to Stripe portal
			status = 'success'
			message = 'Redirecting to customer portal...'
			setTimeout(() => {
				window.location.href = data.url
			}, 1000)
		} catch (error) {
			console.error('Verification error:', error)
			status = 'error'
			message = 'Invalid or corrupted link. Please request a new one.'
		}
	})
</script>

<div class="container mx-auto px-4 py-16 max-w-2xl text-center">
	<div class="bg-white rounded-lg shadow-lg p-12">
		{#if status === 'verifying'}
			<div class="text-6xl mb-6 animate-pulse">⏳</div>
			<h1 class="text-3xl font-black text-dark mb-4">Verifying Link...</h1>
			<p class="text-dark/60">Please wait a moment.</p>
		{:else if status === 'success'}
			<div class="text-6xl mb-6">✓</div>
			<h1 class="text-3xl font-black text-dark mb-4">Link Verified!</h1>
			<p class="text-dark/60">{message}</p>
		{:else if status === 'expired'}
			<div class="text-6xl mb-6">⏰</div>
			<h1 class="text-3xl font-black text-dark mb-4">Link Expired</h1>
			<p class="text-dark/70 mb-6">{message}</p>
			<a
				href="/manage-subscription"
				class="inline-block px-8 py-3 bg-brand text-white font-bold rounded-lg hover:bg-brand/90 transition-colors"
			>
				Request New Link
			</a>
		{:else}
			<div class="text-6xl mb-6">✕</div>
			<h1 class="text-3xl font-black text-dark mb-4">Invalid Link</h1>
			<p class="text-dark/70 mb-6">{message}</p>
			<a
				href="/manage-subscription"
				class="inline-block px-8 py-3 bg-brand text-white font-bold rounded-lg hover:bg-brand/90 transition-colors"
			>
				Request New Link
			</a>
		{/if}
	</div>
</div>
