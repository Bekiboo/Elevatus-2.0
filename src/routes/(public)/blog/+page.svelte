<script lang="ts">
	import type { PageData } from './$types'
	import Hero from '$lib/components/layout/Hero.svelte'
	import { DateTime } from 'luxon'

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

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

<section class="max-w-6xl mx-auto px-8 min-h-[50vh]">
	<div class="w-full">
		{#if data.posts != null}
			{#each data.posts as post, i}
				{@const { title, caption, created_at, elements } = post}
				{#if i == 0}
					<div class="flex flex-col max-w-2xl mx-auto my-16 md:flex-row lg:max-w-6xl">
						<a href="/blog/{post.id}" class="flex-none duration-100 basis-1/2 hover:opacity-80">
							<img class="object-cover w-full h-96 md:w-full" src={elements[0].value} alt={title} />
						</a>
						<div class="flex flex-col p-4 leading-normal">
							<a href="/blog/{post.id}"
								><h5
									class="mb-2 text-4xl font-bold tracking-tight text-gray-900 hover:text-orange-500"
								>
									{post.title}
								</h5></a
							>
							<p class="mb-3 font-normal text-gray-700">
								{caption != null ? caption : ''}
							</p>
							<div>
								{makeExcerpt(post, 400)}
								<a href="/blog/{post.id}" class="hover:text-orange-500">[...]</a>
							</div>
							<div class="pt-2">
								<p>{DateTime.fromISO(created_at).toFormat('LLL dd, yyyy')}</p>
							</div>
						</div>
					</div>
				{/if}
			{/each}

			<div class="flex flex-wrap gap-x-8 gap-y-16">
				{#each data.posts as post, i}
					{@const { title, caption, created_at, id, elements } = post}
					{#if i != 0}
						<div class="flex flex-col mx-auto md:max-w-xs">
							<a href="/blog/{id}" class="duration-100 hover:opacity-80">
								<img
									class="object-cover w-full h-96 md:h-72 md:w-full"
									src={elements[0].value}
									alt={title}
								/>
							</a>
							<div class="flex flex-col p-4 leading-normal">
								<a href="/blog/{id}"
									><h5
										class="mb-2 text-4xl font-bold tracking-tight text-gray-900 hover:text-orange-500"
									>
										{title}
									</h5></a
								>
								<p class="mb-3 font-normal text-gray-700">
									{post?.caption != null ? post?.caption : ''}
								</p>
								<div>
									{makeExcerpt(post, 200)}
									<a href="/blog/{id}" class="hover:text-orange-500">[...]</a>
								</div>
								<div class="pt-2">
									<p>{DateTime.fromISO(created_at).toFormat('LLL dd, yyyy')}</p>
								</div>
							</div>
						</div>
					{/if}
				{/each}
			</div>
		{:else}
			<div class="w-[60ch] mx-auto mt-12">
				<p>
					Oops! We couldn't load the blog posts. Please check your internet connection and try
					again. If the problem persists, please contact our support team for assistance.
				</p>
			</div>
		{/if}
	</div>
</section>
