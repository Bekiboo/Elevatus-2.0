<script lang="ts">
	import { DateTime } from 'luxon'
	import Icon from '$lib/components/portal/Icon.svelte'
	import { card } from '$lib/portal/ui'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	const firstName = $derived(data.user.name.split(' ')[0])

	function money(amountCents: number, currency: string): string {
		return new Intl.NumberFormat('en', {
			style: 'currency',
			currency: currency.toUpperCase()
		}).format(amountCents / 100)
	}

	// Plusieurs devises possibles côté Stripe — on les affiche côte à côte.
	function moneyList(byCurrency: Record<string, number>): string {
		const parts = Object.entries(byCurrency).map(([cur, cents]) => money(cents, cur))
		return parts.length ? parts.join(' + ') : '—'
	}

	function pct(n: number, total: number): string {
		return total > 0 ? `${Math.round((n / total) * 100)}%` : '—'
	}

	function monthLabelEn(month: string): string {
		return DateTime.fromFormat(month, 'yyyy-MM').setLocale('en').toFormat('LLL yyyy')
	}

	function dateEn(iso: string): string {
		return DateTime.fromISO(iso).setLocale('en').toFormat('d LLL')
	}

	const headline = $derived([
		{ label: 'Children followed', value: String(data.stats.children) },
		{ label: 'Sponsored this year', value: String(data.stats.sponsoredNow) },
		{ label: 'Meals served · 90 days', value: String(data.stats.meals90.meals) },
		{
			label: 'Donations this year',
			value: data.stripe.ok ? moneyList(data.stripe.thisYear) : '—'
		}
	])

	const th = 'py-2 pr-3 font-medium'
	const sectionTitle = 'text-xs font-semibold uppercase tracking-[0.15em] text-ink-soft'
</script>

<svelte:head>
	<title>Dashboard — Elevatus Portal</title>
</svelte:head>

<p class="text-sm text-ink-soft">Hello {firstName} — here's the big picture.</p>

