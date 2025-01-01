<script lang="ts">
	import { getMyStuff } from '$lib/stores/store.svelte'
	import type { stuff } from '$lib/stores/types'
	import { fly } from 'svelte/transition'

	let { container = $bindable(), id }: { container: stuff; id: number } = $props()

	let interactColor = $state('#CADCE2')
	let remaining = $derived(container.items.filter((e) => !e[1]).length)
	let itemsCount = $derived(container.items.length)
	const mystuff = getMyStuff()
	// TODO: Add the color here, change the editCont function to add the new color if the user changes it or not

	async function details() {
		container.isSum = !container.isSum
		await mystuff.updateStuff()
	}

	async function theInteract() {
		container.interact = !container.interact
		await mystuff.updateStuff()
	}

	async function isRed(index: number) {
		if (container.interact) {
			container.items[index][1] = !container.items[index][1]
			await mystuff.updateStuff()
			// !event.target.style.color ? event.target.style.color = "red" : event.target.style.color = "";
		}
	}
</script>

<div
	class={container.interact ? 'containersum containersum-on' : 'containersum containersum-off'}
	style="--container-color-off: {container.containerColor ??
		``}; --container-color-on: {interactColor}"
>
	<button id="name" aria-pressed="false" onclick={details} class="title">
		{container.name}
	</button>
	<hr class:hr-interact={container.interact} />

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
						<button
							onclick={() => isRed(i)}
							class={item[1] ? 'item-not-red' : 'item-red'}
							class:item-interact={container.interact}
							>{item[0]}
						</button>
					</li>
				{/each}
			</ul>
			<div class="options">
				<a
					href="/edit/{id}"
					aria-label="Goes to the edit page for this container"
					class="edit-button"
					class:edit-on={container.interact}
				>
					Edit</a
				>

				<button
					class={container.interact ? 'interactive-text-on' : 'interactive-text-off'}
					onclick={theInteract}
				>
					{#if container.interact}
					Lock
					{:else}
					Unlock
					{/if}
				</button>
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	.containersum {
		@apply shadow-container dark:shadow-neutral-700/50 dark:text-neutral-300 transition-colors
		mb-4 w-95 min-h-10 py-[2vh] flex items-center flex-col
		text-black text-container;
	}
	.containersum-on {
		@apply bg-[var(--container-color-on)] dark:text-black dark:bg-yellow-200 dark:shadow-yellow-300/20;
	}
	hr {
		@apply w-[90%];
	}
	.hr-interact {
		@apply w-[90%] dark:border-black;
	}
	.containersum-off {
		@apply bg-[var(--container-color-off)] dark:bg-neutral-700/30;
	}
	.title {
		@apply border-none bg-inherit;
	}
	.details {
		@apply flex flex-col items-center justify-center
		text-orange-500 pt-0 text-contdetails min-h-20 max-h-80;
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
		bg-yellow-200 border box-border py-0.5 px-4 border-gray-300 rounded-sm border-solid dark:border-yellow-200;
	}
	.edit-on {
		@apply dark:border-yellow-400 dark:bg-yellow-400;
	}
	.interactive-text-off {
		@apply text-gray-600 dark:text-gray-400 py-0.5 px-4 bg-inherit dark:border-yellow-200;
	}
	.interactive-text-on {
		@apply transition-colors text-orange-500 dark:text-orange-500 dark:border-orange-500 py-0.5 px-4;
	}
	.item-red {
		@apply text-contdetails text-black dark:text-neutral-300 bg-inherit border-none;
	}
	.item-not-red {
		@apply line-through text-gray-600 dark:text-neutral-300 border-none bg-inherit;
	}
	.item-interact {
		@apply dark:text-black;
	}
	#name {
		@apply text-container w-full bg-transparent;
	}
	.options {
		@apply transition-colors flex flex-row justify-around w-full;
	}
</style>
