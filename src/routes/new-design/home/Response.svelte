<script lang="ts">
	import Button from '$lib/components/UI/Button.svelte'
	import HighlightedText from '$lib/components/UI/HighlightedText.svelte'
	import { cn } from '$lib/utils'

	const { className }: { className?: string } = $props()
</script>

<section id="about-section" class={cn([className, '	flex flex-col items-center'])}>
	<div
		class="flex flex-col items-center justify-center max-w-md m-auto text-center sm:max-w-[720px] min-h-96 px-4"
	>
		<h2 class="text-4xl sm:text-6xl font-black text-dark text-center uppercase mb-4">
			Our
			<HighlightedText color="dark" text="light">Response</HighlightedText>
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
	<div class="relative h-[80vh] overflow-hidden bg-dark">
		<img
			src="img/party_youth_center.png"
			class="blur-[0px] object-cover opacity-100 w-screen h-full"
			alt="Party Youth Center"
		/>
		<!-- Overlay -->
		<div class="absolute inset-0 bg-linear-to-t from-transparent from-50% to-dark to-120%"></div>

		<div
			class="absolute top-1/5 lg:top-1/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-light p-4 w-full text-center"
		>
			<h3
				class="text-5xl md:text-5xl lg:text-6xl font-bold mb-2 uppercase font-saira tracking-widest"
			>
				<div class="sm:mb-4 text-6xl md:text-7xl lg:text-9xl">Three pillars</div>
				<div class="flex max-sm:flex-col w-min justify-center mx-auto">
					<HighlightedText color="brand" text="light">Education</HighlightedText>
					<HighlightedText color="secondary" text="light">Nutrition</HighlightedText>
					<HighlightedText color="accent" text="light">Skills</HighlightedText>
				</div>
			</h3>
		</div>
	</div>

	<!-- Education -->
	<div class="">
		<div
			class="w-full h-12 sm:h-16 max-sm:py-1 px-8 bg-brand text-4xl sm:text-6xl font-extrabold text-light"
		>
			EDUCATION
		</div>
		<div class="mx-auto grid md:grid-cols-2 items-center" id="education">
			<img
				src="img/group_studying.jpg"
				alt="Children in class"
				class="bg-dark object-cover w-full h-96 -scale-x-100"
			/>
			<div class="p-4">
				<p class="text-lg leading-relaxed">
					Every child deserves access to quality education. Elevatus provides school tuition,
					tutoring, and mentorship to help children stay in school, develop literacy, and prepare
					for a brighter future. Through consistent learning support, we’re building the foundations
					for independence and hope.
				</p>
				<Button
					variant="outline"
					size="small"
					class="mb-4 ml-auto mt-4 text-brand outline-brand hover:text-light hover:bg-brand hover:outline-brand"
					><span>Learn More</span></Button
				>
			</div>
		</div>
		<!-- Nutrition -->
		<div
			class="w-full h-12 sm:h-16 max-sm:py-1 px-8 bg-secondary text-4xl sm:text-6xl font-extrabold text-light text-end"
		>
			NUTRITION
		</div>
		<div class="mx-auto grid md:grid-cols-2 items-center" id="nutrition">
			<img
				src="img/kids_eating.png"
				alt="Healthy meal for children"
				class="bg-dark object-cover w-full h-96 order-1 md:order-2"
			/>
			<div class="p-4 order-2 md:order-1">
				<p class="text-lg leading-relaxed">
					Hungry children can’t learn. Our meal programs ensure that every child receives a healthy,
					balanced diet at school — reducing absenteeism and improving performance. With over 8,000
					meals served, we’re not just feeding bodies but fueling futures.
				</p>
				<Button
					variant="outline"
					size="small"
					class="mb-4 mr-auto mt-4 text-secondary outline-secondary hover:text-light hover:bg-secondary hover:outline-secondary"
					><span>Learn More</span></Button
				>
			</div>
		</div>
		<!-- Skills -->
		<div
			class="w-full h-12 sm:h-16 max-sm:py-1 px-8 bg-accent text-4xl sm:text-6xl font-extrabold text-light"
		>
			SKILLS
		</div>
		<div class="mx-auto grid md:grid-cols-2 items-center" id="skills">
			<img
				src="img/sewing_class.jpeg"
				alt="Youth vocational training"
				class="bg-dark object-cover w-full h-96"
			/>
			<div class="p-4">
				<p class="text-lg leading-relaxed">
					At the Youth Center, children discover new talents and learn practical skills such as
					sewing, cooking, and computer literacy — all in a safe, supportive environment. These
					opportunities nurture creativity, build confidence, and open doors to future self-reliance
					and friendship.
				</p>
				<Button
					variant="outline"
					size="small"
					class="mb-4 ml-auto mt-4 text-accent outline-accent hover:text-light hover:bg-accent hover:outline-accent"
					><span>Learn More</span></Button
				>
			</div>
		</div>
	</div>
</section>
