<script lang="ts">
	import Hero from '$lib/components/layout/Hero.svelte'
	import Button from '$lib/components/UI/Button.svelte'
	import { MetaTags } from 'svelte-meta-tags'
	import SDGCard from '../SDGcard.svelte'
	import ApproachCard from '../ApproachCard.svelte'

	const hero = {
		src: '/img/hero/four_kids.jpg',
		alt: 'Children in Madagascar education program',
		title: 'Education Support',
		subtitle: 'Giving every child the chance to stay in school and succeed'
	}
</script>

<svelte:head>
	<title>Elevatus | Education Support Program</title>
</svelte:head>

<MetaTags
	title="Education Support Program - Elevatus"
	description="Our sponsorship program ensures that financial hardship never becomes a barrier to learning for children in Madagascar."
	openGraph={{
		url: 'https://www.elevatus-foundation.org/programs/education',
		title: 'Education Support Program - Elevatus',
		description:
			'Our sponsorship program ensures that financial hardship never becomes a barrier to learning for children in Madagascar.',
		images: [
			{
				url: 'https://www.elevatus-foundation.org/img/education_problem.jpg',
				width: 800,
				height: 600,
				alt: 'Education Support Program'
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
				In Madagascar, many children drop out of school simply because their families cannot afford
				tuition, uniforms, books, or basic supplies. Others stay enrolled but fall behind
				academically, eventually leaving school without the skills they need to build a stable
				future.
			</p>
			<p>
				For vulnerable youth, especially those exposed to exploitation or child labor, staying in
				school is the most effective pathway toward safety, opportunity, and independence.
			</p>
			<div class="p-8 bg-brand-light/10 rounded-lg">
				<h3 class="mb-4 text-2xl font-bold text-brand">Our Mission</h3>
				<p class="text-lg font-medium">
					Our Education Support Program ensures that financial hardship never becomes a barrier to
					learning.
				</p>
			</div>
		</div>
		<div class="flex flex-col justify-center">
			<img
				src="/img/tutoring_classes.jpg"
				alt="Students receiving tutoring support at the Elevatus Youth Center"
				class="w-full h-full mon-h-80 object-cover rounded-lg shadow-lg mb-4"
			/>
			<p class="text-center text-gray-600 italic text-sm">
				Students receiving personalized tutoring support at our Youth Center
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
				<div class="text-8xl font-black font-saira text-light">40+</div>
				<p class="text-xl font-semibold">students currently supported through sponsorship</p>
			</div>

			<div class="text-center">
				<div class="text-8xl font-black font-saira text-light">2</div>
				<p class="text-xl font-semibold">tutoring sessions per week at the Youth Center</p>
			</div>

			<div class="text-center">
				<div class="text-8xl font-black font-saira text-light">80%</div>
				<p class="text-xl font-semibold">high school success rate vs. national 56%</p>
			</div>

			<div class="text-center">
				<div class="text-8xl font-black font-saira text-light">1:1</div>
				<p class="text-xl font-semibold">individual mentorship provided for every participant</p>
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
				title="Tuition and School Supplies"
				description="We cover:"
				listItems={[
					'School enrollment fees',
					'Uniforms and shoes',
					'Textbooks, notebooks, and essential materials'
				]}
				conclusion="This removes the financial pressure on families and allows children to attend school consistently."
			/>

			<ApproachCard
				number={2}
				title="Weekly Tutoring Support"
				description="At the Elevatus Youth Center, students attend tutoring sessions every Wednesday and Saturday. They receive:"
				listItems={[
					'Help with homework and exam preparation',
					'Literacy support and academic guidance',
					'One-on-one mentorship for individual needs',
					'Support for struggling students to catch up'
				]}
				conclusion="This allows struggling students to catch up and confident students to excel."
			/>

			<ApproachCard
				number={3}
				title="Mentorship & Monitoring"
				description="Our team maintains close communication with schools and families. We:"
				listItems={[
					'Track grades and attendance',
					'Identify students at risk of falling behind',
					'Provide tailor-made assistance when needed'
				]}
				conclusion="Every child receives individualized support, ensuring no one is left alone with their difficulties."
			/>

			<ApproachCard
				number={4}
				title="Focus on Vulnerable Youth"
				description="This program focuses on adolescents—those most at risk of dropping out, entering child labor, or becoming victims of exploitation."
				listItems={[
					'Serving Junior High and High School Youth (Ages 10–18)',
					'Protecting teens from child labor and exploitation',
					'Providing pathways to future employment and independence',
					'Building confidence and academic skills for success'
				]}
				conclusion="Keeping teens in school protects them today and empowers them for tomorrow."
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
				sdgNumber="SDG 1.2"
				title="Reduce Poverty"
				quote="By 2030, reduce at least by half the proportion of men, women and children of all ages living in poverty"
				description="By covering school costs, we remove financial barriers and increase long-term opportunities for vulnerable youth."
				href="https://sdgs.un.org/goals/goal1#targets_and_indicators"
			/>

			<SDGCard
				sdgNumber="SDG 4.1"
				title="Quality Primary & Secondary Education"
				quote="Ensure that all girls and boys complete free, equitable and quality primary and secondary education"
				description="Our comprehensive support ensures students complete their education with relevant learning outcomes."
				href="https://sdgs.un.org/goals/goal4#targets_and_indicators"
			/>

			<SDGCard
				sdgNumber="SDG 4.5"
				title="Equal Access to Education"
				quote="Eliminate gender disparities in education and ensure equal access for the vulnerable"
				description="Supporting girls and vulnerable youth so they have the same educational opportunities as others."
				href="https://sdgs.un.org/goals/goal4#targets_and_indicators"
			/>

			<SDGCard
				sdgNumber="SDG 8.6"
				title="Reduce Youth Not in Education"
				quote="Substantially reduce the proportion of youth not in employment, education or training"
				description="Keeping vulnerable adolescents in school and providing skills needed for future employment."
				href="https://sdgs.un.org/goals/goal8#targets_and_indicators"
			/>

			<SDGCard
				sdgNumber="SDG 8.7"
				title="End Child Labor"
				quote="Take immediate and effective measures to eradicate forced labour and end child labour in all its forms"
				description="Education provides the most effective pathway away from child labor toward safety and opportunity."
				href="https://sdgs.un.org/goals/goal8#targets_and_indicators"
			/>

			<SDGCard
				sdgNumber="SDG 10.2"
				title="Social & Economic Inclusion"
				quote="Empower and promote the social, economic and political inclusion of all"
				description="Bringing vulnerable children into safe, supportive educational environments where they can thrive."
				href="https://sdgs.un.org/goals/goal10#targets_and_indicators"
			/>
		</div>
	</div>
</section>

<!-- Call to Action with Success Story Integration -->
<section class="py-16 bg-dark">
	<div class="flex flex-col items-center w-full max-w-6xl gap-12 px-8 mx-auto text-light">
		<div class="text-center">
			<h2 class="mb-4 text-4xl font-black uppercase sm:text-6xl">
				<span class="text-brand">Make a</span> Difference
			</h2>
			<div class="w-24 h-1 mx-auto bg-brand"></div>
		</div>

		<div class="grid gap-12 lg:grid-cols-2 items-center max-w-5xl">
			<div class="order-2 lg:order-1 h-full min-h-80">
				<img
					src="/img/group_studying.jpg"
					alt="Students celebrating their academic achievements"
					class="w-full h-full object-cover rounded-lg shadow-lg"
				/>
			</div>
			<div class="order-1 lg:order-2 space-y-6">
				<div class="p-6 bg-brand/10 rounded-lg border-l-4 border-secondary">
					<p class="text-xl font-semibold text-secondary italic">
						"Education has given me hope for a better future. I can now dream of becoming a teacher
						and helping other children in my community."
					</p>
					<p class="mt-2 text-sm text-gray-300">- Marie, Age 16, Education Program Graduate</p>
				</div>
				<p class="text-xl font-semibold text-secondary">
					When you sponsor a child, you give them far more than tuition.
				</p>
				<p class="text-lg">
					You give them safety, confidence, and the chance to build a better future. Through our
					comprehensive support system, students not only stay in school but thrive academically,
					breaking the cycle of poverty for entire families.
				</p>
			</div>
		</div>

		<div class="flex flex-col gap-4 mt-8 sm:flex-row">
			<Button href="/donate" size="large">Become a Sponsor</Button>
			<Button href="/donate" variant="outline" size="large" class="hover:bg-light hover:text-dark"
				>Support the Program</Button
			>
		</div>
	</div>
</section>
