<script>
	import Hero from '$lib/components/layout/Hero.svelte'

	const hero = {
		src: 'img/hero/hero_team.jpg',
		alt: 'Under Construction',
		title: 'Our Team',
		subtitle: 'Dedicated and Passionate'
	}

	const divisions = [
		{
			divisionName: 'The Board',
			members: [
				{
					firstName: 'Lacee',
					lastName: 'Curtis',
					role: 'Chairperson',
					src: 'img/team/lacee_curtis.jpg',
					interests: ['Lawyer', 'Dog Lover']
				},
				{
					firstName: 'Liam',
					lastName: 'Smith',
					role: 'Governing Member',
					src: 'img/team/liam_smith.jpg',
					interests: ['Law Intern', 'Bôgôsy']
				},
				{
					firstName: 'Zachary',
					lastName: 'Knight',
					role: 'Governing Member',
					src: 'img/team/zachary_knight.jpg',
					interests: ['Manager', 'Lemur Magnet']
				},
				{
					firstName: 'Nathan',
					lastName: 'Haynie',
					role: 'Governing Member',
					src: 'img/team/nathan_haynie.jpg',
					interests: []
				},
				{
					firstName: 'Spencer',
					lastName: 'Lehr',
					role: 'Treasurer',
					src: 'img/team/spencer_lehr.jpg',
					interests: ['Accountant', 'Professional Hugger']
				}
			]
		},
		{
			divisionName: 'Executive team',
			members: [
				{
					firstName: 'Julien',
					lastName: 'Connault',
					role: 'Program Manager',
					src: 'img/team/julien_connault.jpg',
					interests: ['Web Designer', 'Chocolate Addict']
				},
				{
					firstName: 'Nanouh',
					lastName: 'Connault',
					role: 'Secretary',
					src: 'img/team/nanouh_andrianaivoarivelo.jpg',
					interests: ['Photogrammeter', 'Desperate Housewife']
				},
				{
					firstName: 'Ricardo',
					lastName: 'Andriamihaja',
					role: 'Team Manager',
					src: 'img/team/ricardo_andriamihaja.jpg',
					interests: ['Jack of all trades', 'Selfie Poser']
				}
			]
		},
		{
			divisionName: 'Education Team',
			members: [
				{
					firstName: 'Istriah',
					lastName: 'Hefarison',
					role: 'Sewing/Physics Teacher',
					src: 'img/team/istriah_hefarison.jpg',
					interests: ['Business Graduate', 'She Knows Better']
				},
				{
					firstName: 'Fitahiana',
					lastName: 'Albetini',
					role: 'English Teacher',
					src: 'img/team/fitahiana_albetini.jpg',
					interests: ['Soccer Player', 'Best Smile Award']
				},
				{
					firstName: 'Onja',
					lastName: 'Rahanitriniavo',
					role: 'French Teacher',
					src: 'img/team/onja_rahanitriniavo.jpg',
					interests: ['Educator', 'Smile Dispenser']
				}
			]
		},
		{
			divisionName: 'Logistics Team',
			members: [
				{
					firstName: 'Solomanampy',
					lastName: 'Andriamihaja',
					role: 'Cook',
					src: 'img/team/solomanampy_andriamihaja.jpg',
					interests: ['Father', 'Hiker Enthusiast']
				},
				{
					firstName: 'Vero',
					lastName: 'Razainasolo',
					role: 'Cook',
					src: 'img/team/vero_razainasolo.jpg',
					interests: ['Singer', 'Gourmet']
				}
			]
		}
	]
</script>

<svelte:head>
	<title>Elevatus | Team</title>
</svelte:head>

<Hero {...hero} />

<!-- Our Team -->
<section class="flex flex-col max-w-6xl gap-8 px-8 mx-auto my-8">
	{#each divisions as division}
		<h2 class="m-auto text-4xl font-light text-blue-500 uppercase border-b-2 border-blue-500 w-fit">
			{division.divisionName}
		</h2>
		<div class="sm:flex">
			{#each division.members as member}
				<div class="flex items-center justify-between max-w-xs m-auto mb-4 sm:flex-col">
					<div class="board__picture">
						<div class="border-4 border-yellow-500 rounded-full">
							<img
								class="object-cover border-4 border-transparent rounded-full w-36 h-36"
								src={member.src}
								alt="Picture of {member.firstName} {member.lastName}"
							/>
						</div>
					</div>
					<div class="text-center smm:w-1/2">
						<h3 class="text-xl font-black leading-5 text-blue-900 uppercase">
							{member.firstName}<br />{member.lastName}
						</h3>
						<h4 class="font-bold text-yellow-500">{member.role}</h4>
						<!-- <h5>{member.interests[0]}<br />{member.interests[1]}</h5> -->
					</div>
				</div>
			{/each}
		</div>
	{/each}
</section>
