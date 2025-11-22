<script lang="ts">
	import ChevronIcon from '$lib/components/icons/ChevronIcon.svelte'
	import Hero from '$lib/components/layout/Hero.svelte'
	import Modal from '$lib/components/Modal.svelte'
	import Member from './Member.svelte'
	import members from './members'
	import { MetaTags } from 'svelte-meta-tags'

	let showModal = $state(false)
	let currentMember = $state(0)

	const hero = {
		src: 'img/hero/hero_team.jpg',
		alt: 'Under Construction',
		title: 'Our Team',
		subtitle: 'Dedicated and Passionate'
	}

	const displayMemberByIndex = (index: number) => {
		currentMember = index
		showModal = true
	}

	const groupColors: Record<string, string> = {
		board: 'brand',
		executive: 'secondary',
		education: 'accent',
		logistics: 'dark'
	}
</script>

<svelte:head>
	<title>Our Team - Elevatus Foundation</title>
</svelte:head>

<MetaTags
	title="Our Team - Elevatus Foundation"
	description="Meet the dedicated team behind Elevatus Foundation working to fight child labor in Madagascar through education, nutrition, and youth empowerment programs."
	openGraph={{
		url: 'https://www.elevatus-foundation.org/team',
		title: 'Our Team - Elevatus Foundation',
		description:
			'Meet the dedicated team behind Elevatus Foundation working to fight child labor in Madagascar through education, nutrition, and youth empowerment programs.',
		images: [
			{
				url: 'https://www.elevatus-foundation.org/img/hero/hero_team.jpg',
				width: 1200,
				height: 630,
				alt: 'Elevatus Foundation Team'
			}
		],
		siteName: 'Elevatus'
	}}
/>

<Hero {...hero} />

<!-- Our Team -->
<section class="flex flex-col items-center w-full max-w-6xl gap-8 px-8 mx-auto my-8">
	{@render section('board', 'The Board')}
	{@render section('executive', 'The Executive Team')}
	{@render section('education', 'The Education Team')}
	{@render section('logistics', 'The Logistics Team')}
</section>

{#snippet section(group: string, title: string)}
	<section>
		<h2
			class="m-auto mb-8 px-4 py-1 text-2xl font-bold uppercase sm:text-4xl text-light bg-{groupColors[
				group
			]} w-fit"
		>
			{title}
		</h2>
		<div
			class="flex flex-col justify-center w-full gap-4 sm:flex-row sm:flex-wrap sm:w-auto max-w-72 sm:max-w-none"
		>
			{#each members as member, i}
				{#if member.group === group}
					<Member {groupColors} {member} displayMemberModal={() => displayMemberByIndex(i)} />
				{/if}
			{/each}
		</div>
	</section>
{/snippet}

<Modal bind:showModal>
	{#snippet header()}
		<h2 class="text-3xl font-black uppercase">
			<span class="text-brand">{members[currentMember].firstName}</span>
			<span class="text-dark">{members[currentMember].lastName}</span>
		</h2>
	{/snippet}

	{#snippet children()}
		<div class="flex flex-col items-center gap-6">
			<div class="flex justify-between items-center w-full gap-4">
				<button
					class="p-3 rounded-lg bg-brand/10 text-brand hover:bg-brand/20 transition-all duration-200"
					onclick={() => {
						currentMember = currentMember === 0 ? members.length - 1 : currentMember - 1
					}}
					aria-label="Previous member"
				>
					<ChevronIcon rotation={180} />
				</button>
				<img
					class="w-48 h-48 rounded-full shadow-xl ring-4 ring-brand"
					src={members[currentMember].src + '.png'}
					alt="Picture of {members[currentMember].firstName} {members[currentMember].lastName}"
				/>
				<button
					class="p-3 rounded-lg bg-brand/10 text-brand hover:bg-brand/20 transition-all duration-200"
					onclick={() => {
						currentMember = currentMember === members.length - 1 ? 0 : currentMember + 1
					}}
					aria-label="Next member"
				>
					<ChevronIcon />
				</button>
			</div>
			<div class="bg-brand/10 rounded-lg px-4 py-2 w-fit">
				<h3 class="text-xl font-bold text-brand select-none">
					{members[currentMember].role}
				</h3>
			</div>
			<div class="flex flex-col gap-4 text-dark leading-relaxed">
				{#each members[currentMember].bio as paragraph}
					<p>{paragraph}</p>
				{/each}
			</div>
		</div>
	{/snippet}
</Modal>
