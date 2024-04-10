<script lang="ts">
	import Header from '$lib/components/Header.svelte'
	import { setMyStuff } from '$lib/stores/store.svelte'
	import { type Snippet } from 'svelte'
	import '../app.css'
	import { updated } from '$app/stores'

	const mystuff = setMyStuff()
	let w = $state(0)
	let h = $state(0)
	$inspect(w, h)
	let { children }: { children: Snippet } = $props()
</script>

<Header />
<main bind:clientWidth={w} bind:clientHeight={h}>
	{@render children?.()}

	{#if $updated}
		<div class="toast">
			<p>
				A new version of the app is available

				<button on:click={() => location.reload()}> reload the page </button>
			</p>
		</div>
	{/if}
</main>

<svelte:head>
	<title>My2Stuff</title>
	<meta name="theme-color" content="#fff59d" />
	<meta name="description" content="A simple app to track your stuff, made with svelte(5)kit(2)!" />
</svelte:head>

<style lang="postcss">
	main {
		@apply overflow-scroll w-screen min-h-screen mt-[10vh] 
		text-contdetails flex items-center pt-4 
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
	.toast {
		@apply fixed left-0 bottom-0 w-full flex justify-center gap-4 z-10;
	}
	.toast p {
		@apply flex items-center gap-4 bg-slate-500 py-2 px-4 rounded-md;
	}
</style>
