<script lang="ts">
	import Hero from '$lib/components/layout/Hero.svelte'
	import Button from '$lib/components/UI/Button.svelte'
	import { MetaTags } from 'svelte-meta-tags'

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
			<!-- Approach Item 1 -->
			<div class="p-8 bg-white rounded-lg shadow-lg">
				<div class="flex items-center mb-4">
					<div
						class="flex items-center justify-center w-12 h-12 mr-4 text-2xl font-bold text-white rounded-full bg-brand"
					>
						1
					</div>
					<h3 class="text-2xl font-bold">Safe, Supervised Environment</h3>
				</div>
				<p class="mb-4 text-lg">The Youth Center offers:</p>
				<ul class="space-y-2 text-lg list-disc list-inside">
					<li>A secure place to spend time after school</li>
					<li>Supervision by trained staff</li>
					<li>Protection from street risks, exploitation, or hazardous work</li>
				</ul>
				<p class="mt-4 text-lg font-medium text-brand">
					This ensures children are protected during the hours when they are most vulnerable.
				</p>
			</div>

			<!-- Approach Item 2 with integrated image -->
			<div class="p-8 bg-white rounded-lg shadow-lg">
				<div class="flex items-center mb-4">
					<div
						class="flex items-center justify-center w-12 h-12 mr-4 text-2xl font-bold text-white rounded-full bg-brand"
					>
						2
					</div>
					<h3 class="text-2xl font-bold">Skill-Building Workshops</h3>
				</div>
				<p class="mb-4 text-lg">
					We offer hands-on classes that give children a chance to discover new interests:
				</p>
				<ul class="space-y-2 text-lg list-disc list-inside">
					<li>Computer literacy</li>
					<li>Sewing and tailoring</li>
					<li>Cooking and nutrition</li>
					<li>Art and creative expression</li>
					<li>Basic trades and handicrafts</li>
				</ul>
				<p class="mt-4 text-lg font-medium text-brand">
					These activities foster confidence, creativity, and early career exploration.
				</p>
			</div>

			<!-- Approach Item 3 -->
			<div class="p-8 bg-white rounded-lg shadow-lg">
				<div class="flex items-center mb-4">
					<div
						class="flex items-center justify-center w-12 h-12 mr-4 text-2xl font-bold text-white rounded-full bg-brand"
					>
						3
					</div>
					<h3 class="text-2xl font-bold">Personal Development & Mentorship</h3>
				</div>
				<p class="mb-4 text-lg">
					Children receive encouragement, positive role models, and emotional support. We help them:
				</p>
				<ul class="space-y-2 text-lg list-disc list-inside">
					<li>Build confidence and self-esteem</li>
					<li>Develop social and communication skills</li>
					<li>Strengthen resilience and coping abilities</li>
					<li>Set personal goals and future aspirations</li>
				</ul>
				<p class="mt-4 text-lg font-medium text-brand">
					This mentorship plays a critical role in preventing school dropout and risky behavior.
				</p>
			</div>

			<!-- Approach Item 4 -->
			<div class="p-8 bg-white rounded-lg shadow-lg">
				<div class="flex items-center mb-4">
					<div
						class="flex items-center justify-center w-12 h-12 mr-4 text-2xl font-bold text-white rounded-full bg-brand"
					>
						4
					</div>
					<h3 class="text-2xl font-bold">Community Events & Activities</h3>
				</div>
				<p class="mb-4 text-lg">The Youth Center hosts:</p>
				<ul class="space-y-2 text-lg list-disc list-inside">
					<li>Christmas celebrations and holiday events</li>
					<li>Summer camps and educational trips</li>
					<li>Workshops with local professionals</li>
					<li>Cultural and recreational activities</li>
				</ul>
				<p class="mt-4 text-lg font-medium text-brand">
					These events expand children's horizons and strengthen their sense of belonging.
				</p>
			</div>

			<!-- Approach Item 5 -->
			<div class="p-8 bg-white rounded-lg shadow-lg md:col-span-2">
				<div class="flex items-center mb-4">
					<div
						class="flex items-center justify-center w-12 h-12 mr-4 text-2xl font-bold text-white rounded-full bg-brand"
					>
						5
					</div>
					<h3 class="text-2xl font-bold">Serving Children Ages 7–18</h3>
				</div>
				<div class="grid gap-6 md:grid-cols-2">
					<div>
						<h4 class="text-xl font-semibold mb-2 text-brand">Younger Children (7-12)</h4>
						<p class="text-lg">
							Benefit from safety, structured activities, and supervised learning time that keeps
							them engaged and protected.
						</p>
					</div>
					<div>
						<h4 class="text-xl font-semibold mb-2 text-brand">Older Children (13-18)</h4>
						<p class="text-lg">
							Gain practical skills, career exposure, and leadership opportunities that prepare them
							for adulthood.
						</p>
					</div>
				</div>
			</div>
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
			<a
				href="https://sdgs.un.org/goals/goal4#targets_and_indicators"
				target="_blank"
				class="p-6 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors duration-200"
			>
				<h3 class="mb-2 text-2xl font-black text-dark px-2 rounded-sm bg-light w-min text-nowrap">
					SDG 4.4
				</h3>
				<h4 class="mb-3 text-xl font-semibold">Youth Skills for Employment</h4>
				<p class="text-sm mb-2 text-gray-200 italic">
					"Substantially increase the number of youth and adults who have relevant skills for
					employment"
				</p>
				<p>Providing early vocational exposure, digital literacy, and practical skills training.</p>
			</a>

			<a
				href="https://sdgs.un.org/goals/goal4#targets_and_indicators"
				target="_blank"
				class="p-6 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors duration-200"
			>
				<h3 class="mb-2 text-2xl font-black text-dark px-2 rounded-sm bg-light w-min text-nowrap">
					SDG 4.5
				</h3>
				<h4 class="mb-3 text-xl font-semibold">Equal Access to Training</h4>
				<p class="text-sm mb-2 text-gray-200 italic">
					"Eliminate gender disparities and ensure equal access to education and vocational training
					for the vulnerable"
				</p>
				<p>
					Ensuring girls and vulnerable children have equal access to skill-building opportunities.
				</p>
			</a>

			<a
				href="https://sdgs.un.org/goals/goal8#targets_and_indicators"
				target="_blank"
				class="p-6 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors duration-200"
			>
				<h3 class="mb-2 text-2xl font-black text-dark px-2 rounded-sm bg-light w-min text-nowrap">
					SDG 8.6
				</h3>
				<h4 class="mb-3 text-xl font-semibold">Reduce Youth NEET</h4>
				<p class="text-sm mb-2 text-gray-200 italic">
					"Substantially reduce the proportion of youth not in employment, education or training"
				</p>
				<p>Keeping children engaged in learning and structured activities with future pathways.</p>
			</a>

			<a
				href="https://sdgs.un.org/goals/goal8#targets_and_indicators"
				target="_blank"
				class="p-6 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors duration-200"
			>
				<h3 class="mb-2 text-2xl font-black text-dark px-2 rounded-sm bg-light w-min text-nowrap">
					SDG 8.7
				</h3>
				<h4 class="mb-3 text-xl font-semibold">End Child Labor</h4>
				<p class="text-sm mb-2 text-gray-200 italic">
					"Take immediate and effective measures to eradicate forced labour and end child labour in
					all its forms"
				</p>
				<p>Offering a structured, safe environment instead of unsafe work or unsupervised time.</p>
			</a>

			<a
				href="https://sdgs.un.org/goals/goal10#targets_and_indicators"
				target="_blank"
				class="p-6 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors duration-200"
			>
				<h3 class="mb-2 text-2xl font-black text-dark px-2 rounded-sm bg-light w-min text-nowrap">
					SDG 10.2
				</h3>
				<h4 class="mb-3 text-xl font-semibold">Social & Economic Inclusion</h4>
				<p class="text-sm mb-2 text-gray-200 italic">
					"Empower and promote the social, economic and political inclusion of all"
				</p>
				<p>
					Empowering children from low-income families with equal access to learning and growth.
				</p>
			</a>

			<a
				href="https://sdgs.un.org/goals/goal16#targets_and_indicators"
				target="_blank"
				class="p-6 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-colors duration-200"
			>
				<h3 class="mb-2 text-2xl font-black text-dark px-2 rounded-sm bg-light w-min text-nowrap">
					SDG 16.2
				</h3>
				<h4 class="mb-3 text-xl font-semibold">End Violence Against Children</h4>
				<p class="text-sm mb-2 text-gray-200 italic">
					"End abuse, exploitation, trafficking and all forms of violence against children"
				</p>
				<p>Providing a safe space and protective oversight during vulnerable afternoon hours.</p>
			</a>
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
