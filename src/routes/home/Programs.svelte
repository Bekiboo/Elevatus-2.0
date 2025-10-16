<script lang="ts">
	import Program from './Program.svelte'

	const programs = [
		{
			src: 'img/program/food_distribution.jpg',
			title: 'Food Distribution',
			body: [
				'No child should have to learn on an empty stomach.',
				'In 2023, Elevatus Foundation provided over 8,000 meals to children in need, helping prevent malnutrition and support learning.',
				'With your support, we aim to double that impact in 2025.'
			]
		},
		{
			src: 'img/program/tutoring_classes.jpg',
			title: 'Tutoring Classes',
			body: [
				'Each week, students show up after school—eager to learn, even when they don’t have to.',
				'Participation has grown well beyond expectations, and we now have many junior school students and high schoolers asking to join.',
				'To meet the growing demand, we need your support to expand our teaching staff and create more classroom space for eager learners.'
			]
		},
		{
			src: 'img/program/sewing_classes.jpg',
			title: 'Trade Classes',
			body: [
				'At Elevatus, we believe that hands-on skills can open doors—especially for children growing up in rural communities.',
				'Throughout the year, every student has the chance to learn sewing with Felana, who doubles as their math tutor.',
				'With continued support and new sponsorships, we plan to expand our vocational offerings to include carpentry, cooking, and more—giving students the tools to shape their own futures.'
			]
		},
		{
			src: 'img/program/computer_literacy.png',
			title: 'Computer Literacy Program',
			body: [
				'In today’s world, basic computer skills are essential for higher education and future employment.',
				'Many children in rural areas face barriers to using technology, which can limit their opportunities.',
				'Our new Computer Literacy Program introduces students to computers and digital tools, preparing them for high school, college, and beyond.'
			]
		},
		{
			src: 'img/program/school_supplies.jpg',
			title: 'School Supplies and Tuition',
			body: [
				'Every child deserves the tools to succeed in the classroom.',
				'Each year, Elevatus covers tuition and provides school supplies for all sponsored students, along with notebooks for every child at the school.',
				'We continue to support them throughout the year, making sure supplies are replenished and no student falls behind for lack of resources.'
			]
		},
		{
			src: 'img/program/youth_center.png',
			title: 'Youth Center Development',
			body: [
				'After renovating and expanding 4 schools between 2016 and 2020, Elevatus realized the need for a space of our own to fully support children’s learning and development.',
				'In 2023, we began building a Youth Center in the same region where we have worked for years.',
				'The center now includes 3 classrooms and hosts all our activities—from tutoring and trade classes to dance and sports.',
				'With plenty of space to grow, our vision is to expand the Youth Center into a vibrant community hub for 200 children.'
			]
		},
		{
			src: 'img/program/activities.jpg',
			title: 'Activities',
			body: [
				'Every month, Elevatus hosts a special activity for sponsored students—ranging from a trip to the zoo to dance classes to sports tournaments.',
				'For children growing up in rural areas, these experiences are rare. They offer joy, new perspectives, and a chance to simply be kids.'
			]
		}
	]
</script>

<section class="flex flex-col gap-16 overflow-hidden">
	{#each programs as program, index}
		<Program {program} {index} />
	{/each}
</section>
