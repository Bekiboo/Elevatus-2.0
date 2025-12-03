<script lang="ts">
	import { fade } from 'svelte/transition'
	import Button from '$lib/components/UI/Button.svelte'
	import Hero from '$lib/components/layout/Hero.svelte'
	import { MetaTags } from 'svelte-meta-tags'

	const hero = {
		src: 'img/hero/donate.jpg',
		alt: 'Photo by Katt Yukawa onUnsplash',
		title: 'Donate',
		subtitle: 'Contribute to saving children in Madagascar from trafficking'
	}

	let amount = $state(25)
	let loading = $state(false)
	let customAmount = $state('')
	let monthly = $state(true)

	const monthlyPresets = [25, 50, 100]
	const oneTimePresets = [50, 100, 200]

	async function handleDonation() {
		loading = true
		try {
			const response = await fetch('/api/create-checkout-session', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					amount: amount * 100, // Stripe uses cents
					isRecurring: monthly
				})
			})

			const { url, error: apiError } = await response.json()

			if (apiError) {
				throw new Error(apiError)
			}

			if (url) {
				// Redirect to Stripe Checkout
				window.location.href = url
			}
		} catch (error) {
			console.error('Payment error:', error)
			alert('Payment failed. Please try again.')
			loading = false
		}
	}
</script>

