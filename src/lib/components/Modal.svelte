<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fly, blur } from 'svelte/transition';
	const dispatch = createEventDispatcher();

	export let content: HTMLElement | string;
</script>

<div class="modal-bg" transition:blur={{ amount: 10 }} on:click={() => dispatch('cancel')}></div>

<div class="modal" transition:fly={{ y: 300 }}>
	{content}
	<slot>
		<button name="modal-close" on:click={() => dispatch('close')}>Close</button>
	</slot>
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
