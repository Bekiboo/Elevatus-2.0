<script>
	let { showModal = $bindable(), header, children } = $props()

	let dialog = $state() // HTMLDialogElement

	$effect(() => {
		if (showModal) dialog.showModal()
	})
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close()
	}}
>
	<div class="bg-light rounded-2xl shadow-2xl">
		<header class="flex justify-between items-start p-6 pb-4">
			{@render header?.()}
			<!-- svelte-ignore a11y_autofocus -->
			<button
				autofocus
				onclick={() => dialog.close()}
				class="ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-dark/5 hover:bg-dark/10 text-dark/40 hover:text-dark transition-all duration-200"
				aria-label="Close modal"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="w-5 h-5"
				>
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>
		</header>
		<div class="px-6 pb-6">
			{@render children?.()}
		</div>
	</div>
</dialog>

<style>
	dialog {
		max-width: 42rem;
		border-radius: 1rem;
		border: none;
		padding: 0;
		margin-inline: auto;
		margin-top: 3rem;
		background: transparent;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(4px);
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.9);
			opacity: 0;
		}
		to {
			transform: scale(1);
			opacity: 1;
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.3s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
