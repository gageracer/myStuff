/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'media', // or 'class' if you plan to toggle dark mode manually
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			boxShadow: {
				title: '0 1px 2px #0003,0 6px 10px #00000030',
				rev: '0 4px 8px #0003,0 6px 20px #00000030'
			},
			zIndex: {
				4: '4'
			}
		},
		fontFamily: {
			rev: ['Courier New', 'Courier', 'monospace']
		}
	},
	plugins: [],
	jit: true
}
