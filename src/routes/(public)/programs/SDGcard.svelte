<script lang="ts">
	import ExternalLink from '$lib/components/icons/ExternalLink.svelte'

	interface Props {
		sdgNumber: string
		title: string
		quote: string
		description: string
		href: string
	}

	let { sdgNumber, title, quote, description, href }: Props = $props()
</script>

<div class="p-6 bg-white/10 rounded-lg backdrop-blur-sm">
	<div class="flex items-start justify-between mb-2">
		<h3 class="text-2xl font-black text-dark px-2 rounded-sm bg-light w-min text-nowrap">
			{sdgNumber}
		</h3>
		<a
			{href}
			target="_blank"
			class="flex items-center gap-1 text-xs text-light/70 hover:text-light transition-colors duration-200 ml-2"
			title="Learn more about {sdgNumber}"
		>
			<span>Learn More</span>
			<ExternalLink size="4" color="currentColor" />
		</a>
	</div>
	<h4 class="mb-3 text-xl font-semibold">{title}</h4>
	<p class="text-sm mb-2 text-gray-200 italic">
		"{quote}"
	</p>
	<p>{description}</p>
</div>
