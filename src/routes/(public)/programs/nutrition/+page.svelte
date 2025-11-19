<script lang="ts">
	import Hero from '$lib/components/layout/Hero.svelte'
	import Button from '$lib/components/UI/Button.svelte'
	import { MetaTags } from 'svelte-meta-tags'
	import SDGCard from '../SDGcard.svelte'
	import ApproachCard from '../ApproachCard.svelte'

	const hero = {
		src: '/img/kids_eating.png',
		alt: 'Children receiving nutritious meals at school in Madagascar',
		title: 'School Nutrition',
		subtitle:
			'Keeping children in school by ensuring they are nourished, healthy, and able to learn'
	}
</script>

<svelte:head>
	<title>Elevatus | School Nutrition Program</title>
</svelte:head>

<MetaTags
	title="School Nutrition Program - Elevatus"
	description="Our school nutrition program provides daily nutritious meals to keep children healthy, engaged in learning, and away from child labor in Madagascar."
	openGraph={{
		url: 'https://www.elevatus-foundation.org/programs/nutrition',
		title: 'School Nutrition Program - Elevatus',
		description:
			'Our school nutrition program provides daily nutritious meals to keep children healthy, engaged in learning, and away from child labor in Madagascar.',
		images: [
			{
				url: 'https://www.elevatus-foundation.org/img/kids_eating.png',
				width: 800,
				height: 600,
				alt: 'School Nutrition Program'
			}
		],
		siteName: 'Elevatus'
	}}
/>

<Hero {...hero} />

<!-- Why This Program Matters -->
<section class="flex flex-col items-center w-full max-w-6xl gap-8 px-8 mx-auto my-16">
	<div class="text-center">
		<h2 class="mb-4 text-4xl font-black uppercase sm:text-6xl">
			Why This Program <span class="text-brand">Matters</span>
		</h2>
		<div class="w-24 h-1 mx-auto mb-8 bg-brand"></div>
	</div>

	<div class="grid gap-12 lg:grid-cols-3 lg:gap-16">
		<div class="lg:col-span-2 space-y-6 text-lg">
			<p>
				In Madagascar, thousands of children attend school on an empty stomach. Hunger affects
				concentration, attendance, memory, and physical development. Most school dropouts happen in
				primary school, often because children are too hungry or too weak to keep attending.
			</p>
			<p>
				By providing consistent, nutritious meals at school, Elevatus helps children stay in class,
				learn effectively, and grow safely — reducing long-term risks of malnutrition and child
				labor.
			</p>
			<div class="p-8 bg-brand-light/10 rounded-lg">
				<h3 class="mb-4 text-2xl font-bold text-brand">Our Mission</h3>
				<p class="text-lg font-medium">
					Ensuring every child has the nutrition they need to learn, grow, and thrive in school.
				</p>
			</div>
		</div>
		<div class="flex flex-col justify-center">
			<img
				src="/img/food_distribution.jpg"
				alt="Daily meal distribution at a school in Madagascar"
				class="w-full h-full mon-h-80 object-cover rounded-lg shadow-lg mb-4"
			/>
			<p class="text-center text-gray-600 italic text-sm">
				Daily nutritious meals being distributed to students at our partner schools
			</p>
		</div>
	</div>
</section>

<!-- Impact Statistics -->
<section class="py-16 bg-secondary">
	<div class="flex flex-col items-center w-full max-w-6xl gap-12 px-8 mx-auto text-dark">
		<h2 class="text-4xl font-black uppercase sm:text-6xl">
			The <span class="text-light"> Impact </span>
			<div class="w-24 h-1 mx-auto mt-4 bg-light"></div>
		</h2>

		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
			<div class="text-center">
				<div class="text-8xl font-black font-saira text-light">200+</div>
				<p class="text-xl font-semibold">daily meals served to primary school students</p>
			</div>

			<div class="text-center">
				<div class="text-8xl font-black font-saira text-light">85%</div>
				<p class="text-xl font-semibold">attendance improvement on feeding days</p>
			</div>

			<div class="text-center">
				<div class="text-8xl font-black font-saira text-light">100%</div>
				<p class="text-xl font-semibold">
					early identification of children at risk of malnutrition
				</p>
			</div>

			<div class="text-center">
				<div class="text-8xl font-black font-saira text-light">50%</div>
				<p class="text-xl font-semibold">reduced dropout risk for participating schools</p>
			</div>
		</div>
	</div>
</section>

<!-- Our Approach -->
<section class="py-16 bg-light">
	<div class="flex flex-col items-center w-full max-w-6xl gap-12 px-8 mx-auto">
		<div class="text-center">
			<h2 class="mb-4 text-4xl font-black uppercase sm:text-6xl">
				Our <span class="text-brand">Approach</span>
			</h2>
			<div class="w-24 h-1 mx-auto mb-8 bg-brand"></div>
		</div>

		<div class="grid gap-8 md:grid-cols-2 lg:gap-12">
			<ApproachCard
				number={1}
				title="Daily Nutritious Meals"
				description="We provide meals designed to support healthy growth and sustained concentration. This improves:"
				listItems={[
					'Attendance rates',
					'Energy levels throughout the day',
					'Classroom engagement',
					'Academic performance'
				]}
				conclusion="For many children, this is their most reliable meal of the day."
			/>

			<ApproachCard
				number={2}
				title="Supporting School Retention"
				description="When children receive food at school:"
				listItems={[
					'Families are more motivated to keep them enrolled',
					'Dropout rates decrease significantly',
					'The incentive to send children to work is reduced'
				]}
				conclusion="Nutrition becomes a powerful driver of education."
			/>

			<ApproachCard
				number={3}
				title="Identifying At-Risk Children"
				description="We work directly with schools to:"
				listItems={[
					'Identify children who show signs of undernutrition',
					'Monitor progress and development',
					'Connect them to additional support when needed'
				]}
				conclusion="This approach lets us intervene early and prevent long-term developmental harm."
			/>

			<ApproachCard
				number={4}
				title="Focus on Primary Students"
				description="The nutrition program focuses on primary school students — those at the highest risk of dropping out and entering child labor."
				listItems={[
					'Protecting Younger Children (Ages 5–12) from malnutrition',
					'Ensuring proper nutrition during critical developmental years',
					'Building foundation for lifelong health and learning'
				]}
				conclusion="Proper nutrition during these years is essential for lifelong health and learning."
			/>
		</div>
	</div>
