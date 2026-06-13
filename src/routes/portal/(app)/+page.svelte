<script lang="ts">
	import Icon from '$lib/components/portal/Icon.svelte'
	import type { IconName } from '$lib/components/portal/Icon.svelte'
	import { fmtDate, fmtDayLong, monthLabel } from '$lib/portal/format'
	import { card } from '$lib/portal/ui'
	import type { PageData } from './$types'

	let { data }: { data: PageData } = $props()

	const firstName = $derived(data.user.name.split(' ')[0])

	// L'état des trois registres du terrain : fait / en cours / à faire.
	type Status = { tone: 'done' | 'todo' | 'partial' | 'idle'; text: string }

	const registers: { href: string; icon: IconName; title: string; status: Status }[] = $derived([
		{
			href: '/portal/field/meals',
			icon: 'meals',
			title: 'Cantine',
			status:
				data.stats.schools === 0
					? { tone: 'idle', text: 'aucune école' }
					: data.stats.mealsToday >= data.stats.schools
						? {
								tone: 'done',
								text: `${data.stats.mealsToday}/${data.stats.schools} écoles saisies`
							}
						: data.stats.mealsToday > 0
							? {
									tone: 'partial',
									text: `${data.stats.mealsToday}/${data.stats.schools} écoles saisies`
								}
							: { tone: 'todo', text: 'à saisir aujourd’hui' }
		},
		{
			href: '/portal/field/attendance',
			icon: 'attendance',
			title: `Présences · ${monthLabel(data.month)}`,
			status:
				data.stats.courses === 0
					? { tone: 'idle', text: 'aucune classe' }
					: data.stats.attendanceMonth >= data.stats.courses
						? {
								tone: 'done',
								text: `${data.stats.attendanceMonth}/${data.stats.courses} classes saisies`
							}
						: data.stats.attendanceMonth > 0
							? {
									tone: 'partial',
									text: `${data.stats.attendanceMonth}/${data.stats.courses} classes saisies`
								}
							: { tone: 'todo', text: 'à saisir ce mois-ci' }
		},
		{
			href: '/portal/field/growth',
			icon: 'growth',
			title: 'Taille & poids',
			status: data.stats.lastGrowthOn
				? { tone: 'idle', text: `dernières mesures le ${fmtDate(data.stats.lastGrowthOn)}` }
				: { tone: 'idle', text: 'aucune mesure pour le moment' }
		}
	])

	const DOT: Record<Status['tone'], string> = {
		done: 'bg-emerald-400',
		partial: 'bg-secondary',
		todo: 'bg-brand',
		idle: 'bg-white/30'
	}

	const modules: {
		title: string
		description: string
		icon: IconName
		href?: string
		meta?: string
	}[] = $derived([
		{
			title: 'Saisie terrain',
			description: 'Repas, mesures et présences — les trois registres du quotidien.',
			icon: 'field',
			href: '/portal/field'
		},
		{
			title: 'Enfants',
			description: 'Dossiers, scolarité par année, progression.',
			icon: 'children',
			href: '/portal/children',
			meta: `${data.stats.children} suivi${data.stats.children > 1 ? 's' : ''}`
		},
		{
			title: 'Écoles',
			description: 'Les établissements partenaires où les enfants sont inscrits.',
			icon: 'school',
			href: '/portal/schools',
			meta: `${data.stats.schools} école${data.stats.schools > 1 ? 's' : ''}`
		}
	])

	const upcoming = [
		{ title: 'Blog', description: 'Rédaction et publication des articles du site.' },
		{ title: 'Messages', description: 'Les messages du formulaire de contact, traités ici.' }
	]
</script>

<svelte:head>
	<title>Portail Elevatus</title>
</svelte:head>

<p class="text-sm text-ink-soft">Bonjour {firstName} — voici où en est la saisie.</p>

<!-- Le tableau du jour : la date de Madagascar et l'état des registres -->
<section class="mt-3 overflow-hidden rounded-2xl bg-ink text-white">
	<div class="px-5 pb-4 pt-5 sm:px-6">
		<p class="text-xs font-semibold uppercase tracking-[0.2em] text-brand">Aujourd'hui</p>
		<p class="mt-1 font-saira text-5xl uppercase leading-none tracking-wide sm:text-6xl">
			{fmtDayLong(data.today)}
		</p>
	</div>
	<div class="border-t border-white/10">
		{#each registers as r (r.href)}
			<a
				href={r.href}
				class="flex items-center gap-3 border-b border-white/10 px-5 py-3.5 transition last:border-b-0
				hover:bg-white/5 sm:px-6"
			>
				<span class="text-white/60"><Icon name={r.icon} size={20} /></span>
				<span class="flex-1 text-sm font-medium">{r.title}</span>
				<span class="flex items-center gap-2 text-sm text-white/70">
					<span class="h-2 w-2 rounded-full {DOT[r.status.tone]}"></span>
					{r.status.text}
				</span>
			</a>
		{/each}
	</div>
</section>

<!-- Modules -->
<section class="mt-8">
	<h2 class="text-xs font-semibold uppercase tracking-[0.15em] text-ink-soft">Modules</h2>
	<div class="mt-3 grid gap-3 sm:grid-cols-3">
		{#each modules as m (m.title)}
			<a href={m.href} class="{card} group p-4 transition hover:border-ink/30 hover:shadow-sm">
				<div class="flex items-center justify-between">
					<span
						class="flex h-10 w-10 items-center justify-center rounded-lg bg-ink/5 text-ink
						transition group-hover:bg-ink group-hover:text-white"
					>
						<Icon name={m.icon} size={20} />
					</span>
					{#if m.meta}
						<span class="text-xs text-ink-soft">{m.meta}</span>
					{/if}
				</div>
				<h3 class="mt-3 font-semibold text-ink">{m.title}</h3>
				<p class="mt-1 text-sm text-ink-soft">{m.description}</p>
			</a>
		{/each}
	</div>

	<div class="mt-3 grid gap-3 sm:grid-cols-3">
		{#each upcoming as m (m.title)}
			<div class="rounded-xl border border-dashed border-ink/15 p-4">
				<div class="flex items-center justify-between">
					<h3 class="font-semibold text-ink/60">{m.title}</h3>
					<span class="rounded-full bg-secondary/25 px-2 py-0.5 text-xs font-medium text-ink/70">
						À venir
					</span>
				</div>
				<p class="mt-1 text-sm text-ink-soft/80">{m.description}</p>
			</div>
		{/each}
	</div>
</section>
