<script lang="ts">
	import { page } from '$app/state'
	import { getMyStuff } from '$lib/stores/store.svelte'

	type buttonType = 'settings' | 'sortReverse' | 'newlist'
	let { button }: { button: buttonType } = $props()

	const mystuff = getMyStuff()
</script>

{#snippet settings(url: string)}
	{#if url === '/'}
		<a class="sort" href="/setting" aria-label="Go Settings"> ⚙️ </a>
	{:else if url !== '/'}
		<a class="sort" href="/" aria-label="Go Back"> 🔙 </a>
	{/if}
{/snippet}

{#if button === 'newlist'}
	<a class="newButton" href="/new" aria-label="Create Container">
		<div class="plus" aria-hidden="true"></div>
	</a>
{:else if button === 'sortReverse'}
	<button class="sort" onclick={async () => await mystuff.sortChange()}>
		<div>Sort</div>
	</button>
{:else if button === 'settings'}
	{@render settings(page.url.pathname)}
{/if}

<style lang="postcss">
	.newButton {
		@apply fixed w-[2em] h-[2em] rounded-full bottom-4 right-0 inset-x-[50%] -translate-x-1/2 no-underline bg-yellow-300 shadow-rev
		overflow-hidden flex justify-center items-center;
	}
	.plus {
		@apply bg-slate-700 h-[1.5em] w-1 relative before:absolute before:bg-slate-700 before:w-[1.5em] before:h-1 before:left-1/2 before:-translate-x-1/2 before:top-1/2 before:-translate-y-1/2;
	}
	.sort {
		@apply fixed w-12 h-12 text-base rounded-full top-5d -translate-y-1/2 font-rev text-black no-underline shadow-rev hover:shadow-lg bg-green-300 z-4 left-[5dvw];
	}
</style>
