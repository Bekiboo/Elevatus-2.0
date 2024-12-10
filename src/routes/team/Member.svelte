<script lang="ts">
	let { member } = $props()
</script>

<button
	class="flex items-center justify-between w-full max-w-xs gap-2 m-auto mb-4 sm:w-40 sm:flex-col"
>
	<div class="rounded-full outline outline-4 outline-yellow-400 group">
		<div class="relative m-1 bg-yellow-400 rounded-full w-36 h-36 bg-">
			<div class="absolute bottom-0 h-40 overflow-hidden rounded-bl-full rounded-br-full w-36">
				<img
					class="absolute bottom-0 object-cover duration-150 ease-in-out translate-y-1 border-transparent rounded-full group-hover:scale-110 group-hover:-translate-y-1 w-36 h-36"
					src={member.src}
					alt="Picture of {member.firstName} {member.lastName}"
				/>
			</div>
		</div>
	</div>
	<div class="flex flex-col items-center w-1/2">
		<h3 class="text-xl font-semibold leading-5 text-blue-900 uppercase">
			{member.firstName}<br />{member.lastName}
		</h3>
		<h4 class="font-thin text-blue-900 whitespace-nowrap">{member.role}</h4>
	</div>
</button>
