<!-- Contact.svelte -->
<main>
	<h1>Contact Us</h1>

	<form>
		<div>
			<label for="name">Name:</label>
			<input type="text" id="name" name="name" required />
		</div>

		<div>
			<label for="email">Email:</label>
			<input type="email" id="email" name="email" required />
		</div>

		<div>
			<label for="message">Message:</label>
			<textarea id="message" name="message" required />
		</div>

		<button type="submit">Submit</button>
	</form>
</main>

<style>
	main {
		max-width: 600px;
		margin: 0 auto;
		padding: 20px;
		font-family: Arial, sans-serif;
	}

	h1 {
		text-align: center;
	}

	form {
		margin-top: 20px;
	}

	div {
		margin-bottom: 20px;
	}

	label {
		display: block;
		font-weight: bold;
		margin-bottom: 5px;
	}

	input,
	textarea {
		width: 100%;
		padding: 10px;
		font-size: 16px;
	}

	button {
		display: block;
		margin-top: 10px;
		padding: 10px 20px;
		font-size: 16px;
	}
</style>
