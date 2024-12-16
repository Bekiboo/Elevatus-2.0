/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
			maxsm: { raw: '(max-width: 639px)' },
			maxmd: { raw: '(max-width: 767px)' },
			maxlg: { raw: '(max-width: 1023px)' },
			maxxl: { raw: '(max-width: 1279px)' },
			max2xl: { raw: '(max-width: 1535px)' }
		}
	},
	plugins: []
}
