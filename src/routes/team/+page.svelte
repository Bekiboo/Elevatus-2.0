<script lang="ts">
	import Hero from '$lib/components/layout/Hero.svelte'
	import Modal from '$lib/components/Modal.svelte'
	import Member from './Member.svelte'
	import members from './members'

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
</script>

<svelte:head>
	<title>Elevatus | Team</title>
</svelte:head>

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
		<h2 class="m-auto mb-4 text-2xl font-bold uppercase sm:text-4xl text-sky-700 w-fit">{title}</h2>
		<div class="justify-center w-full gap-4 sm:flex sm:flex-wrap sm:w-auto max-w-72 sm:max-w-none">
			{#each members as member, i}
				{#if member.group === group}
					<Member {member} displayMemberModal={() => displayMemberByIndex(i)} />
				{/if}
			{/each}
		</div>
	</section>
{/snippet}

<Modal bind:showModal>
	{#snippet header()}
		<h2 class="text-2xl font-bold uppercase text-sky-700">
			{members[currentMember].firstName}
			{members[currentMember].lastName}
		</h2>
	{/snippet}

	{#snippet children()}
		<div class="flex flex-col items-center gap-4">
			<img
				class="w-40 h-40 rounded-full"
				src={members[currentMember].src}
				alt="Picture of {members[currentMember].firstName} {members[currentMember].lastName}"
			/>
			<h3 class="text-xl font-semibold text-blue-900">{members[currentMember].role}</h3>
			{#each members[currentMember].bio as paragraph}
				<p class="text-blue-900">{paragraph}</p>
			{/each}
		</div>
	{/snippet}
</Modal>