</section>

<!-- SDG Impact -->
<section class="py-16 bg-brand">
	<div class="flex flex-col items-center w-full max-w-6xl gap-12 px-8 mx-auto text-white">
		<div class="text-center">
			<h2 class="mb-4 text-4xl font-black uppercase sm:text-6xl text-light">
				<div>
					<span class="text-dark">S</span>ustainable
				</div>
				<div>
					<span class="text-dark">D</span>evelopment
				</div>
				<div>
					<span class="text-dark">G</span>oals
				</div>
			</h2>
			<div class="w-24 h-1 mx-auto mb-8 bg-secondary"></div>
			<p class="max-w-3xl mx-auto text-xl">
				We align our actions with global development standards. This program directly contributes
				to:
			</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			<SDGCard
				sdgNumber="SDG 2.1"
				title="End Hunger"
				quote="By 2030, end hunger and ensure access by all people to safe, nutritious and sufficient food"
				description="Providing reliable daily food access for vulnerable children in Madagascar's most at-risk communities."
				href="https://sdgs.un.org/goals/goal2#targets_and_indicators"
			/>

			<SDGCard
				sdgNumber="SDG 2.2"
				title="End All Forms of Malnutrition"
				quote="End all forms of malnutrition, including achieving targets on stunting and wasting in children under 5"
				description="Helping prevent stunting, wasting, and other long-term effects of childhood undernutrition."
				href="https://sdgs.un.org/goals/goal2#targets_and_indicators"
			/>

			<SDGCard
				sdgNumber="SDG 3.2"
				title="Reduce Child Mortality"
				quote="End preventable deaths of newborns and children under 5 years of age"
				description="Improved nutrition strengthens immunity and reduces preventable illnesses among young children."
				href="https://sdgs.un.org/goals/goal3#targets_and_indicators"
			/>

			<SDGCard
				sdgNumber="SDG 4.1"
				title="Quality Primary Education"
				quote="Ensure that all girls and boys complete free, equitable and quality primary education"
				description="Nutrition improves attendance, attention, learning outcomes, and school completion rates."
				href="https://sdgs.un.org/goals/goal4#targets_and_indicators"
			/>

			<SDGCard
				sdgNumber="SDG 8.7"
				title="End Child Labor"
				quote="Take immediate and effective measures to eradicate forced labour and end child labour in all its forms"
				description="By increasing school retention, we reduce the likelihood that children will enter hazardous labor environments."
				href="https://sdgs.un.org/goals/goal8#targets_and_indicators"
			/>
		</div>
	</div>
</section>

<!-- Call to Action with Success Story Integration -->
<section class="py-16 bg-dark">
	<div class="flex flex-col items-center w-full max-w-6xl gap-12 px-8 mx-auto text-light">
		<div class="text-center">
			<h2 class="mb-4 text-4xl font-black uppercase sm:text-6xl">
				Feed a <span class="text-brand">Future</span>
			</h2>
			<div class="w-24 h-1 mx-auto bg-brand"></div>
		</div>

		<div class="grid gap-12 lg:grid-cols-2 items-center max-w-5xl">
			<div class="order-2 lg:order-1 h-full min-h-80">
				<img
					src="/img/chronic_malnutrition.png"
					alt="Children benefiting from the school nutrition program"
					class="w-full h-full object-cover rounded-lg shadow-lg"
				/>
			</div>
			<div class="order-1 lg:order-2 space-y-6">
				<div class="p-6 bg-brand/10 rounded-lg border-l-4 border-secondary">
					<p class="text-xl font-semibold text-secondary italic">
						"Since the school feeding program started, my daughter never misses school. She's
						healthier, happier, and learning so much more."
					</p>
					<p class="mt-2 text-sm text-gray-300">- Hanta, Mother of Program Participant</p>
				</div>
				<p class="text-xl font-semibold text-secondary">Feeding a child feeds their future.</p>
				<p class="text-lg">
					Your support keeps children healthy, safe, and in the classroom — where they belong. Every
					meal is an investment in breaking the cycle of poverty and protecting vulnerable children
					from exploitation.
				</p>
			</div>
		</div>

		<div class="flex flex-col gap-4 mt-8 sm:flex-row">
			<Button href="/donate" size="large">Support School Nutrition</Button>
			<Button href="/donate" variant="outline" size="large" class="hover:bg-light hover:text-dark"
				>Donate to the Program</Button
			>
		</div>
	</div>
</section>
