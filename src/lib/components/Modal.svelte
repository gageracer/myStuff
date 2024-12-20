<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { MouseEventHandler } from 'svelte/elements'
	import { fly, blur } from 'svelte/transition'

	let {
		children,
		content,
		onClose
	}: {
		children: Snippet
		content: string
		onClose?: MouseEventHandler<HTMLButtonElement>
	} = $props()
</script>

<div class="modal-bg" transition:blur={{ amount: 10 }} role="alertdialog" aria-modal="true"></div>

<div class="modal" transition:fly={{ y: 300 }}>
	<div>
		{content}
	</div>
	{#if children}
		{@render children()}
	{:else}
		<button name="modal-close" onclick={onClose}>Close</button>
	{/if}
</div>

<style lang="postcss">
	.modal-bg {
		@apply fixed top-0 left-0 w-screen h-screen bg-black/50;
	}
	.modal {
		@apply absolute left-1/2 top-1/2 flex flex-col text-black bg-white p-[1em] translate-x-[-50%] translate-y-[-50%]
		overflow-auto max-w-lg w-10/12 rounded dark:bg-neutral-800 dark:text-neutral-300;
	}
</style>
