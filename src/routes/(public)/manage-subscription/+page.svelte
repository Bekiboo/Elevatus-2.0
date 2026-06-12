<script lang="ts">
	import Hero from '$lib/components/layout/Hero.svelte'
	import { MetaTags } from 'svelte-meta-tags'

	const hero = {
		src: '/img/hero/donate.jpg',
		alt: 'Manage your subscription',
		title: 'Manage Subscription',
		subtitle: 'Update your payment details or cancel your subscription'
	}

	// The magic-link email flow is temporarily disabled (no email provider
	// configured). Donors reach us directly instead; the previous form lives
	// in git history if we bring it back.
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
			To update your payment details, download invoices, or cancel your monthly sponsorship,
			drop us a line and we'll take care of it within a few days.
		</p>

		<div class="text-center">
			<a
				href="mailto:correspondence.elevatus@gmail.com?subject=Subscription%20management"
				class="inline-block rounded-lg bg-brand px-6 py-3 text-lg font-semibold text-white
				transition hover:opacity-90"
			>
				Email us
			</a>
			<p class="mt-4 text-sm text-dark/60">correspondence.elevatus@gmail.com</p>
		</div>

		<div class="mt-8 pt-6 border-t border-gray-200">
			<p class="text-sm text-dark/60 text-center">We can help you with:</p>
			<ul class="mt-4 space-y-2 text-sm text-dark/70">
				<li class="flex items-start gap-2">
					<span class="text-brand font-bold">•</span>
					<span>Your subscription details and payment history</span>
				</li>
				<li class="flex items-start gap-2">
					<span class="text-brand font-bold">•</span>
					<span>Updating your payment method</span>
				</li>
				<li class="flex items-start gap-2">
					<span class="text-brand font-bold">•</span>
					<span>Invoices and receipts</span>
				</li>
				<li class="flex items-start gap-2">
					<span class="text-brand font-bold">•</span>
					<span>Cancelling your subscription</span>
				</li>
			</ul>
		</div>
	</div>
</div>
