<script lang="ts">
	interface Props {
		src: string
		alt: string
		title: string
		subtitle: string
	}

	let { src, alt, title, subtitle }: Props = $props()
</script>

<div class="relative flex justify-center">
	<img class="w-full object-cover h-96 sm:h-[500px] brightness-[50%]" {src} {alt} />
	<div class="absolute w-full max-w-6xl px-8 text-light bottom-8 sm:bottom-12">
		<h1 class="mb-2 text-5xl font-black uppercase sm:text-7xl">{title}</h1>
		{#if subtitle}
			<span class="font-thin sm:text-2xl">{subtitle}</span>
		{/if}
	</div>
</div>
