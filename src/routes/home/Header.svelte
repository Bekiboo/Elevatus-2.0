<script lang="ts">
	import Button from '$lib/components/Button.svelte'
	let innerWidth: number
</script>

<svelte:window bind:innerWidth />

<div class="relative flex flex-col items-center justify-end w-full overflow-hidden text-white">
	<!-- Desktop Hero -->
	{#if innerWidth > 640}
		<div class="texture smm:hidden h-[80vh] sm:min-h-[400px] w-full absolute z-10"></div>
		<video
			class="smm:hidden object-cover h-[80vh] sm:min-h-[400px] w-full brightness-50"
			loop
			muted
			autoplay
		>
			<source src="img/Elevatus_loop_large.mp4" type="video/mp4" />
			<div class="texture top-0 left-0 w-[100vw] h-[100vh]"></div>
		</video>
	{/if}

	<!-- Mobile Hero -->
	<img
		class="object-cover h-[80vh] w-full brightness-[35%] sm:hidden"
		src="img/child_redhood_breaking_rocks.jpg"
		alt="Malagasy child wearing a red hood breaking rocks"
	/>

	<!-- Caption -->
	<div class="absolute z-20 flex flex-col justify-end w-full max-w-6xl px-8 mx-auto">
		<div class="flex flex-col mb-16">
			<h4 class="mb-1 text-lg font-thin sm:text-2xl">Fighting Child Labor in Madagascar</h4>
			<h1
				class="max-w-md text-3xl font-extrabold leading-7 text-left uppercase sm:text-5xl sm:max-w-2xl"
			>
				Because they deserve their <em
					class="text-black/0"
					style="font-style: unset; -webkit-text-stroke: 1px white;">childhood</em
				> back
			</h1>
			<div class="mt-8 max-w-fit">
				<a href="/donate">
					<Button>
						<p class="px-4 py-2 sm:py-4 sm:px:8 sm:text-xl sm:font-medium">Sponsor a child today</p>
					</Button>
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	.texture {
		/* background: url('/img/misc/diagonal.png'); */
		background: rgba(0, 0, 0, 0.25);
		box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(2px);
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.18);
	}
</style>
