<script lang="ts">
	import Header from '$lib/components/Header.svelte'
	import { setMyStuff } from '$lib/stores/store.svelte'
	import { onMount, type Snippet } from 'svelte'
	import '../app.css'

	const mystuff = setMyStuff()
	let w = $state(0)
	let h = $state(0)
	let { children }: { children: Snippet } = $props()
	onMount(() => {
		mystuff.reLoad()
	})
</script>

<main bind:clientWidth={w} bind:clientHeight={h}>
	<Header />
	{@render children?.()}
</main>

<svelte:head>
	<title>My2Stuff</title>
	<meta name="theme-color" content="#fff59d" />
	<meta name="description" content="A simple app to track your stuff, made with Svelte!" />
</svelte:head>

<style>
	main {
		text-align: center;
		background-color: #f3f3f3;
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: calc(1rem + 2vmin);
		width: 100vw;
		margin-top: 12vh;
	}
	:global(html, body) {
		position: relative;
		width: 100%;
		height: 100%;
	}
	:global(body) {
		background-color: #f3f3f3;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		font-size: calc(1rem + 2vmin);
		margin: 0;
		box-sizing: border-box;
		font-family:
			Noto Sans,
			Roboto;
	}
	:global(label) {
		display: block;
	}
	:global(input, button, select, textarea) {
		font-family: inherit;
		font-size: inherit;

		box-sizing: border-box;
		border: 1px solid #ccc;
		border-radius: 2px;
	}
	:global(button) {
		outline: none;
	}
	:global(input:disabled) {
		color: #ccc;
	}
</style>
