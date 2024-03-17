<script lang="ts">
	import { getMyStuff } from '$lib/stores/store.svelte'

	let { button }: { button: string } = $props()
	const mystuff = getMyStuff()
</script>

{#if button === 'newlist'}
	<a
		class="absolute w-24 h-24 rounded-full bottom-12 inset-x-[50%] -translate-x-1/2 no-underline bg-yellow-300 shadow-rev
		overflow-hidden flex justify-center items-center"
		href="/new"
		aria-label="Create Container"
	>
		<div
			class="bg-slate-700 h-12 w-1 relative before:absolute before:bg-slate-700 before:w-12 before:h-1 before:left-1/2 before:-translate-x-1/2 before:top-1/2 before:-translate-y-1/2"
			aria-hidden="true"
		></div>
	</a>
{:else if button === 'sortReverse'}
	<button class="fixed w-12 h-12 text-base rounded-full top-[5dvh] -translate-y-1/2 font-rev text-black no-underline shadow-rev hover:shadow-lg bg-green-300 z-4 left-[5dvw]" onclick={() => mystuff.sortChange()}>
		<div>Sort</div>
	</button>
{/if}

<style>
	#sort-reverse {
		position: fixed;
		width: 3rem;
		height: 3rem;
		font-size: 1rem;

		-webkit-border-radius: 50%;
		-khtml-border-radius: 50%;
		-moz-border-radius: 50%;

		top: 1dvh;
		right: 82vw;
		color: black;
		text-decoration: none;
		font-family: 'Courier New', Courier, monospace;
		background-color: #8de29f;
		box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);
		overflow: hidden;

		justify-content: center;
		align-items: center;
		border-radius: 50%;
		text-align: center;
		display: flex;
		z-index: 4;
	}
</style>
