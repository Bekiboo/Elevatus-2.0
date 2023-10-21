<script lang="ts">
	import type { PageData } from './$types'
	import Hero from '$lib/components/layout/Hero.svelte'
	import { MetaTags } from 'svelte-meta-tags'
	import { DateTime } from 'luxon'

	export let data: PageData

	const { blogPost }: { blogPost: any } = data
	const { title, caption, created_at, elements, author, id } = blogPost

	const hero = {
		src: elements[0].value,
		alt: title,
		title: title,
		subtitle: caption
	}
</script>

<svelte:head>
	<title>Elevatus | Blog</title>
</svelte:head>

<MetaTags
	{title}
	description={caption}
	openGraph={{
		url: `https://www.elevatus-foundation.org/blog/${id}`,
		title: title,
		description: caption,
		images: [
			{
				url: elements[0].value,
				width: 800,
				height: 600,
				alt: caption
			}
		],
		siteName: 'Elevatus'
	}}
/>

<Hero {...hero} />

<div class="mx-auto px-8 my-8 max-w-[60ch]">
	<div class="flex justify-between">
		<a href="/blog">&larr; Back to the Blog</a>
		<div class="flex flex-col">
			{#if author?.firstName}
				<div>By {author.firstName} {author.lastName}</div>
				<div class="text-sm">{author.title}</div>
			{/if}

			<div class="text-sm">{DateTime.fromISO(created_at).toFormat('LLL dd, yyyy')}</div>
		</div>
	</div>

	{#each elements as element, i}
		{#if element.type == 'paragraph'}
			<p class="mt-4 whitespace-pre-line">{element.value}</p>
		{/if}

		{#if element.type == 'image'}
			<img class="w-full mt-4" src={element.value} alt="image n°{i}" />
		{/if}

		{#if element.type == 'title'}
			<h2 class="mt-8 text-2xl font-bold">{element.value}</h2>
		{/if}
	{/each}
</div>
