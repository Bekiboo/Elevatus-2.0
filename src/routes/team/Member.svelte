<script lang="ts">
	let { member, displayMemberModal } = $props()
</script>

<button
	onclick={() => displayMemberModal()}
	class="flex items-center justify-between w-full gap-2 mb-4 sm:w-40 sm:flex-col"
>
	{#if member.bgSrc}
		<div class="rounded-full group">
			<div class="relative w-32 h-32 rounded-full sm:w-36 sm:h-36">
				<img
					class="absolute bottom-0 object-cover w-32 h-32 duration-150 ease-in-out translate-y-1 border-transparent rounded-full sm:w-36 sm:h-36"
					src={member.bgSrc}
					alt="Picture of {member.firstName} {member.lastName}"
				/>
				<div
					class="absolute bottom-0 w-32 h-32 overflow-hidden rounded-bl-full rounded-br-full sm:h-40 sm:w-36"
				>
					<img
						class="absolute bottom-0 object-cover w-32 h-32 duration-150 ease-in-out translate-y-1 border-transparent rounded-full group-hover:scale-105 group-hover:-translate-y-0.5 sm:w-36 sm:h-36"
						src={member.src}
						alt="Picture of {member.firstName} {member.lastName}"
					/>
				</div>
			</div>
		</div>
	{:else}
		<div class="rounded-full outline outline-4 outline-yellow-400 group">
			<div class="relative w-32 h-32 m-1 bg-yellow-400 rounded-full sm:w-36 sm:h-36">
				<div
					class="absolute bottom-0 w-32 h-32 overflow-hidden rounded-bl-full rounded-br-full sm:h-40 sm:w-36"
				>
					<img
						class="absolute bottom-0 object-cover w-32 h-32 duration-150 ease-in-out translate-y-1 border-transparent rounded-full group-hover:scale-110 group-hover:-translate-y-1 sm:w-36 sm:h-36"
						src={member.src}
						alt="Picture of {member.firstName} {member.lastName}"
					/>
				</div>
			</div>
		</div>
	{/if}
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
