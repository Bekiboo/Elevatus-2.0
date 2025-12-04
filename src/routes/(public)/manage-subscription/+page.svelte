<script lang="ts">
	import Button from '$lib/components/UI/Button.svelte'
	import Hero from '$lib/components/layout/Hero.svelte'
	import { MetaTags } from 'svelte-meta-tags'

	const hero = {
		src: '/img/hero/donate.jpg',
		alt: 'Manage your subscription',
		title: 'Manage Subscription',
		subtitle: 'Update your payment details or cancel your subscription'
	}

	let email = $state('')
	let loading = $state(false)
	let error = $state('')
	let success = $state(false)

	async function handleSubmit() {
		if (!email) {
			error = 'Please enter your email address'
			return
		}

		loading = true
		error = ''
		success = false

		try {
			const response = await fetch('/api/portal-by-email', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			})

			const data = await response.json()

			if (data.error) {
				error = data.error
				loading = false
				return
			}

			if (data.success) {
				success = true
				loading = false
			}
		} catch (err) {
			console.error('Portal error:', err)
			error = 'Unable to send email. Please try again.'
			loading = false
		}
	}
</script>

<MetaTags
	title="Manage Subscription - Elevatus Foundation"
	description="Manage your monthly sponsorship, update payment details, or cancel your subscription."
/>

<Hero {...hero} />

<div class="container mx-auto px-4 py-16 max-w-2xl">
	<div class="bg-white rounded-lg shadow-lg p-8 md:p-12">
		<h1 class="text-3xl md:text-4xl font-black text-dark mb-4 text-center">
			Manage Your Subscription
		</h1>
		<p class="text-dark/70 text-center mb-8">
			We'll send you a secure link via email to access your customer portal.
		</p>

		{#if !success}
			<form
				onsubmit={(e) => {
					e.preventDefault()
					handleSubmit()
				}}
				class="space-y-6"
			>
				<div>
					<label for="email" class="block text-sm font-semibold text-dark mb-2">
						Email Address
					</label>
					<input
						type="email"
						id="email"
						bind:value={email}
						placeholder="your@email.com"
						required
						class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-brand focus:outline-none"
						disabled={loading}
					/>
				</div>

				{#if error}
					<div class="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
						<p class="text-red-600 text-sm font-semibold">{error}</p>
					</div>
				{/if}

				<Button type="submit" disabled={loading || !email} class="w-full py-3 text-lg">
					{loading ? 'Sending...' : 'Send Me the Link'}
				</Button>
			</form>

			<div class="mt-8 pt-6 border-t border-gray-200">
				<p class="text-sm text-dark/60 text-center mb-4">
					🔒 For your security, we'll send a magic link to your email.
				</p>
				<p class="text-sm text-dark/60 text-center">In the customer portal, you can:</p>
				<ul class="mt-4 space-y-2 text-sm text-dark/70">
					<li class="flex items-start gap-2">
						<span class="text-brand font-bold">•</span>
						<span>View your subscription details and payment history</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-brand font-bold">•</span>
						<span>Update your payment method</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-brand font-bold">•</span>
						<span>Download invoices and receipts</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-brand font-bold">•</span>
						<span>Cancel your subscription if needed</span>
					</li>
				</ul>
			</div>
		{:else}
			<div class="text-center py-8">
				<div class="text-6xl mb-6">📧</div>
				<h2 class="text-2xl font-bold text-dark mb-4">Check Your Email!</h2>
				<p class="text-dark/70 mb-2">
					We've sent a secure link to <strong>{email}</strong>
				</p>
				<p class="text-dark/60 text-sm mb-6">The link will expire in 1 hour for security.</p>
				<div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 text-left">
					<p class="text-sm text-blue-900 font-semibold mb-2">📬 Didn't receive the email?</p>
					<ul class="text-sm text-blue-800 space-y-1">
						<li>• Check your spam/junk folder</li>
						<li>• Make sure you entered the correct email</li>
						<li>• Wait a few minutes and check again</li>
					</ul>
				</div>
				<button
					onclick={() => {
						success = false
						email = ''
						error = ''
					}}
					class="mt-6 text-brand hover:underline font-semibold"
				>
					Try a different email
				</button>
			</div>
		{/if}
	</div>
</div>
