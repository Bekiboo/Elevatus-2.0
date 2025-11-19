<script lang="ts">
	import Hero from '$lib/components/layout/Hero.svelte'
	import Button from '$lib/components/UI/Button.svelte'
	import { MetaTags } from 'svelte-meta-tags'
	import SDGCard from '../SDGcard.svelte'
	import ApproachCard from '../ApproachCard.svelte'

	const hero = {
		src: '/img/sewing_classes.jpg',
		alt: 'Youth learning skills at the Elevatus Youth Center in Madagascar',
		title: 'Youth Center',
		subtitle: 'A safe place for children to learn, grow, and discover their future potential'
	}
</script>

<svelte:head>
	<title>Elevatus | Youth Center: Skills & Safety Program</title>
</svelte:head>

<MetaTags
	title="Youth Center: Skills & Safety Program - Elevatus"
	description="Our Youth Center provides a safe, supervised environment where children learn practical skills, receive mentorship, and build confidence for their future."
	openGraph={{
		url: 'https://www.elevatus-foundation.org/programs/skills',
		title: 'Youth Center: Skills & Safety Program - Elevatus',
		description:
			'Our Youth Center provides a safe, supervised environment where children learn practical skills, receive mentorship, and build confidence for their future.',
		images: [
			{
				url: 'https://www.elevatus-foundation.org/img/sewing_classes.jpg',
				width: 800,
				height: 600,
				alt: 'Youth Center Skills Program'
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
				Many children in vulnerable communities spend their afternoons unsupervised, exposed to
				unsafe environments, peer pressure, exploitation, or the risk of entering child labor. At
				the same time, young people rarely have opportunities to explore their talents, learn
				practical skills, or receive positive mentorship.
			</p>
			<p>
				The Elevatus Youth Center creates a safe, structured environment where children can study,
				receive guidance, and build skills that enrich their lives — helping them grow into
				confident, capable, and independent young adults.
			</p>
			<div class="p-8 bg-brand-light/10 rounded-lg">
				<h3 class="mb-4 text-2xl font-bold text-brand">Our Mission</h3>
				<p class="text-lg font-medium">
					Providing a safe space where children can discover their potential and build the skills
					that shape their future.
				</p>
			</div>
		</div>
		<div class="flex flex-col justify-center">
			<img
				src="/img/party_youth_center.jpg"
				alt="Children participating in activities at the Elevatus Youth Center"
				class="w-full h-full mon-h-80 object-cover rounded-lg shadow-lg mb-4"
			/>
			<p class="text-center text-gray-600 italic text-sm">
				Children engaged in community activities and celebrations at our Youth Center
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
				<div class="text-8xl font-black font-saira text-light">120+</div>
				<p class="text-xl font-semibold">children receive safe afternoons weekly</p>
			</div>

			<div class="text-center">
				<div class="text-8xl font-black font-saira text-light">6</div>
				<p class="text-xl font-semibold">hands-on skill-building workshops offered</p>
			</div>

			<div class="text-center">
				<div class="text-8xl font-black font-saira text-light">95%</div>
				<p class="text-xl font-semibold">improved school engagement through structured routines</p>
			</div>

			<div class="text-center">
				<div class="text-8xl font-black font-saira text-light">100%</div>
				<p class="text-xl font-semibold">reduced exposure to child labor risks and exploitation</p>
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
				title="Safe, Supervised Environment"
				description="The Youth Center offers:"
				listItems={[
					'A secure place to spend time after school',
					'Supervision by trained staff',
					'Protection from street risks, exploitation, or hazardous work'
				]}
				conclusion="This ensures children are protected during the hours when they are most vulnerable."
			/>

			<ApproachCard
				number={2}
				title="Skill-Building Workshops"
				description="We offer hands-on classes that give children a chance to discover new interests:"
				listItems={[
					'Computer literacy',
					'Sewing and tailoring',
					'Cooking and nutrition',
					'Art and creative expression',
					'Basic trades and handicrafts'
				]}
				conclusion="These activities foster confidence, creativity, and early career exploration."
			/>

			<ApproachCard
				number={3}
				title="Personal Development & Mentorship"
				description="Children receive encouragement, positive role models, and emotional support. We help them:"
				listItems={[
					'Build confidence and self-esteem',
					'Develop social and communication skills',
					'Strengthen resilience and coping abilities',
					'Set personal goals and future aspirations'
				]}
				conclusion="This mentorship plays a critical role in preventing school dropout and risky behavior."
			/>

			<ApproachCard
				number={4}
				title="Community Events & Activities"
				description="The Youth Center hosts:"
				listItems={[
					'Christmas celebrations and holiday events',
					'Summer camps and educational trips',
					'Workshops with local professionals',
					'Cultural and recreational activities'
				]}
				conclusion="These events expand children's horizons and strengthen their sense of belonging."
			/>

			<ApproachCard
				number={5}
				title="Serving Children Ages 7–18"
				description="We serve children across different age groups, each with tailored approaches:"
				listItems={[
					'Younger Children (7-12): Benefit from safety, structured activities, and supervised learning time that keeps them engaged and protected',
					'Older Children (13-18): Gain practical skills, career exposure, and leadership opportunities that prepare them for adulthood'
				]}
				conclusion="This age-appropriate approach ensures every child receives the support they need for their developmental stage."
				className="md:col-span-2"
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
				sdgNumber="SDG 4.4"
				title="Youth Skills for Employment"
				quote="Substantially increase the number of youth and adults who have relevant skills for employment"
				description="Providing early vocational exposure, digital literacy, and practical skills training."
				href="https://sdgs.un.org/goals/goal4#targets_and_indicators"
			/>

			<SDGCard
				sdgNumber="SDG 4.5"
				title="Equal Access to Training"
				quote="Eliminate gender disparities and ensure equal access to education and vocational training for the vulnerable"
				description="Ensuring girls and vulnerable children have equal access to skill-building opportunities."
				href="https://sdgs.un.org/goals/goal4#targets_and_indicators"
			/>

			<SDGCard
				sdgNumber="SDG 8.6"
				title="Reduce Youth NEET"
				quote="Substantially reduce the proportion of youth not in employment, education or training"
				description="Keeping children engaged in learning and structured activities with future pathways."
				href="https://sdgs.un.org/goals/goal8#targets_and_indicators"
			/>

			<SDGCard
				sdgNumber="SDG 8.7"
				title="End Child Labor"
				quote="Take immediate and effective measures to eradicate forced labour and end child labour in all its forms"
				description="Offering a structured, safe environment instead of unsafe work or unsupervised time."
				href="https://sdgs.un.org/goals/goal8#targets_and_indicators"
			/>

			<SDGCard
				sdgNumber="SDG 10.2"
				title="Social & Economic Inclusion"
				quote="Empower and promote the social, economic and political inclusion of all"
				description="Empowering children from low-income families with equal access to learning and growth."
				href="https://sdgs.un.org/goals/goal10#targets_and_indicators"
			/>

			<SDGCard
				sdgNumber="SDG 16.2"
				title="End Violence Against Children"
				quote="End abuse, exploitation, trafficking and all forms of violence against children"
				description="Providing a safe space and protective oversight during vulnerable afternoon hours."
				href="https://sdgs.un.org/goals/goal16#targets_and_indicators"
			/>
		</div>
	</div>
</section>

<!-- Call to Action with Success Story Integration -->
<section class="py-16 bg-dark">
	<div class="flex flex-col items-center w-full max-w-6xl gap-12 px-8 mx-auto text-light">
		<div class="text-center">
			<h2 class="mb-4 text-4xl font-black uppercase sm:text-6xl">
				Shape a <span class="text-brand">Future</span>
			</h2>
			<div class="w-24 h-1 mx-auto bg-brand"></div>
		</div>

		<div class="grid gap-12 lg:grid-cols-2 items-center max-w-5xl">
			<div class="order-2 lg:order-1 h-full min-h-80">
				<img
					src="/img/volunteer_running_with_kids.jpg"
					alt="Children and volunteers enjoying activities at the Youth Center"
					class="w-full h-full object-cover rounded-lg shadow-lg"
				/>
			</div>
			<div class="order-1 lg:order-2 space-y-6">
				<div class="p-6 bg-brand/10 rounded-lg border-l-4 border-secondary">
					<p class="text-xl font-semibold text-secondary italic">
						"The Youth Center gave me a place to belong. I learned to sew, made friends, and
						discovered I want to become a fashion designer. Now I know my dreams are possible."
					</p>
					<p class="mt-2 text-sm text-gray-300">- Nadia, Age 14, Youth Center Participant</p>
				</div>
				<p class="text-xl font-semibold text-secondary">
					A safe space can change the path of a child's life.
				</p>
				<p class="text-lg">
					Your support helps children grow, learn, and build the skills that shape their future.
					Every afternoon spent in safety is an investment in breaking the cycle of poverty and
					exploitation.
				</p>
			</div>
		</div>

		<div class="flex flex-col gap-4 mt-8 sm:flex-row">
			<Button href="/donate" size="large">Support the Youth Center</Button>
			<Button href="/donate" variant="outline" size="large" class="hover:bg-light hover:text-dark"
				>Donate to this Program</Button
			>
		</div>
	</div>
</section>
