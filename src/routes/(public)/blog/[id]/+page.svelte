<script lang="ts">
	import type { PageData } from './$types'
	import Hero from '$lib/components/layout/Hero.svelte'
	import { MetaTags } from 'svelte-meta-tags'
	import { DateTime } from 'luxon'

	interface Props {
		data: PageData
	}

	let { data }: Props = $props()

	const { blogPost }: { blogPost: any } = data
	const { title, caption, created_at, elements, author, id } = blogPost

	const hero = {
		src: elements[0].value,
		alt: title,
		title: title,
		subtitle: caption
	}
	console.log(hero)
</script>

<svelte:head>
	<title>Elevatus | Blog</title>
</svelte:head>

<MetaTags
	openGraph={{
		type: 'website',
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

<div class="mx-auto px-4 my-16 max-w-[75ch]">
	<!-- Header Section -->
	<div class="flex flex-col gap-6 mb-12 pb-8 border-b-2 border-brand/20">
		<a
			href="/blog"
			class="inline-flex items-center gap-2 text-brand hover:text-secondary font-semibold transition-colors duration-300 w-fit"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
					clip-rule="evenodd"
				/>
			</svg>
			Back to Blog
		</a>

		<div class="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
			<div class="flex flex-col gap-2">
				{#if author?.firstName}
					<div class="text-dark font-semibold">By {author.firstName} {author.lastName}</div>
					<div class="text-sm text-dark/60">{author.title}</div>
				{/if}
			</div>
			<div class="text-sm text-dark/60 uppercase tracking-wider font-semibold">
				{DateTime.fromISO(created_at).toFormat('LLL dd, yyyy')}
			</div>
		</div>
	</div>

	<!-- Content -->
	<article class="prose prose-lg max-w-none">
		{#each elements as element, i}
			{#if element.type == 'paragraph'}
				<p class="mt-6 text-dark/90 leading-relaxed whitespace-pre-line">{element.value}</p>
			{/if}

			{#if element.type == 'image'}
				<figure class="my-8">
					<img class="w-full" src={element.value} alt="image n°{i}" />
					{#if element.caption}
						<figcaption class="text-sm text-center text-dark/60 mt-3 italic">
							{element.caption}
						</figcaption>
					{/if}
				</figure>
			{/if}

			{#if element.type == 'title'}
				<h2 class="mt-12 mb-6 text-3xl font-black text-dark uppercase border-l-4 border-brand pl-4">
					{element.value}
				</h2>
			{/if}

			{#if element.type == 'list'}
				<ul class="pl-6 mt-6 space-y-2 list-none">
					{#each element.value as item}
						<li class="flex items-start gap-3">
							<span class="text-brand mt-1.5 font-black">•</span>
							<span class="text-dark/90">{item}</span>
						</li>
					{/each}
				</ul>
			{/if}
		{/each}
	</article>

	<!-- Back to Blog Footer -->
	<div class="mt-16 pt-8 border-t-2 border-brand/20">
		<a
			href="/blog"
			class="inline-flex items-center gap-2 text-brand hover:text-secondary font-semibold transition-colors duration-300"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
					clip-rule="evenodd"
				/>
			</svg>
			Back to Blog
		</a>
	</div>
</div>
