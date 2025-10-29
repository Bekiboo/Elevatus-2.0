<script lang="ts">
	import { cn } from '$lib/utils'
	import type { Snippet } from 'svelte'

	interface IHighlightedTextProps {
		color: string
		text: string
		children?: Snippet
	}

	const { children, color, text, ...restProps }: IHighlightedTextProps & { class?: string } =
		$props()
</script>

<span {...restProps} class={cn(['text-' + text, 'relative mr-2 py-2'].join(' '))}>
	<span class={cn(['bg-' + color, 'absolute inset-1'].join(' '))}></span>
	<span class="relative z-10 px-4">{@render children?.()}</span>
</span>
