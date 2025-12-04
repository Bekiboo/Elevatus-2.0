<script lang="ts">
	import Hero from '$lib/components/layout/Hero.svelte'
</script>

<Hero
	src="../img/hero/privacy_policies.jpg"
	alt="Privacy Policy"
	title="Privacy Policy"
	subtitle="How we protect and use your information"
/>

<div class="max-w-4xl mx-auto px-6 py-12 md:py-16">
	<p class="text-sm text-gray-600 mb-8">Last Updated: December 4, 2025</p>

	<div class="prose prose-lg max-w-none">
		<section class="mb-8">
			<h2 class="text-2xl font-bold mb-4">Introduction</h2>
			<p>
				Elevatus Foundation ("we," "our," or "us") is committed to protecting your privacy. This
				Privacy Policy explains how we collect, use, disclose, and safeguard your information when
				you visit our website and make donations.
			</p>
		</section>

		<section class="mb-8">
			<h2 class="text-2xl font-bold mb-4">Information We Collect</h2>
			<h3 class="text-xl font-semibold mb-3">Personal Information</h3>
			<p>When you make a donation or subscribe to our programs, we may collect:</p>
			<ul class="list-disc pl-6 mb-4">
				<li>Name and email address</li>
				<li>Billing information (processed securely through Stripe)</li>
				<li>Donation amount and frequency</li>
				<li>Communication preferences</li>
			</ul>

			<h3 class="text-xl font-semibold mb-3">Automatically Collected Information</h3>
			<p>We may automatically collect:</p>
			<ul class="list-disc pl-6 mb-4">
				<li>Browser type and version</li>
				<li>IP address and location data</li>
				<li>Pages visited and time spent on our site</li>
				<li>Referring website addresses</li>
			</ul>
		</section>

		<section class="mb-8">
			<h2 class="text-2xl font-bold mb-4">How We Use Your Information</h2>
			<p>We use the information we collect to:</p>
			<ul class="list-disc pl-6 mb-4">
				<li>Process donations and manage subscriptions</li>
				<li>Send donation receipts and tax documentation</li>
				<li>Communicate updates about our programs and impact</li>
				<li>Respond to your inquiries and provide customer support</li>
				<li>Improve our website and services</li>
				<li>Comply with legal obligations</li>
			</ul>
		</section>

		<section class="mb-8">
			<h2 class="text-2xl font-bold mb-4">Third-Party Services</h2>
			<p>We use trusted third-party service providers to support our operations:</p>
			<ul class="list-disc pl-6 mb-4">
				<li>
					<strong>Stripe:</strong> Payment processing. Stripe's privacy policy can be found at
					<a
						href="https://stripe.com/privacy"
						target="_blank"
						rel="noopener noreferrer"
						class="text-brand hover:underline">stripe.com/privacy</a
					>
				</li>
				<li>
					<strong>Resend:</strong> Email delivery service for subscription management and notifications
				</li>
				<li><strong>Vercel:</strong> Website hosting and analytics</li>
			</ul>
			<p>
				These service providers have access to your information only to perform specific tasks on
				our behalf and are obligated to protect your information.
			</p>
		</section>

		<section class="mb-8">
			<h2 class="text-2xl font-bold mb-4">Data Security</h2>
			<p>
				We implement appropriate technical and organizational security measures to protect your
				personal information. However, no method of transmission over the Internet is 100% secure,
				and we cannot guarantee absolute security.
			</p>
			<p class="mt-3">
				Payment information is handled securely by Stripe and is never stored on our servers. We use
				encryption for sensitive data transmission.
			</p>
		</section>

		<section class="mb-8">
			<h2 class="text-2xl font-bold mb-4">Your Rights</h2>
			<p>You have the right to:</p>
			<ul class="list-disc pl-6 mb-4">
				<li>Access the personal information we hold about you</li>
				<li>Request correction of inaccurate information</li>
				<li>Request deletion of your personal information</li>
				<li>Opt out of marketing communications</li>
				<li>Manage or cancel your subscription at any time</li>
			</ul>
			<p>
				To exercise these rights, please contact us at <a
					href="mailto:correspondence.elevatus@gmail.com"
					class="text-brand hover:underline">correspondence.elevatus@gmail.com</a
				>
			</p>
		</section>

		<section class="mb-8">
			<h2 class="text-2xl font-bold mb-4">Cookies and Tracking</h2>
			<p>
				We use cookies and similar tracking technologies to enhance your experience on our website.
				You can control cookies through your browser settings. Disabling cookies may limit certain
				features of our website.
			</p>
		</section>

		<section class="mb-8">
			<h2 class="text-2xl font-bold mb-4">International Data Transfers</h2>
			<p>
				Your information may be transferred to and processed in countries other than your country of
				residence. We ensure appropriate safeguards are in place to protect your information in
				accordance with this Privacy Policy.
			</p>
		</section>

		<section class="mb-8">
			<h2 class="text-2xl font-bold mb-4">Children's Privacy</h2>
			<p>
				Our services are not directed to individuals under the age of 18. We do not knowingly
				collect personal information from children. If you believe we have collected information
				from a child, please contact us immediately.
			</p>
		</section>

		<section class="mb-8">
			<h2 class="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
			<p>
				We may update this Privacy Policy from time to time. We will notify you of any changes by
				posting the new Privacy Policy on this page and updating the "Last Updated" date.
			</p>
		</section>

		<section class="mb-8">
			<h2 class="text-2xl font-bold mb-4">Contact Us</h2>
			<p>If you have questions about this Privacy Policy, please contact us:</p>
			<div class="mt-4 pl-6">
				<p><strong>Elevatus Foundation</strong></p>
				<p>
					Email: <a
						href="mailto:correspondence.elevatus@gmail.com"
						class="text-brand hover:underline">correspondence.elevatus@gmail.com</a
					>
				</p>
			</div>
		</section>
	</div>
</div>
