<script lang="ts">
	let { member, displayMemberModal } = $props()
</script>

<button
	onclick={displayMemberModal}
	class="flex items-center justify-between w-full gap-2 mb-4 sm:w-40 sm:flex-col"
>
	<div
		class="relative w-32 h-32 duration-150 ease-in-out rounded-full sm:w-36 sm:h-36 outline outline-4 outline-yellow-400 outline-offset-4 group hover:outline-offset-0 hover:outline-transparent"
	>
		<div
			class="absolute bottom-0 w-full h-40 overflow-hidden rounded-bl-full rounded-br-full sm:h-40 sm:w-full"
		>
			<img
				class="absolute bottom-0 object-cover w-32 h-32 duration-150 ease-in-out border-transparent rounded-full sm:w-36 sm:h-36"
				src={member.src + '_bg.png'}
				alt="Background of {member.firstName} {member.lastName}"
			/>
			<img
				class="absolute bottom-0 object-cover w-32 h-32 duration-150 ease-in-out border-transparent rounded-full group-hover:scale-110 group-hover:-translate-y-2 sm:w-36 sm:h-36"
				src={member.src + '.png'}
				alt="Picture of {member.firstName} {member.lastName}"
			/>
		</div>
	</div>
	<div class="flex flex-col items-center w-1/2">
		<div class="flex flex-col font-semibold text-blue-900 sm:text-xl">
			<div class="-mb-1">
				{member.firstName}
			</div>
			<div>
				{member.lastName}
			</div>
		</div>
		<h4 class="font-thin text-blue-900 whitespace-nowrap">{member.role}</h4>
	</div>
</button>
