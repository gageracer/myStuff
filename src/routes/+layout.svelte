<script lang="ts">
	import Header from '$lib/components/Header.svelte'
	import { setMyStuff } from '$lib/stores/store.svelte'
	import { type Snippet } from 'svelte'
	import '../app.css'

	const mystuff = setMyStuff()
	let w = $state(0)
	let h = $state(0)
	$inspect(w, h)
	let { children }: { children: Snippet } = $props()
</script>

<Header />
<main bind:clientWidth={w} bind:clientHeight={h}>
	{@render children?.()}
</main>

<svelte:head>
	<title>My2Stuff</title>
	<meta name="theme-color" content="#fff59d" />
	<meta name="description" content="A simple app to track your stuff, made with svelte(5)kit(2)!" />
</svelte:head>

<style lang="postcss">
	main {
		@apply overflow-scroll w-screen min-h-screen mt-[10vh] 
		text-contdetails flex items-center 
		flex-col bg-black/5 text-center;
	}
	/* :global(body) {
		@apply font-sans bg-black/5 flex h-screen flex-col items-center justify-start 
		text-contdetails m-0 box-border;
	} */
	/* :global(label) {
		@apply block;
	} */
	:global(input, button, select, textarea) {
		@apply text-inherit box-border border-solid border-2;
	}
	:global(button) {
		@apply outline-none;
	}
	/* :global(input:disabled) {
		@apply text-white/20;
	} */
</style>
