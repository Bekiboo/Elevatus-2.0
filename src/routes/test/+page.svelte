<script lang="ts">
	import { onMount } from 'svelte'
	import pkg from 'noisejs'
	const { Noise } = pkg

	// window width
	let canvas: HTMLCanvasElement
	onMount(() => {
		canvas = document.getElementById('terrain') as HTMLCanvasElement
		const ctx = canvas.getContext('2d')!
		canvas.width = canvas.clientWidth
		canvas.height = canvas.clientHeight

		const width = canvas.width
		const height = canvas.height

		// Initialize noise
		const noise = new Noise(12345)

		// Frequency of noise (smaller = smoother)
		const scale = 0.0025

		// Generate terrain noise
		const imageData = ctx.createImageData(width, height)
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				const value = noise.perlin2(x * scale, y * scale)
				const normalized = Math.floor(((value + 1) / 2) * 100)
				const index = (y * width + x) * 4
				imageData.data[index] = normalized // R
				imageData.data[index + 1] = normalized // G
				imageData.data[index + 2] = normalized // B
				imageData.data[index + 3] = 255 // Alpha
			}
		}
		ctx.putImageData(imageData, 0, 0)

		// --- RIVER-LIKE PATH ---
		function getHeight(x: number, y: number): number {
			return noise.perlin2(x * scale, y * scale)
		}

		function generateRiverPath(start: [number, number], end: [number, number]) {
			const path: [number, number][] = []
			let [x, y] = start
			const [endX, endY] = end

			for (let i = 0; i < 10000; i++) {
				// check with a condition instead to know if path is completed
				path.push([x, y])
				const dirX = endX - x
				const dirY = endY - y
				const dist = Math.sqrt(dirX * dirX + dirY * dirY)
				if (dist < 2) break

				// Get Perlin-based direction
				const angle = getHeight(x, y) * Math.PI * 1
				const noiseDirX = Math.cos(angle)
				const noiseDirY = Math.sin(angle)

				// Blend with direction to end
				const blend = 0.45
				const moveX = (dirX / dist) * (1 - blend) + noiseDirX * blend
				const moveY = (dirY / dist) * (1 - blend) + noiseDirY * blend

				x += moveX * 1
				y += moveY * 1

				// if (x < 0 || x >= width || y < 0 || y >= height) {
				// 	break
				// }
			}

			return path
		}

		const start: [number, number] = [400, 50]
		const end: [number, number] = [400, 600]
		const river = generateRiverPath(start, end)

		// Draw the river path
		ctx.beginPath()
		ctx.moveTo(river[0][0], river[0][1])
		for (let i = 1; i < river.length; i++) ctx.lineTo(river[i][0], river[i][1])
		ctx.strokeStyle = 'steelblue'
		ctx.lineWidth = 2
		ctx.stroke()

		// Mark start and end
		ctx.fillStyle = 'green'
		ctx.beginPath()
		ctx.arc(start[0], start[1], 4, 0, Math.PI * 2)
		ctx.fill()

		ctx.fillStyle = 'red'
		ctx.beginPath()
		ctx.arc(end[0], end[1], 4, 0, Math.PI * 2)
		ctx.fill()
	})
</script>

<canvas id="terrain" class="w-screen h-screen"></canvas>

<!-- <script lang="ts">
	import { onMount } from 'svelte'

	onMount(() => {
		const canvas = document.getElementById('c') as HTMLCanvasElement
		const ctx = canvas.getContext('2d')

		function drawMeanderingPath(x1: number, y1: number, x2: number, y2: number) {
			let x = x1
			let y = y1

			let angle = Math.atan2(y2 - y1, x2 - x1) // initial direction
			let angleChange = 0
			const stepLength = 3
			const maxSteps = 1000

			ctx.beginPath()
			ctx.moveTo(x, y)

			for (let i = 0; i < maxSteps; i++) {
				// Compute how far we are from the goal
				const dx = x2 - x
				const dy = y2 - y
				const dist = Math.sqrt(dx * dx + dy * dy)

				// Stop if close enough
				if (dist < 5) break

				// Direction toward the goal
				const targetAngle = Math.atan2(dy, dx)

				// Add small smooth random change
				angleChange += (Math.random() - 0.5) * 0.02
				angleChange *= 0.9 // smooth damping

				// Gently steer toward the target
				const steeringStrength = 0.02
				const angleDiff = targetAngle - angle
				angle += angleDiff * steeringStrength + angleChange

				// Move forward
				x += Math.cos(angle) * stepLength
				y += Math.sin(angle) * stepLength

				ctx.lineTo(x, y)
			}

			ctx.strokeStyle = 'darkgreen'
			ctx.lineWidth = 3
			ctx.stroke()
		}

		drawMeanderingPath(100, 200, 700, 300)
	})
</script>

<canvas id="c" width="800" height="400"></canvas> -->
