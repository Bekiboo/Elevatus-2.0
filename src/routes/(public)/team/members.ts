const members = [
	{
		firstName: 'Lacee',
		lastName: 'Curtis',
		role: 'Chairperson',
		src: 'img/team/lacee_curtis',
		group: 'board',
		bio: [
			"Lacee Curtis is a passionate attorney and non-profit leader with a strong commitment to creating opportunities for underprivileged communities. As a Co-Founder of Elevatus, Lacee has dedicated over a decade to empowering children in Madagascar through education, nutrition, and self-reliance programs. She oversees fundraising, program evaluation, and strategic planning, ensuring the foundation's ongoing success.",

			'In addition to her work with Elevatus, Lacee is a practicing attorney at Hanson Baker Ludlow Drumheller P.S., specializing in real estate and business law. A graduate of Brigham Young University, Lacee earned both her JD (magna cum laude) and MPA, with recognition for her academic excellence and leadership. Lacee’s dedication to improving lives continues to drive her professional and philanthropic endeavors.'
		]
	},
	{
		firstName: 'Liam',
		lastName: 'Smith',
		role: 'Governing Member',
		src: 'img/team/liam_smith',
		group: 'board',
		bio: [
			'Liam Smith is a dedicated international law and human rights professional with extensive experience in legal advisory roles. Currently serving as an Attorney-Adviser for the Office of the Legal Adviser at the U.S. Department of State, Liam has a deep commitment to promoting justice and development. He holds a Juris Doctorate (cum laude) and a Master of Public Administration from Brigham Young University, where he earned multiple awards for academic excellence.',

			"Liam's connection to Madagascar began during his service as a missionary, and he continues to contribute to the region through his work with Elevatus Foundation. As a founding member of the board since 2016, he has been instrumental in shaping programs that provide education, nutrition, and opportunities for children in need. Beyond his professional life, Liam is an outdoor enthusiast, traveler, and advocate for meaningful change."
		]
	},
	{
		firstName: 'Zachary',
		lastName: 'Knight',
		role: 'Governing Member',
		src: 'img/team/zachary_knight',
		group: 'board',
		bio: [
			'Zachary Knight is an experienced project manager and international development professional with over a decade of expertise in USG-funded initiatives and non-profit leadership. He has served as a Governing Board Director for Elevatus since its inception in 2016, playing a critical role in shaping its strategic vision and fostering donor relationships to sustain programs supporting vulnerable children in Madagascar.',

			'Currently a Senior Operations Manager for the USAID Competitive Economy Program in Ukraine, Zachary brings a wealth of experience in managing complex projects, grant oversight, and capacity building. A former Peace Corps volunteer in Madagascar, he also managed a sustainable hotel in a remote national park and has extensive experience leading large teams and implementing impactful community projects. Zachary holds a degree in International Relations from the University of Alabama, graduating summa cum laude.'
		]
	},
	{
		firstName: 'Julien',
		lastName: 'Connault',
		role: 'Country Director',
		src: 'img/team/julien_connault',
		group: 'executive',
		bio: [
			'Julien Connault is a dedicated project coordinator and web developer with extensive experience in nonprofit management and community development. As a Project Coordinator for Elevatus, Julien oversees recruitment, training, and management while also handling finances and communications with the board in the U.S. He has been integral in launching impactful initiatives, such as the micro-loan program for struggling families in Madagascar, and has developed the foundation’s website.',

			'With a background in web development, Julien has successfully implemented several technology solutions to streamline operations and expand Elevatus’s reach. He also has experience in public health, community outreach, and project management, having worked on various initiatives to support children in Madagascar. Julien’s commitment to social entrepreneurship and community empowerment continues to drive his work with Elevatus.'
		]
	},
	{
		firstName: 'Nanouh',
		lastName: 'Andoniaina',
		role: 'Administrative and Finance Coordinator',
		src: 'img/team/nanouh_andrianaivoarivelo',
		group: 'executive',
		bio: [
			'Nanouh Andoniaina is an assistant manager for Elevatus, where she has been serving since 2018. She plays a key role in navigating the complexities of nonprofit operations in Madagascar, with a deep understanding of Malagasy culture and local administration. Nanouh’s expertise helps Elevatus expand its reach and ensure effective program implementation for children affected by child labor and trafficking.',

			'Since 2017, Nanouh has also worked as the in-country manager for the Bountiful Children Foundation in Madagascar. In this role, she oversees food distribution to malnourished and stunted children in Antananarivo, Antsirabe, and Tamatave while supervising the national team. Prior to her nonprofit career, Nanouh worked as a photogrammeter for 12 years, bringing valuable technical expertise to her diverse skill set.'
		]
	},
	{
		firstName: 'Ricardo',
		lastName: 'Andriamihaja',
		role: 'Team Manager',
		src: 'img/team/ricardo_andriamihaja',
		group: 'executive',
		bio: [
			"Ricardo Andriamihaja has been an invaluable member of Elevatus since 2016, serving as the most trustworthy and stable employee over the years. As a jack of all trades, Ricardo ensures that the logistics of the foundation run smoothly, often coordinating with sponsored children 'sur le terrain' and managing crucial aspects of program operations. He has overseen the construction and renovation of school buildings and, more recently, the Youth Center, demonstrating his ability to handle complex tasks and projects.",

			'Ricardo has a wealth of resources and a vast network of contacts, always knowing the right people to reach out to for support. He is known for his ever-present smile and sharp critical mind, never naïve and always realistic in his approach to challenges. When something needs to be done, Ricardo is the person to call.'
		]
	},
	{
		firstName: 'Istriah',
		lastName: 'Hefarison',
		role: 'Sewing/Math Teacher',
		src: 'img/team/istriah_hefarison',
		group: 'education',
		bio: [
			"Istriah is a valuable member of Elevatus, serving as a professional high-school teacher. She has been teaching physics and sewing classes to the children supported by Elevatus, ensuring that the students receive both academic and practical skills. In addition to her teaching responsibilities, Istriah also supervises the other teachers at Elevatus, helping to maintain a high standard of education across the foundation's programs."
		]
	},
	{
		firstName: 'Fitahiana',
		lastName: 'Albetini',
		role: 'English Teacher',
		src: 'img/team/fitahiana_albetini',
		group: 'education',
		bio: [
			'Fitahiana Albetini is a part-time English teacher at Elevatus, bringing his expertise and enthusiasm to help children improve their language skills. With a passion for education and empowering youth, he ensures that his students gain practical English communication abilities, opening doors to greater opportunities for their future.'
		]
	},
	{
		firstName: 'Onja',
		lastName: 'Rahanitriniavo',
		role: 'French Teacher',
		src: 'img/team/onja_rahanitriniavo',
		group: 'education',
		bio: [
			'Onja Rahanitriniavo serves as a part-time French teacher at Elevatus, dedicated to fostering linguistic and academic growth among the children. Her teaching approach emphasizes practical language use, helping students enhance their proficiency in French, a vital skill for educational and professional advancement in Madagascar.'
		]
	},
	{
		firstName: 'Solomanampy',
		lastName: 'Andriamihaja',
		role: 'Cook',
		src: 'img/team/solomanampy_andriamihaja',
		group: 'logistics',
		bio: [
			'Solomanampy Andriamihaja is one of the two talented cooks at Elevatus, working alongside his wife, Vero Razainasolo. Together, they prepare nutritious meals for the children and staff, ensuring everyone is well-fed and energized. With years of experience and a deep understanding of local cuisine, Solomanampy takes pride in contributing to the well-being of the foundation’s community.'
		]
	},
	{
		firstName: 'Vero',
		lastName: 'Razainasolo',
		role: 'Cook',
		src: 'img/team/vero_razainasolo',
		group: 'logistics',
		bio: [
			'Vero Razainasolo is a dedicated cook at Elevatus, sharing her role with her husband, Solomanampy Andriamihaja. The couple works tirelessly to provide healthy and delicious meals, helping to support the foundation’s mission of improving children’s lives. Vero’s warm personality and culinary expertise make her an invaluable part of the team.'
		]
	}
]

export default members
