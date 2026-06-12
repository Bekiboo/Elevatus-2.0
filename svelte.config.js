import adapter from '@sveltejs/adapter-vercel'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Explicit Vercel adapter (instead of adapter-auto) so the exact
		// production build path also runs locally — no deploy-only surprises.
		adapter: adapter()
	}
}

export default config
