<script lang="ts">
	import { cn } from '$lib/utils'
	import type { Snippet } from 'svelte'

	interface IButtonProps {
		variant?: 'primary' | 'outline'
		size?: 'small' | 'medium' | 'large'
		type?: 'button' | 'submit' | 'reset'
		isLoading?: boolean
		blockingClick?: boolean
		disabled?: boolean
		href?: string
		target?: string
		onclick?: () => void
		callback?: () => Promise<unknown> | undefined
		children?: Snippet
	}

	const {
		variant = 'primary',
		size = 'large',
		type = 'button',
		isLoading,
		blockingClick = true,
		disabled,
		href,
		target,
		onclick,
		callback,
		children,
		...restProps
	}: IButtonProps & { class?: string } = $props()

	let isSubmitting = $state(false)
	const isActive = $derived(isLoading || isSubmitting)

	const handleClick = async () => {
		if (onclick) onclick()
		if (typeof callback !== 'function') return

		if (blockingClick) isSubmitting = true
		try {
			await callback()
		} catch (error) {
			console.error('Error in button callback:', error)
		} finally {
			isSubmitting = false
		}
	}

	const variantClasses = {
		primary:
			'bg-brand text-white font-semibold hover:bg-brand-light duration-200 cursor-pointer uppercase outline outline-2 outline-brand hover:outline-brand-light',
		outline:
			'text-light hover:text-dark font-semibold hover:bg-accent hover:outline-accent outline outline-2 outline-light transition duration-200 cursor-pointer uppercase'
	}

	const disabledVariantClasses = {
		primary: 'bg-gray-400 text-dark',
		outline: 'bg-gray-200 text-dark border-gray-400'
	}

	const sizeClasses = {
		small: 'min-w-24 sm:min-w-36 px-2 sm:px-6 py-2 sm:py-3 text-sm',
		medium: 'min-w-32 sm:min-w-48 px-4 sm:px-8 py-3 sm:py-4 text-md',
		large: 'min-w-40 sm:min-w-60 px-6 sm:px-12 py-4 sm:py-6 text-lg'
	}

	// const isActiveVariantClasses = {
	// 	primary: 'brightness-85 text-dark',
	// 	outline: 'brightness-90 text-dark'
	// }

	const classes = $derived({
		common: cn(
			'cursor-pointer relative focus-within:ring-0 text-nowrap duration-50 text-base select-none flex items-center justify-center h-min'
		),
		variant: disabled
			? disabledVariantClasses[variant] || variantClasses[variant]
			: variantClasses[variant],
		disabled: (disabled || isActive) && 'cursor-not-allowed opacity-100',
		size: sizeClasses[size] || sizeClasses.large,
		// isActive: isActive && isActiveVariantClasses[variant],
		wrapText: 'break-words whitespace-normal sm:whitespace-nowrap'
	})
</script>

{#if href}
	<a
		{...restProps}
		{href}
		{target}
		class={cn(
			[
				classes.common,
				classes.variant,
				classes.disabled,
				classes.size,
				// classes.isActive,
				classes.wrapText,
				restProps.class
			].join(' ')
		)}
		onclick={handleClick}
	>
		<div class:opacity-0={isLoading || isSubmitting}>
			{@render children?.()}
		</div>

		{#if isLoading || isSubmitting}
			<div class="absolute inset-0 flex items-center justify-center">
				<svg
					class="w-6 h-6 text-white animate-spin"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
			</div>
		{/if}
	</a>
{:else}
	<button
		{...restProps}
		{disabled}
		color={'none'}
		{type}
		class={cn(
			[
				classes.common,
				classes.variant,
				classes.disabled,
				classes.size,
				// classes.isActive,
				classes.wrapText,
				restProps.class
			].join(' ')
		)}
		onclick={handleClick}
	>
		<div class:opacity-0={isLoading || isSubmitting}>
			{@render children?.()}
		</div>

		{#if isLoading || isSubmitting}
			<div class="absolute inset-0 flex items-center justify-center">
				<svg
					class="w-6 h-6 text-white animate-spin"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
					></circle>
					<path
						class="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
			</div>
		{/if}
	</button>
{/if}

<!--
@component
@name ButtonAction
@description A button component that can be used to trigger actions or submit forms. It supports loading states, blocking clicks, and custom variants.
@props
	- variant: The variant of the button (primary, outline, tertiary, alt, text).
	- size: The size of the button (medium, large).
	- type: The type of the button (button, submit, reset).
	- isLoading: Whether the button is in a loading state.
	- blockingClick: Whether to block clicks while loading. Default is true.
	- disabled: Whether the button is disabled.
	- callback: A function to be called when the button is clicked.
	- children: The content of the button.
@usage
	<Button.Action variant="primary" callback={handleClick} blockingClick>
		Submit
	</Button.Action>
@usage
	<Button.Action variant="alt" size="medium" disabled>
		Disabled
	</Button.Action>
-->
