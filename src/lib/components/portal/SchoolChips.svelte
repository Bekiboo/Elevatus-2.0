<script lang="ts">
	interface School {
		id: string
		name: string
	}

	let {
		schools,
		selectedId,
		makeHref
	}: {
		schools: School[]
		selectedId: string | null
		makeHref: (schoolId: string) => string
	} = $props()
</script>

<!-- Sélecteur d'école : puces défilantes au doigt, sans JavaScript requis -->
<div class="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
	{#each schools as school (school.id)}
		<a
			href={makeHref(school.id)}
			aria-current={school.id === selectedId ? 'page' : undefined}
			class="whitespace-nowrap rounded-full border px-4 py-2 text-sm transition
			{school.id === selectedId
				? 'border-ink bg-ink font-semibold text-white'
				: 'border-ink/20 bg-white text-ink-soft hover:border-ink/40'}"
		>
			{school.name}
		</a>
	{/each}
</div>
