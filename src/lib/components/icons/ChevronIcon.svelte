<script lang="ts">
	let { color = 'currentColor', rotation = 0, size = '1.5rem' } = $props()
</script>

<svg
	data-slot="icon"
	fill="none"
	stroke-width="1.5"
	stroke={color}
	viewBox="0 0 24 24"
	xmlns="http://www.w3.org/2000/svg"
	aria-hidden="true"
	style="transform: rotate({rotation}deg)"
	width={size}
	height={size}
>
	<path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
</svg>