<svelte:head>
	<title>Donate - Elevatus Foundation</title>
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "DonateAction",
		"recipient": {
			"@type": "NGO",
			"name": "Elevatus Foundation",
			"url": "https://www.elevatus-foundation.org"
		},
		"description": "Support children in Madagascar by sponsoring their education, nutrition, and skills development to prevent child labor and trafficking."
	}
	</script>`}
</svelte:head>

<MetaTags
	title="Donate - Elevatus Foundation"
	description="Support children in Madagascar through monthly sponsorship or one-time donations. Help provide education, nutrition, and skills development to prevent child labor."
	openGraph={{
		url: 'https://www.elevatus-foundation.org/donate',
		title: 'Donate - Elevatus Foundation',
		description:
			'Support children in Madagascar through monthly sponsorship or one-time donations. Help provide education, nutrition, and skills development to prevent child labor.',
		images: [
			{
				url: 'https://www.elevatus-foundation.org/img/hero/donate.jpg',
				width: 1200,
				height: 630,
				alt: 'Donate to Elevatus Foundation'
			}
		],
		siteName: 'Elevatus'
	}}
/>

<Hero {...hero} />

<div class="flex flex-col-reverse max-w-6xl gap-12 px-8 mx-auto my-16 md:flex-row">
	<div class="flex flex-col basis-1/2">
		<h2 class="mb-6 text-4xl md:text-5xl font-black uppercase text-dark">
			Give Them Their <span class="text-brand">Childhood</span> Back
		</h2>
		<p class="text-lg text-dark/70 leading-relaxed mb-8">
			By donating today, you ensure a brighter future to the children we support in Madagascar.
		</p>
		<div class="mt-4">
			<p class="text-dark/80 leading-relaxed mb-4">
				Thank you for your ongoing support to Elevatus. When you sponsor a child, you provide him or
				her with:
			</p>
			<ul class="my-6 ml-6 space-y-3">
				<li class="flex items-start gap-3">
					<span class="text-brand -mt-1 font-black text-xl">•</span>
					<span class="text-dark/80">A healthy meal every school day</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-brand -mt-1 font-black text-xl">•</span>
					<span class="text-dark/80">School tuition and school supplies</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-brand -mt-1 font-black text-xl">•</span>
					<span class="text-dark/80">Weekly tutoring classes</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-brand -mt-1 font-black text-xl">•</span>
					<span class="text-dark/80">Sewing classes</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-brand -mt-1 font-black text-xl">•</span>
					<span class="text-dark/80">Extracurricular activities</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-brand -mt-1 font-black text-xl">•</span>
					<span class="text-dark/80">And much more!</span>
				</li>
			</ul>
			<p class="text-dark/70 leading-relaxed">
				Larger donations and one-time donations are typically used for special projects like school
				renovation, or to support children who haven't found a sponsor yet.
			</p>
		</div>
	</div>

	<div class="flex flex-col basis-1/2">
		<div
			class="relative flex items-center w-full max-w-md h-14 mx-auto mb-8 text-base font-bold bg-dark/5 overflow-hidden"
		>
			<div
				class="bg-brand absolute top-0 left-0 w-1/2 h-full duration-300 ease-in-out {monthly
					? ''
					: 'translate-x-full'}"
			></div>
			<button
				class="relative z-10 grid items-center w-1/2 h-full text-center cursor-pointer transition-colors duration-300 uppercase tracking-wide"
				class:text-light={monthly}
				class:text-dark={!monthly}
				onclick={() => {
					monthly = true
					amount = monthlyPresets[0]
					customAmount = ''
				}}
			>
				Monthly Sponsor
			</button>

			<button
				class="relative z-10 grid items-center w-1/2 h-full text-center cursor-pointer transition-colors duration-300 uppercase tracking-wide"
				class:text-light={!monthly}
				class:text-dark={monthly}
				onclick={() => {
					monthly = false
					amount = oneTimePresets[0]
					customAmount = ''
				}}
			>
				One Time Donation
			</button>
		</div>

		{#if monthly}
			<div class="flex flex-col mx-auto w-full max-w-md" in:fade={{ duration: 150 }}>
				<p class="mb-6 text-center font-semibold text-dark/70 uppercase tracking-wider text-sm">
					Choose an amount to give each month
				</p>

				{#each monthlyPresets as preset, i}
					<div class="flex mb-5 items-start">
						<div class="flex items-center h-6 mt-0.5">
							<input
								checked={amount === preset}
								onchange={() => {
									amount = preset
									customAmount = ''
								}}
								id="monthly-radio-{i}"
								name="monthly-radio"
								type="radio"
								class="w-5 h-5 text-brand bg-light border-2 border-dark/20 cursor-pointer focus:ring-brand focus:ring-2 accent-brand"
							/>
						</div>
						<div class="ml-4">
							<label
								for="monthly-radio-{i}"
								class="text-xl font-black text-dark cursor-pointer block">${preset}/Month</label
							>
							<p class="text-sm text-dark/60">
								Sponsor {preset === 25 ? 'One' : preset === 50 ? 'Two' : 'Four'}
								{preset === 25 ? 'Child' : 'Children'}
							</p>
						</div>
					</div>
				{/each}

				<div class="flex mb-5 items-start">
					<div class="flex items-center h-6 mt-0.5">
						<input
							checked={customAmount !== '' && !monthlyPresets.includes(amount)}
							onchange={() => {}}
							id="monthly-radio-custom"
							name="monthly-radio"
							type="radio"
							class="w-5 h-5 text-brand bg-light border-2 border-dark/20 cursor-pointer focus:ring-brand focus:ring-2 accent-brand"
						/>
					</div>
					<div class="ml-4 flex-1">
						<label
							for="monthly-radio-custom"
							class="text-xl font-black text-dark cursor-pointer block">Other Amount</label
						>
						<input
							type="number"
							bind:value={customAmount}
							oninput={() => {
								amount = Number(customAmount) || 0
							}}
							placeholder="Enter custom amount"
							class="w-full p-2 mt-2 border-2 border-gray-300 rounded-lg"
							min="1"
						/>
					</div>
				</div>
			</div>
		{/if}

		{#if !monthly}
			<div class="flex flex-col mx-auto w-full max-w-md" in:fade={{ duration: 150 }}>
				<p class="mb-6 text-center font-semibold text-dark/70 uppercase tracking-wider text-sm">
					Choose an amount to donate today
				</p>

				<div class="flex mb-5 items-start">
					<div class="flex items-center h-6 mt-0.5">
						<input
							checked={amount === oneTimePresets[0]}
							onchange={() => {
								amount = oneTimePresets[0]
								customAmount = ''
							}}
							id="onetime-radio-1"
							name="onetime-radio"
							type="radio"
							class="w-5 h-5 text-brand bg-light border-2 border-dark/20 cursor-pointer focus:ring-brand focus:ring-2 accent-brand"
						/>
					</div>
					<div class="ml-4">
						<label for="onetime-radio-1" class="text-xl font-black text-dark cursor-pointer block"
							>$50 Donation</label
						>
						<p class="text-sm text-dark/60">Equivalent of 50 meals</p>
					</div>
				</div>

				<div class="flex mb-5 items-start">
					<div class="flex items-center h-6 mt-0.5">
						<input
							checked={amount === oneTimePresets[1]}
							onchange={() => {
								amount = oneTimePresets[1]
								customAmount = ''
							}}
							id="onetime-radio-2"
							name="onetime-radio"
							type="radio"
							class="w-5 h-5 text-brand bg-light border-2 border-dark/20 cursor-pointer focus:ring-brand focus:ring-2 accent-brand"
						/>
					</div>
					<div class="ml-4">
						<label for="onetime-radio-2" class="text-xl font-black text-dark cursor-pointer block"
							>$100 Donation</label
						>
						<p class="text-sm text-dark/60">One month salary for a teacher</p>
					</div>
				</div>

				<div class="flex mb-5 items-start">
					<div class="flex items-center h-6 mt-0.5">
						<input
							checked={amount === oneTimePresets[2]}
							onchange={() => {
								amount = oneTimePresets[2]
								customAmount = ''
							}}
							id="onetime-radio-3"
							name="onetime-radio"
							type="radio"
							class="w-5 h-5 text-brand bg-light border-2 border-dark/20 cursor-pointer focus:ring-brand focus:ring-2 accent-brand"
						/>
					</div>
					<div class="ml-4">
						<label for="onetime-radio-3" class="text-xl font-black text-dark cursor-pointer block"
							>$200 Donation</label
						>
						<p class="text-sm text-dark/60">Equivalent to the budget for a school trip</p>
					</div>
				</div>

				<div class="flex mb-5 items-start">
					<div class="flex items-center h-6 mt-0.5">
						<input
							checked={customAmount !== '' && !oneTimePresets.includes(amount)}
							onchange={() => {}}
							id="onetime-radio-custom"
							name="onetime-radio"
							type="radio"
							class="w-5 h-5 text-brand bg-light border-2 border-dark/20 cursor-pointer focus:ring-brand focus:ring-2 accent-brand"
						/>
					</div>
					<div class="ml-4 flex-1">
						<label
							for="onetime-radio-custom"
							class="text-xl font-black text-dark cursor-pointer block">Other Amount</label
						>
						<input
							type="number"
							bind:value={customAmount}
							oninput={() => {
								amount = Number(customAmount) || 0
							}}
							placeholder="Enter custom amount"
							class="w-full p-2 mt-2 border-2 border-gray-300 rounded-lg"
							min="1"
						/>
					</div>
				</div>
			</div>
		{/if}

		<div class="flex flex-col mx-auto mt-6 w-full max-w-md">
			<Button
				onclick={handleDonation}
				disabled={loading || amount <= 0}
				class="w-full py-4 text-lg font-bold"
			>
				{loading ? 'Processing...' : `Donate $${amount}${monthly ? '/month' : ''}`}
			</Button>
			<span class="text-xs text-center text-dark/60 mt-4 uppercase tracking-wider"
				>Secure payment processing powered by Stripe</span
			>
		</div>
	</div>
</div>
