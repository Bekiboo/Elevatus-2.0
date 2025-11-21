<script lang="ts">
	import type { PageData } from './$types'
	import Hero from '$lib/components/layout/Hero.svelte'
	import { DateTime } from 'luxon'

	interface Props {
		data: PageData
	}

	let { data }: Props = $props()

	const hero = {
		src: 'img/hero/group_picture_zoo.jpg',
		alt: 'Under Construction',
		title: 'Blog',
		subtitle: 'Read about our work in Madagascar'
	}

	function makeExcerpt(post: any, length: number) {
		return post.elements
			.map(
				// concatenate value in elements map when type is text
				function (e: any) {
					if (e.type == 'paragraph') {
						return e.value
					}
				}
			)
			.join(' ')
			.substring(0, length)
	}
</script>

<svelte:head>
	<title>Elevatus | Blog</title>
</svelte:head>

<Hero {...hero} />

<section class="max-w-6xl mx-auto px-8 py-16 min-h-[50vh]">
	<div class="w-full">
		{#if data.posts != null}
			{#each data.posts as post, i}
				{@const { title, caption, created_at, elements } = post}
				{#if i == 0}
					<!-- Featured Post -->
					<div
						class="flex flex-col max-w-2xl mx-auto mb-16 md:flex-row lg:max-w-6xl group overflow-hidden bg-light"
					>
						<a href="/blog/{post.id}" class="flex-none duration-300 basis-1/2 overflow-hidden">
							<img
								class="object-cover w-full h-96 md:h-full transition-opacity duration-300 group-hover:opacity-90"
								src={elements[0].value}
								alt={title}
							/>
						</a>
						<div class="flex flex-col px-8 leading-relaxed">
							<a href="/blog/{post.id}">
								<h5
									class="mb-4 text-4xl font-black tracking-tight text-dark hover:text-brand transition-colors duration-300 uppercase"
								>
									{post.title}
								</h5>
							</a>
							<p class="mb-4 text-lg font-semibold text-secondary">
								{caption != null ? caption : ''}
							</p>
							<div class="text-dark/80 leading-relaxed mb-4">
								{makeExcerpt(post, 400)}
								<a
									href="/blog/{post.id}"
									class="text-brand hover:text-secondary font-semibold transition-colors duration-300"
								>
									Read more →</a
								>
							</div>
							<div class="pt-4 border-t border-dark/10">
								<p class="text-sm text-dark/60 uppercase tracking-wider font-semibold">
									{DateTime.fromISO(created_at).toFormat('LLL dd, yyyy')}
								</p>
							</div>
						</div>
					</div>
				{/if}
			{/each}

			<!-- Blog Grid -->
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{#each data.posts as post, i}
					{@const { title, caption, created_at, id, elements } = post}
					{#if i != 0}
						<div class="flex flex-col group overflow-hidden bg-light">
							<a href="/blog/{id}" class="overflow-hidden">
								<img
									class="object-cover w-full h-64 transition-opacity duration-300 group-hover:opacity-90"
									src={elements[0].value}
									alt={title}
								/>
							</a>
							<div class="flex flex-col py-6 leading-relaxed flex-grow">
								<a href="/blog/{id}">
									<h5
										class="mb-3 text-2xl font-black tracking-tight text-dark hover:text-brand transition-colors duration-300 uppercase line-clamp-2"
									>
										{title}
									</h5>
								</a>
								<p class="mb-3 text-sm font-semibold text-secondary line-clamp-2">
									{post?.caption != null ? post?.caption : ''}
								</p>
								<div class="text-dark/70 text-sm leading-relaxed mb-4 flex-grow">
									<span class="line-clamp-3">{makeExcerpt(post, 150)}</span>
									<a
										href="/blog/{id}"
										class="text-brand hover:text-secondary font-semibold transition-colors duration-300"
									>
										Read more →</a
									>
								</div>
								<div class="pt-4 border-t border-dark/10">
									<p class="text-xs text-dark/60 uppercase tracking-wider font-semibold">
										{DateTime.fromISO(created_at).toFormat('LLL dd, yyyy')}
									</p>
								</div>
							</div>
						</div>
					{/if}
				{/each}
			</div>
		{:else}
			<div class="max-w-2xl mx-auto mt-12 p-8 bg-light">
				<p class="text-dark leading-relaxed">
					Oops! We couldn't load the blog posts. Please check your internet connection and try
					again. If the problem persists, please contact our support team for assistance.
				</p>
			</div>
		{/if}
	</div>
</section>
