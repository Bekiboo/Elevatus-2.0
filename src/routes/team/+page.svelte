<script lang="ts">
	import Hero from '$lib/components/layout/Hero.svelte'
	import Member from './Member.svelte'
	import members from './members'

	const hero = {
		src: 'img/hero/hero_team.jpg',
		alt: 'Under Construction',
		title: 'Our Team',
		subtitle: 'Dedicated and Passionate'
	}
</script>

<svelte:head>
	<title>Elevatus | Team</title>
</svelte:head>

<Hero {...hero} />

<!-- Our Team -->
<section class="flex flex-col max-w-6xl gap-4 px-8 mx-auto my-8">
	<h2 class="m-auto text-4xl font-bold uppercase text-sky-700 w-fit">The Board</h2>
	<div class="sm:flex sm:flex-wrap">
		{#each members as member}
			{#if member.group === 'board'}
				<Member {member} />
			{/if}
		{/each}
	</div>

	<h2 class="m-auto text-4xl font-bold uppercase text-sky-700 w-fit">The Executive Team</h2>
	<div class="sm:flex">
		{#each members as member}
			{#if member.group === 'executive'}
				<Member {member} />
			{/if}
		{/each}
	</div>

	<h2 class="m-auto text-4xl font-bold uppercase text-sky-700 w-fit">The Education Team</h2>
	<div class="sm:flex">
		{#each members as member}
			{#if member.group === 'education'}
				<Member {member} />
			{/if}
		{/each}
	</div>

	<h2 class="m-auto text-4xl font-bold uppercase text-sky-700 w-fit">The Logistics Team</h2>

	<div class="sm:flex">
		{#each members as member}
			{#if member.group === 'logistics'}
				<Member {member} />
			{/if}
		{/each}
	</div>
</section>
