<script lang="ts">
	interface Props {
		number: number
		title: string
		description: string
		listItems?: string[]
		conclusion?: string
		className?: string
	}

	let { number, title, description, listItems = [], conclusion, className = '' }: Props = $props()
</script>

<div class="p-6 lg:p-8 bg-white rounded-lg shadow-lg {className}">
	<div class="flex items-center mb-4">
		<div
			class="flex items-center justify-center min-w-12 w-12 h-12 mr-4 text-2xl font-bold text-white rounded-full bg-brand"
		>
			{number}
		</div>
		<h3 class="text-2xl font-bold">{title}</h3>
	</div>

	<p class="mb-4 text-lg">{description}</p>
	{#if listItems.length > 0}
		<ul class="space-y-2 text-lg list-disc list-inside">
			{#each listItems as item}
				<li>{item}</li>
			{/each}
		</ul>
	{/if}
	{#if conclusion}
		<p class="mt-4 text-lg font-medium text-brand">
			{conclusion}
		</p>
	{/if}
</div>
