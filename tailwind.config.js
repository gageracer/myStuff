/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'media', // or 'class' if you plan to toggle dark mode manually
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			boxShadow: {
				container: '0 4px 20px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);',
				title: '0 1px 2px #0003,0 6px 10px #00000030',
				rev: '0 4px 8px #0003,0 6px 20px #00000030',
				input: '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19)'
			},
			zIndex: {
				4: '4'
			},
			fontSize: {
				1: '1em',
				2: '2em',
				1.5: '1.5em',
				formSize: '1.3em',
				container: 'calc(1rem + 4vmin)',
				options: 'calc(1em + 4vmin)',
				contdetails: 'calc(1rem + 2vmin)'
			},
			width: {
				90: '90vw',
				80: '80vw',
				95: '95vw',
				'70min': '70vmin'
			},
			height: {
				10: '10vh',
				80: '80vh',
				'80min': '80vmin'
			},
			minHeight: {
				10: '10vh',
				20: '20vh'
			},
			maxHeight: {
				80: '80vh'
			},
			fontFamily: {
				rev: ['Courier New', 'Courier', 'monospace']
			}
		},
	},
	plugins: [],
	jit: true
}
