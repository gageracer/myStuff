<script lang="ts">
	import Header from '$lib/components/Header.svelte'
	import { setMyStuff } from '$lib/stores/store.svelte'
	import { type Snippet } from 'svelte'
	import '../app.css'
	import { updated } from '$app/stores'
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit'
	import Modal from '$lib/components/Modal.svelte'

	injectSpeedInsights()
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
		<Modal content="Update is available">
			<div class="toast">
				<button class="reloadbtn" onclick={() => location.reload()}> reload the page </button>
			</div>
		</Modal>
	{/if}
</main>

<svelte:head>
	<title>My2Stuff</title>
	<meta name="theme-color" content="#fff59d" />
	<meta name="description" content="A simple app to track your stuff, made with svelte(5)kit(2)!" />
</svelte:head>

<style lang="postcss">
	.reloadbtn{
		@apply bg-lime-500;
	}
	main {
		/* overflow: scroll;
		width: 100vw;
		min-height: 100vh;
		margin-top: 10vh;
		font-size: calc(1rem 16px  + 2vmin);
		display: flex;
		align-items: center;
		padding-top: 1rem16px ;
		flex-direction: column;
		background-color: rgb(0 0 0 / 0.05);
		text-align: center; */

		@apply overflow-scroll w-screen min-h-screen mt-[10vh] 
		text-contdetails flex items-center pt-4 
		flex-col bg-black/5 text-center;
	}
	.toast {
		@apply left-0 bottom-0 w-full flex justify-center gap-4 z-10;
	}
	:global(input, button, select, textarea) {
		@apply text-inherit box-border border-solid border-2;
	}
	:global(button) {
		@apply outline-none;
	}
</style>
