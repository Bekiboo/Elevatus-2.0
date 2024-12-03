<script lang="ts">
	interface Props {
		open: boolean;
		width?: number;
	}

	let { open, width = 60 }: Props = $props();
</script>

<svg class:open viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5" {width}>
	<path
		class="top"
		d="m 30,{open
			? '33'
			: '35'} h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
	/>
	<path class="middle" d="m 30,50 h 40" />
	<path
		class="bottom sc"
		d="m 70,{open
			? '67'
			: '65'} h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
	/>
</svg>

<style>
	:root {
		--transition-duration: 300ms;
	}
	svg {
		transition: transform var(--transition-duration);
	}
	.top {
		stroke-dasharray: 40 160;
		transition: stroke-dashoffset var(--transition-duration);
	}
	.middle {
		transform-origin: 50%;
		transition: transform var(--transition-duration);
	}
	.bottom {
		stroke-dasharray: 40 85;
		transition: stroke-dashoffset var(--transition-duration);
	}
	.open {
		transform: rotate(45deg) scale(1.25);
	}
	.open .top,
	.open .bottom {
		stroke-dashoffset: -64px;
	}
	.open .middle {
		transform: rotate(90deg);
	}
</style>