<!-- Le pendant admin du tableau du jour : l'année scolaire et ses totaux -->
<section class="mt-3 overflow-hidden rounded-2xl bg-ink text-white">
	<div class="px-5 pb-4 pt-5 sm:px-6">
		<p class="text-xs font-semibold uppercase tracking-[0.2em] text-brand">School year</p>
		<p class="mt-1 font-saira text-5xl uppercase leading-none tracking-wide sm:text-6xl">
			{data.yearLabel ?? '—'}
		</p>
	</div>
	<div class="grid grid-cols-2 border-t border-white/10 sm:grid-cols-4">
		{#each headline as stat (stat.label)}
			<div class="border-b border-r border-white/10 px-5 py-4 last:border-r-0 sm:border-b-0 sm:px-6">
				<p class="font-saira text-3xl uppercase leading-none tracking-wide sm:text-4xl">
					{stat.value}
				</p>
				<p class="mt-1.5 text-xs font-medium uppercase tracking-wide text-white/60">
					{stat.label}
				</p>
			</div>
		{/each}
	</div>
</section>

<!-- Éducation : indicateurs 1.1–1.2 par année scolaire -->
<section class="mt-8">
	<h2 class={sectionTitle}>Education</h2>
	<div class="{card} mt-3 p-5 sm:p-6">
		{#if data.educationByYear.length === 0}
			<p class="text-sm text-ink-soft">No enrollments recorded yet.</p>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full text-left text-sm">
					<thead class="text-xs uppercase tracking-wide text-ink-soft">
						<tr>
							<th class={th}>School year</th>
							<th class={th}>Enrolled</th>
							<th class={th}>Sponsored</th>
							<th class={th}>Completed the year</th>
							<th class={th}>Promoted</th>
						</tr>
					</thead>
					<tbody>
						{#each data.educationByYear as y (y.label)}
							<tr class="border-t border-ink/5">
								<td class="py-2.5 pr-3 font-medium text-ink">{y.label}</td>
								<td class="py-2.5 pr-3 text-ink">{y.enrolled}</td>
								<td class="py-2.5 pr-3 text-ink">{y.sponsored}</td>
								<td class="py-2.5 pr-3 text-ink">
									{pct(y.completed, y.outcomesRecorded)}
									{#if y.outcomesRecorded > 0}
										<span class="text-xs text-ink-soft">({y.completed}/{y.outcomesRecorded})</span>
									{/if}
								</td>
								<td class="py-2.5 pr-3 text-ink">
									{pct(y.promoted, y.promotionsRecorded)}
									{#if y.promotionsRecorded > 0}
										<span class="text-xs text-ink-soft">({y.promoted}/{y.promotionsRecorded})</span>
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<p class="mt-3 text-xs text-ink-soft/80">
				Rates are computed on recorded outcomes only — “—” means report cards haven't been entered
				yet (indicators 1.1 and 1.2).
			</p>
		{/if}
	</div>
</section>

<!-- Nutrition & centre de jeunes : fenêtres 90 jours / 6 mois -->
<section class="mt-8">
	<h2 class={sectionTitle}>Nutrition & youth centre</h2>
	<div class="mt-3 grid items-start gap-3 sm:grid-cols-3">
		<div class="{card} p-4">
			<div class="flex items-center gap-2.5 text-ink">
				<Icon name="meals" size={18} />
				<h3 class="font-semibold">Canteen · 90 days</h3>
			</div>
			<p class="mt-3 font-saira text-4xl uppercase leading-none text-ink">
				{data.stats.meals90.meals}
			</p>
			<p class="mt-1 text-sm text-ink-soft">meals served</p>
			<p class="mt-2 text-xs text-ink-soft/80">
				{data.stats.meals90.served} of {data.stats.meals90.entries} recorded days served (indicator
				3.2).
			</p>
		</div>

		<div class="{card} p-4">
			<div class="flex items-center gap-2.5 text-ink">
				<Icon name="growth" size={18} />
				<h3 class="font-semibold">Growth · 90 days</h3>
			</div>
			<p class="mt-3 font-saira text-4xl uppercase leading-none text-ink">
				{data.stats.growthMeasured90}<span class="text-xl text-ink-soft">/{data.stats.children}</span>
			</p>
			<p class="mt-1 text-sm text-ink-soft">children measured</p>
			<p class="mt-2 text-xs text-ink-soft/80">
				Height & weight coverage over the last 90 days (indicator 3.1).
			</p>
		</div>

		<div class="{card} p-4">
			<div class="flex items-center gap-2.5 text-ink">
				<Icon name="attendance" size={18} />
				<h3 class="font-semibold">Centre occupancy</h3>
			</div>
			{#if data.attendanceByMonth.length === 0}
				<p class="mt-3 text-sm text-ink-soft">No attendance recorded in the last 6 months.</p>
			{:else}
				<ul class="mt-3 space-y-2">
					{#each data.attendanceByMonth as m (m.month)}
						<li class="flex items-center gap-2 text-sm">
							<span class="w-20 shrink-0 text-xs text-ink-soft">{monthLabelEn(m.month)}</span>
							<span class="h-2 flex-1 overflow-hidden rounded-full bg-ink/10">
								<span
									class="block h-full rounded-full bg-ink"
									style="width: {m.capacity > 0
										? Math.min(100, Math.round((m.attendance / m.capacity) * 100))
										: 0}%"
								></span>
							</span>
							<span class="w-10 shrink-0 text-right font-medium text-ink">
								{pct(m.attendance, m.capacity)}
							</span>
						</li>
					{/each}
				</ul>
				<p class="mt-2 text-xs text-ink-soft/80">
					Average attendance vs. capacity, all classes (indicator 2.1).
				</p>
			{/if}
		</div>
	</div>
</section>

<!-- Dons : lecture directe de l'API Stripe -->
<section class="mt-8">
	<h2 class={sectionTitle}>Donations</h2>
	{#if !data.stripe.ok}
		<div class="mt-3 rounded-xl border border-dashed border-ink/15 p-4">
			<p class="text-sm text-ink-soft">
				Stripe data is unavailable right now — check the <code class="text-xs">STRIPE_SECRET_KEY</code>
				configuration.
			</p>
		</div>
	{:else}
		<div class="mt-3 grid items-start gap-3 lg:grid-cols-[1fr_1.4fr]">
			<div class="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
				<div class="{card} p-4">
					<div class="flex items-center gap-2.5 text-ink">
						<Icon name="donations" size={18} />
						<h3 class="font-semibold">This month</h3>
					</div>
					<p class="mt-3 font-saira text-4xl uppercase leading-none text-ink">
						{moneyList(data.stripe.thisMonth)}
					</p>
				</div>
				<div class="{card} p-4">
					<h3 class="font-semibold text-ink">This year</h3>
					<p class="mt-3 font-saira text-4xl uppercase leading-none text-ink">
						{moneyList(data.stripe.thisYear)}
					</p>
					<p class="mt-1 text-sm text-ink-soft">
						{data.stripe.paymentsThisYear} payment{data.stripe.paymentsThisYear === 1 ? '' : 's'}
					</p>
				</div>
				<div class="{card} p-4">
					<h3 class="font-semibold text-ink">Recurring</h3>
					<p class="mt-3 font-saira text-4xl uppercase leading-none text-ink">
						{moneyList(data.stripe.monthlyRecurring)}<span class="text-xl text-ink-soft">/mo</span>
					</p>
					<p class="mt-1 text-sm text-ink-soft">
						{data.stripe.activeSubscriptions} active subscription{data.stripe
							.activeSubscriptions === 1
							? ''
							: 's'}
					</p>
				</div>
			</div>

			<div class="{card} p-5 sm:p-6">
				<h3 class="font-semibold text-ink">Recent payments</h3>
				{#if data.stripe.recent.length === 0}
					<p class="mt-3 text-sm text-ink-soft">No payments yet this year.</p>
				{:else}
					<table class="mt-3 w-full text-left text-sm">
						<thead class="text-xs uppercase tracking-wide text-ink-soft">
							<tr>
								<th class={th}>Date</th>
								<th class={th}>Donor</th>
								<th class="py-2 text-right font-medium">Amount</th>
							</tr>
						</thead>
						<tbody>
							{#each data.stripe.recent as p (p.date + p.donor + p.amount)}
								<tr class="border-t border-ink/5">
									<td class="py-2 pr-3 text-ink-soft">{dateEn(p.date)}</td>
									<td class="max-w-0 truncate py-2 pr-3 text-ink" style="width: 60%">{p.donor}</td>
									<td class="py-2 text-right font-medium text-ink">
										{money(p.amount, p.currency)}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{/if}
				<p class="mt-3 text-xs text-ink-soft/80">
					Read live from Stripe. Webhook-based history (per-donor records, sponsorship matching)
					is on the roadmap.
				</p>
			</div>
		</div>
	{/if}
</section>
