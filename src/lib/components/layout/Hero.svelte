<script lang="ts">
	export let src: string
	export let alt: string
	export let title: string
	export let subtitle: string
</script>

<div class="relative flex justify-center">
	<img class="w-full object-cover h-80 sm:h-96 brightness-[35%]" {src} {alt} />
	<div class="absolute w-full max-w-6xl px-8 text-white bottom-8 sm:bottom-12">
		<h1 class="mb-2 text-5xl font-black uppercase sm:text-7xl">{title}</h1>
		{#if subtitle}
			<span class="font-thin sm:text-2xl">{subtitle}</span>
		{/if}
	</div>
</div>
