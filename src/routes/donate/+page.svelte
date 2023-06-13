<!-- Donate.svelte -->
<script>
	let donationAmount = 0;

	function handleDonate() {
		// Logic to process the donation goes here
		// You can use the donationAmount variable to access the selected amount
		// and send it to your backend for further processing
		console.log('Donation amount:', donationAmount);
	}
</script>

<main>
	<h1>Donate</h1>

	<p>Select an amount to donate:</p>
	<div>
		<label>
			<input type="radio" bind:group={donationAmount} value="10" />
			$10
		</label>
	</div>
	<div>
		<label>
			<input type="radio" bind:group={donationAmount} value="20" />
			$20
		</label>
	</div>
	<div>
		<label>
			<input type="radio" bind:group={donationAmount} value="50" />
			$50
		</label>
	</div>

	<button on:click={handleDonate}>Donate</button>
</main>

<style>
	main {
		max-width: 400px;
		margin: 0 auto;
		padding: 20px;
		font-family: Arial, sans-serif;
	}

	h1 {
		text-align: center;
	}

	div {
		margin-bottom: 10px;
	}

	button {
		display: block;
		margin: 20px auto;
		padding: 10px 20px;
		font-size: 16px;
	}
</style>
