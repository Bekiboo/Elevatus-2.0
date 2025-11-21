<script lang="ts">
	import Button from '$lib/components/UI/Button.svelte'
	import { cn } from '$lib/utils'

	const { className }: { className?: string } = $props()
</script>

<section id="about-section" class={cn([className, '	flex flex-col items-center'])}>
	<div
		class="flex flex-col items-center justify-center max-w-md m-auto text-center sm:max-w-[720px] min-h-96 px-4"
	>
		<h2 class="text-4xl sm:text-6xl font-black text-dark text-center uppercase mb-4">
			Our
			<span class="uppercase bg-dark text-light px-2 pb-1.5">Response</span>
		</h2>

		<p class="max-w-3xl text-center mb-8 sm:mb-16">
			Breaking the cycle through education, nutrition, and skill development — <b>
				because every child deserves their childhood back
			</b>. Elevatus programs directly advance the
			<a href="https://sdgs.un.org/goals" target="_blank" class="underline hover:text-brand">
				United Nations Sustainable Development Goals (SDGs)
			</a>, global benchmarks for ending poverty and building a better future for every child.
		</p>
	</div>
	<div
		class="relative h-[80vh] overflow-hidden bg-dark bg-[url('/img/party_youth_center.jpg')] bg-cover bg-center opacity-100 w-full"
	>
		<!-- Overlay -->
		<div class="absolute inset-0 bg-linear-to-t from-transparent from-50% to-dark to-120%"></div>

		<div
			class="absolute top-1/5 lg:top-1/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-light p-4 w-full text-center"
		>
			<h3 class="font-bold mb-2 uppercase tracking-widest">
				<div class="mt-8 mb-4 text-6xl md:text-7xl lg:text-9xl font-saira">Three pillars</div>
				<div
					class="flex gap-4 max-md:flex-col w-min justify-center mx-auto text-4xl lg:text-5xl xl:text-6xl font-black"
				>
					<span class="uppercase bg-brand px-2 pb-1.5">Education</span>
					<span class="uppercase bg-secondary px-2 pb-1.5">Nutrition</span>
					<span class="uppercase bg-accent px-2 pb-1.5">Skills</span>
				</div>
			</h3>
		</div>
	</div>

	<div class="max-lg:bg-dark py-6 lg:py-16 flex-col flex gap-6 lg:gap-16">
		<div class="relative w-full flex flex-col lg:gap-16 lg:p-16">
			<img
				src="img/group_studying.jpg"
				alt="Children in class"
				class="lg:absolute min-h-96 top-0 right-0 z-0 object-cover lg:w-8/12 lg:h-full"
			/>

			<div class="absolute max-lg:top-6 max-lg:left-1/2 max-lg:translate-x-[-50%] lg:relative z-10">
				<div
					class="font-light text-2xl -mb-2 pt-1 bg-light w-min max-lg:px-4 text-nowrap text-neutral-600"
				>
					First Pillar
				</div>
				<h2 class="text-7xl bg-light w-min max-lg:px-4 lg:text-dark font-black font-saira">
					EDUCATION
				</h2>
			</div>

			<div class="relative lg:w-1/2 bg-brand z-10 text-black p-6">
				<p class="text-lg leading-relaxed font-medium">
					Every child deserves access to quality education. Elevatus provides school tuition,
					tutoring, and mentorship to help children stay in school, develop literacy, and prepare
					for a brighter future. Through consistent learning support, we’re building the foundations
					for independence and hope.
				</p>
				<div class="flex flex-col gap-4 mt-6">
					<span class="text-sm uppercase font-semibold tracking-widest"> Aligned with: </span>
					<div class="flex flex-wrap items-center gap-2">
						{@render SDGicon('SDG 4 – No Poverty', '/img/icons/SDG-01.png')}
						{@render SDGicon('SDG 4 – Quality Education', '/img/icons/SDG-04.png')}
						{@render SDGicon('SDG 4 – Decent Work and Economic Growth', '/img/icons/SDG-08.png')}
						{@render SDGicon('SDG 4 – Reduced Inequalities', '/img/icons/SDG-10.png')}
					</div>
				</div>
				<Button
					href="/programs/education"
					variant="outline"
					size="small"
					class="mb-4 mt-4 w-min text-light font-bold whitespace-nowrap outline-3 outline-light hover:text-brand hover:bg-light hover:outline-light"
					>Learn More</Button
				>
			</div>
		</div>

		<div class="relative w-full flex flex-col lg:items-end lg:justify-end lg:gap-16 lg:p-16">
			<img
				src="img/kids_eating.png"
				alt="Healthy meal for children"
				class="lg:absolute min-h-96 top-0 left-0 z-0 object-cover lg:w-8/12 lg:h-full"
			/>
			<div
				class="absolute max-lg:top-6 max-lg:left-1/2 max-lg:translate-x-[-50%] lg:relative z-10 lg:text-end"
			>
				<div
					class="font-light text-2xl -mb-2 pt-1 bg-light w-min max-lg:px-4 text-nowrap text-neutral-600 lg:ml-auto"
				>
					Second Pillar
				</div>
				<h2 class="text-7xl bg-light w-min max-lg:px-4 lg:text-dark font-black font-saira">
					NUTRITION
				</h2>
			</div>
			<div class="relative lg:w-1/2 bg-secondary z-10 text-black p-6">
				<p class="text-lg leading-relaxed font-medium">
					Hungry children can’t learn. Our meal programs ensure that every child receives a healthy,
					balanced diet at school — reducing absenteeism and improving performance. With over 8,000
					meals served, we’re not just feeding bodies but fueling futures.
				</p>
				<div class="flex flex-col gap-4 mt-6">
					<span class="text-sm uppercase font-semibold tracking-widest"> Aligned with: </span>
					<div class="flex flex-wrap items-center gap-2">
						{@render SDGicon('SDG 4 – Zero Hunger', '/img/icons/SDG-02.png')}
						{@render SDGicon('SDG 4 – Good Health and Well-Being', '/img/icons/SDG-03.png')}
						{@render SDGicon('SDG 4 – Quality Education', '/img/icons/SDG-04.png')}
					</div>
				</div>
				<Button
					href="/programs/nutrition"
					variant="outline"
					size="small"
					class="mb-4 mt-4 w-min text-light font-bold whitespace-nowrap outline-3 outline-light hover:text-secondary hover:bg-light hover:outline-light"
					>Learn More</Button
				>
			</div>
		</div>

		<div class="relative w-full flex flex-col lg:gap-16 lg:p-16">
			<img
				src="img/sewing_class.jpeg"
				alt="Children in class"
				class="lg:absolute min-h-96 top-0 right-0 z-0 object-cover lg:w-8/12 lg:h-full"
			/>

			<div class="absolute max-lg:top-6 max-lg:left-1/2 max-lg:translate-x-[-50%] lg:relative z-10">
				<div
					class="font-light text-2xl -mb-2 pt-1 bg-light w-min max-lg:px-4 text-nowrap text-neutral-600"
				>
					Third Pillar
				</div>
				<h2 class="text-7xl bg-light w-min max-lg:px-4 lg:text-dark font-black font-saira">
					SKILLS
				</h2>
			</div>

			<div class="relative lg:w-1/2 bg-accent z-10 text-black p-6">
				<p class="text-lg leading-relaxed font-medium">
					At the Youth Center, children discover new talents and learn practical skills such as
					sewing, cooking, and computer literacy — all in a safe, supportive environment. These
					opportunities nurture creativity, build confidence, and open doors to future self-reliance
					and friendship.
				</p>
				<div class="flex flex-col gap-4 mt-6">
					<span class="text-sm uppercase font-semibold tracking-widest"> Aligned with: </span>
					<div class="flex flex-wrap items-center gap-2">
						{@render SDGicon('SDG 4 – Quality Education', '/img/icons/SDG-04.png')}
						{@render SDGicon('SDG 4 – Decent Work and Economic Growth', '/img/icons/SDG-08.png')}
						{@render SDGicon(
							'SDG 4 – Peace, Justice and Strong Institutions',
							'/img/icons/SDG-16.png'
						)}
					</div>
				</div>
				<Button
					href="/programs/skills"
					variant="outline"
					size="small"
					class="mb-4 mt-4 w-min text-light font-bold whitespace-nowrap outline-3 outline-light hover:text-accent hover:bg-light hover:outline-light"
					>Learn More</Button
				>
			</div>
		</div>
	</div>
</section>

{#snippet SDGicon(title: string, src: string)}
	<img {src} alt={title} {title} class="h-32 w-32" />
{/snippet}
