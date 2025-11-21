<script lang="ts">
	import { fade } from 'svelte/transition'
	import PaymentButton from './PaymentButton.svelte'
	import Hero from '$lib/components/layout/Hero.svelte'

	const hero = {
		src: 'img/hero/donate.jpg',
		alt: 'Photo by Katt Yukawa onUnsplash',
		title: 'Donate',
		subtitle: 'Contribute to saving children in Madagascar from trafficking'
	}

	const plans = {
		sponsor25: {
			url: 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=KAC88B2QR7UEL',
			buttonText: 'Sponsor for $25/month'
		},
		sponsor50: {
			url: 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=J6NP7D9JU64CN',
			buttonText: 'Sponsor for $50/month'
		},
		sponsor100: {
			url: 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=BP6QD3CLJKRY8',
			buttonText: 'Sponsor for $100/month'
		},
		oneTime50: {
			url: 'https://www.paypal.com/donate/?hosted_button_id=NLMM5KDFBTM9W',
			buttonText: 'Donate $50'
		},
		oneTime100: {
			url: 'https://www.paypal.com/donate/?hosted_button_id=JXVJJTN8TU3FN',
			buttonText: 'Donate $100'
		},
		oneTime200: {
			url: 'https://www.paypal.com/donate/?hosted_button_id=5GV8WKTD3MR7L',
			buttonText: 'Donate $200'
		},
		sponsorOther: {
			url: 'https://www.paypal.com/donate/?hosted_button_id=A7L2N5TC4QV5E',
			buttonText: 'Customize your sponsor'
		},
		oneTimeOther: {
			url: 'https://www.paypal.com/donate/?hosted_button_id=A7L2N5TC4QV5E',
			buttonText: 'Customize your donation'
		}
	}

	let monthly = $state(true)
	let sponsorPlan = $state(plans.sponsor25)
	let oneTimePlan = $state(plans.oneTime50)
</script>

<svelte:head>
	<title>Elevatus | Donate</title>
</svelte:head>

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
				onclick={() => (monthly = true)}
			>
				Monthly Sponsor
			</button>

			<button
				class="relative z-10 grid items-center w-1/2 h-full text-center cursor-pointer transition-colors duration-300 uppercase tracking-wide"
				class:text-light={!monthly}
				class:text-dark={monthly}
				onclick={() => (monthly = false)}
			>
				One Time Donation
			</button>
		</div>

		{#if monthly}
			<div class="flex flex-col mx-auto w-full max-w-md" in:fade={{ duration: 150 }}>
				<p class="mb-6 text-center font-semibold text-dark/70 uppercase tracking-wider text-sm">
					Choose an amount to give each month
				</p>

				<div class="flex mb-5 items-start">
					<div class="flex items-center h-6 mt-0.5">
						<input
							bind:group={sponsorPlan}
							value={plans.sponsor25}
							checked
							id="sponsor-radio-1"
							name="sponsor-radio"
							type="radio"
							class="w-5 h-5 text-brand bg-light border-2 border-dark/20 cursor-pointer focus:ring-brand focus:ring-2 accent-brand"
						/>
					</div>
					<div class="ml-4">
						<label for="sponsor-radio-1" class="text-xl font-black text-dark cursor-pointer block"
							>$25/Month</label
						>
						<p class="text-sm text-dark/60">Sponsor One Child</p>
					</div>
				</div>

				<div class="flex mb-5 items-start">
					<div class="flex items-center h-6 mt-0.5">
						<input
							bind:group={sponsorPlan}
							value={plans.sponsor50}
							id="sponsor-radio-2"
							name="sponsor-radio"
							type="radio"
							class="w-5 h-5 text-brand bg-light border-2 border-dark/20 cursor-pointer focus:ring-brand focus:ring-2 accent-brand"
						/>
					</div>
					<div class="ml-4">
						<label for="sponsor-radio-2" class="text-xl font-black text-dark cursor-pointer block"
							>$50/Month</label
						>
						<p class="text-sm text-dark/60">Sponsor Two Children</p>
					</div>
				</div>

				<div class="flex mb-5 items-start">
					<div class="flex items-center h-6 mt-0.5">
						<input
							bind:group={sponsorPlan}
							value={plans.sponsor100}
							id="sponsor-radio-3"
							name="sponsor-radio"
							type="radio"
							class="w-5 h-5 text-brand bg-light border-2 border-dark/20 cursor-pointer focus:ring-brand focus:ring-2 accent-brand"
						/>
					</div>
					<div class="ml-4">
						<label for="sponsor-radio-3" class="text-xl font-black text-dark cursor-pointer block"
							>$100/Month</label
						>
						<p class="text-sm text-dark/60">Sponsor Four Children</p>
					</div>
				</div>

				<div class="flex mb-5 items-start">
					<div class="flex items-center h-6 mt-0.5">
						<input
							bind:group={sponsorPlan}
							value={plans.sponsorOther}
							id="sponsor-radio-4"
							name="sponsor-radio"
							type="radio"
							class="w-5 h-5 text-brand bg-light border-2 border-dark/20 cursor-pointer focus:ring-brand focus:ring-2 accent-brand"
						/>
					</div>
					<div class="ml-4">
						<label for="sponsor-radio-4" class="text-xl font-black text-dark cursor-pointer block"
							>Other Amount</label
						>
						<p class="text-sm text-dark/60">Choose how much you want to donate each month</p>
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
							bind:group={oneTimePlan}
							value={plans.oneTime50}
							checked
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
							bind:group={oneTimePlan}
							value={plans.oneTime100}
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
							bind:group={oneTimePlan}
							value={plans.oneTime200}
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
							bind:group={oneTimePlan}
							value={plans.oneTimeOther}
							id="onetime-radio-4"
							name="onetime-radio"
							type="radio"
							class="w-5 h-5 text-brand bg-light border-2 border-dark/20 cursor-pointer focus:ring-brand focus:ring-2 accent-brand"
						/>
					</div>
					<div class="ml-4">
						<label for="onetime-radio-4" class="text-xl font-black text-dark cursor-pointer block"
							>Other Amount</label
						>
						<p class="text-sm text-dark/60">Custom Donation</p>
					</div>
				</div>
			</div>
		{/if}

		<div class="flex flex-col mx-auto mt-6">
			{#if monthly}
				<PaymentButton url={sponsorPlan?.url} text={sponsorPlan?.buttonText} />
			{/if}
			{#if !monthly}
				<PaymentButton url={oneTimePlan?.url} text={oneTimePlan?.buttonText} />
			{/if}
			<span class="text-xs text-center text-dark/60 mt-4 uppercase tracking-wider"
				>Clicking on this button will redirect you <br /> to a secured PayPal checkout page</span
			>
		</div>
	</div>
</div>
