<script lang="ts">
	import type { Snippet } from 'svelte'
	import type { MouseEventHandler } from 'svelte/elements'
	import { fly, blur } from 'svelte/transition'

	let {
		children,
		content,
		onClose,
		onCancel
	}: {
		children: Snippet
		content: string
		onClose: MouseEventHandler<HTMLButtonElement>
		onCancel: MouseEventHandler<HTMLButtonElement>
	} = $props()
</script>

<div class="modal-bg" transition:blur={{ amount: 10 }} onclick={onCancel}></div>

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

<style type="text/css">
	.modal-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.75);
	}
	.modal {
		position: absolute;
		left: 50%;
		top: 50%;
		width: calc(90vw - 4em);
		max-width: 32em;
		overflow: auto;
		transform: translate(-50%, -50%);
		padding: 1em;
		border-radius: 0.2em;
		background: white;
		color: black;
		display: flex;
		flex-direction: column;
	}
</style>
