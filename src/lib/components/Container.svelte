<script lang="ts">
	import { getMyStuff } from '$lib/stores/store.svelte'
	import type { stuff } from '$lib/stores/types'
	import { fly } from 'svelte/transition'

	let { container = $bindable() }: { container: stuff } = $props()

	let interactColor = $state('#CADCE2')
	let remaining = $derived(container.items.filter((e) => !e[1]).length)
	let itemsCount = $derived(container.items.length)
	const mystuff = getMyStuff()
	$inspect('remaining is:', remaining)
	$inspect('stuff changed, ', container)
	// TODO: Add the color here, change the editCont function to add the new color if the user changes it or not

	function editHandle() {
		mystuff.editCont(container)
	}

	function details() {
		container.isSum = !container.isSum
		mystuff.updateStuff()
	}

	function theInteract() {
		container.interact = !container.interact
		mystuff.updateStuff()
	}

	function isRed(index: number) {
		if (container.interact) {
			container.items[index][1] = !container.items[index][1]
			mystuff.updateStuff()
			// !event.target.style.color ? event.target.style.color = "red" : event.target.style.color = "";
		}
	}
</script>

<div
	class={container.interact ? 'containersum containersum-on' : 'containersum containersum-off'}
	style="--container-color-off: {container.containerColor}; --container-color-on: {interactColor}"
>
	<button id="name" aria-pressed="false" onclick={details} class="title">
		{container.name}
	</button>
	<hr style="width: 90%; border-color: #e1e2e186;" />

	{#if !container.isSum}
		<div class="details" transition:fly={{ y: -10, duration: 200 }}>
			{#if remaining == itemsCount}
				<span>{container.type} | {itemsCount} Stuff here</span>
			{:else if remaining != 0}
				<span>{container.type} | {remaining} remaining of {itemsCount} Stuff</span>
			{:else}
				<span
					>{container.type} | {itemsCount === 1 ? '' : 'All'}
					{itemsCount} Stuff {itemsCount === 1 ? 'is' : 'are'} Done!</span
				>
			{/if}

			<ul class="item-list">
				{#each container.items as item, i}
					<li>
						<button onclick={() => isRed(i)} class={item[1] ? 'item-not-red' : 'item-red'}
							>{item[0]}
						</button>
					</li>
				{/each}
			</ul>
			<div class="options">
				<a href="/edit" class="edit-button" on:click={editHandle}> Edit</a>

				<button
					class={container.interact ? 'interactive-text-on' : 'interactive-text-off'}
					onclick={theInteract}
				>
					Interactive Mode
				</button>
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	.containersum {
		@apply shadow-container transition-colors mb-4 w-95 min-h-10 py-[2vh]
		flex items-center flex-col text-black text-container;
	}
	.containersum-on {
		@apply bg-[var(--container-color-on)];
	}
	.title {
		@apply border-none bg-inherit;
	}
	.containersum-off {
		@apply bg-[var(--container-color-off)];
	}
	.details {
		@apply flex flex-col items-center justify-center text-orange-500 pt-0 text-contdetails min-h-20 max-h-80;
	}
	.item-list {
		@apply text-left w-90 overflow-scroll;
		/* scrollbar-width: none; For Firefox */
	}
	.item-list::-webkit-scrollbar {
		width: 0px; /* For Chrome, Safari, and Opera */
	}
	.item-list > li {
		@apply transition-colors pl-4;
	}
	.edit-button {
		@apply block w-fit self-center float-right text-1 text-black no-underline
		bg-yellow-200 border box-border py-0.5 px-4 border-gray-300 rounded-sm border-solid;
	}
	.interactive-text-off {
		@apply text-gray-600 py-0.5 px-4 bg-inherit;
	}
	.interactive-text-on {
		@apply transition-colors text-orange-500 py-0.5 px-4;
	}
	.item-red {
		@apply text-contdetails text-black bg-inherit border-none;
	}
	.item-not-red {
		@apply line-through text-gray-600 border-none bg-inherit;
	}
	#name {
		@apply text-container w-full bg-transparent;
	}
	.options {
		@apply transition-colors flex flex-row justify-around w-full;
	}
</style>
