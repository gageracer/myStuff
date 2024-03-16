<script lang="ts">
	import { getMyStuff } from '$lib/stores/store.svelte'
	import type { stuff } from '$lib/stores/types'
	import { fly } from 'svelte/transition'

	let { container }: { container: stuff } = $props()

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

<style>
	.containersum {
		transition: background-color 0.5s ease;
		margin-bottom: 1rem;
		width: 95vw;
		min-height: 10vh;
		height: auto;
		padding: 2vh 0 2vh 0;
		list-style-type: none;
		display: flex;
		align-items: center;
		flex-direction: column;
		font-size: calc(1rem + 4vmin);
		color: black;
		box-shadow:
			0 4px 20px 0 rgba(0, 0, 0, 0.2),
			0 6px 10px 0 rgba(0, 0, 0, 0.19);
	}
	.containersum-on {
		background-color: var(--container-color-on);
	}
	.title {
		border: none;
		background-color: inherit;
		transform: inherit;
	}
	.containersum-off {
		background-color: var(--container-color-off);
	}
	.details {
		font-size: calc(1rem + 2vmin);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 20vh;
		max-height: 80vh;
		/* border: 1px solid green; */
		/* transform: scale(1.5); */
		color: chocolate;
		padding-top: 0;
		/* font-size: calc(6px + 1vmin); */
	}
	.item-list {
		text-align: left;
		width: 90vw;
		overflow-x: hidden;
		overflow-y: scroll;
		scrollbar-width: none; /* For Firefox */
		-ms-overflow-style: none; /* For Internet Explorer and Edge */
	}
	.item-list::-webkit-scrollbar {
		width: 0px; /* For Chrome, Safari, and Opera */
	}
	.item-list > li {
		transition: color 1s;
	}
	.edit-button {
		display: block;
		width: fit-content;
		align-self: center;
		background-color: #fff59d;
		float: right;
		font-size: 1em;
		color: black;
		text-decoration: none;
		box-sizing: border-box;
		border: 1px solid #ccc;
		border-radius: 2px;
		padding: 2px 1rem;
	}
	/* .interactive-button{
        zoom: 2;
    } */
	.interactive-text-off {
		color: grey;
		padding: 2px 1rem;
		background-color: inherit;
	}
	.interactive-text-on {
		transition: color 1s;
		color: rgb(255, 111, 0);
		padding: 2px 1rem;
		background-color: inherit;
	}
	.item-red {
		font-size: calc(1rem + 2vmin);
		color: black;
		background-color: inherit;
		border: none;
	}
	.item-not-red {
		font-size: calc(1rem + 2vmin);
		text-decoration: line-through;
		color: rgba(90, 90, 90, 0.9);
		border: none;
		background-color: inherit;
	}
	#name {
		font-size: calc(1rem + 4vmin);
		height: 5vh;
		width: 100%;
	}
	.options {
		transition: color 1s;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 100%;
		color: black;
		font-size: (1em + 4vmin);
	}
</style>
