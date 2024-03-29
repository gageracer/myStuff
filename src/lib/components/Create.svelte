<script lang="ts">
	import { getMyStuff } from '$lib/stores/store.svelte'
	import Modal from './Modal.svelte'
	import type { stuff } from '$lib/stores/types'
	import { slide } from 'svelte/transition'
	import { goto } from '$app/navigation'

	let {
		tmpCont = $bindable(),
		editt = false
	}: {
		tmpCont: stuff
		editt: boolean
	} = $props()

	let delModal = $state(false)
	let inputMsg = $derived(
		tmpCont.items.length > 1 ? 'And another one' : 'Start adding items to your container!'
	)
	$inspect('tmp changed:', tmpCont)
	const mystuff = getMyStuff()
	$effect(() => {
		editt ? mystuff.tmpContLS() : mystuff.unSavedtLS()
	})
	$inspect(editt ? 'tmp loaded' : 'unsaved loaded', tmpCont)
	function handleSubmit() {
		if (tmpCont.name && tmpCont.type && tmpCont.items) {
			// items = items.filter(Boolean);
			if (tmpCont.items[tmpCont.items.length - 1][0] === '')
				tmpCont.items.splice(tmpCont.items.length - 1, 1)
			tmpCont.items[tmpCont.items.length - 1][1] = false

			mystuff.addContainer(tmpCont)

			goto('/', { replaceState: true })
		}
	}

	function deleteSubmit() {
		mystuff.deleteContainer(tmpCont.id)
		goto('/', { replaceState: true })
	}
	// TODO:This whole thing should be a form and items should be object or something strict

	// $inspect('the last item is::::::::::::::::::::::', items.slice(-1)[1])

	function newItem(itm: string) {
		if (tmpCont.items[tmpCont.items.length - 1][0] !== '') {
			tmpCont.items[tmpCont.items.length - 1] = [itm, false]
			tmpCont.items = [...tmpCont.items, ['', false]]
		}
	}

	function remItem(index: number) {
		tmpCont.items = tmpCont.items.filter((_, idx) => {
			return idx !== index
		})
	}
</script>

<div class="create-new" transition:slide={{ duration: 500 }}>
	<label for="name">
		<input
			type="text"
			name="name"
			bind:value={tmpCont.name}
			autocomplete="off"
			maxlength="28"
			placeholder="The Container Name"
			required
		/>
	</label>
	<label for="type">
		<input
			type="text"
			name="type"
			bind:value={tmpCont.type}
			autocomplete="off"
			maxlength="32"
			placeholder="The Container Type"
			required
		/>
	</label>

	<label for="items">
		{#each tmpCont.items as item, i (i)}
			<div class="itemslist" transition:slide|local>
				<input
					type="text"
					name="tmpitems"
					autocomplete="off"
					maxlength="48"
					placeholder={inputMsg}
					bind:value={tmpCont.items[i][0]}
					required
				/>
				{#if i != 0}
					<button name="rem-item" onclick={() => remItem(i)}>
						<div class="minus"></div>
					</button>
				{/if}
				<button name="add-item" onclick={() => newItem(item[0])}>
					<div class="cross"></div>
				</button>
			</div>
		{/each}
		<div class="buttons" transition:slide>
			{#if editt}
				<button
					name="delete-container"
					style="color: red;background-color: #f5f5f6;"
					onclick={() => (delModal = true)}>Delete</button
				>
			{/if}
			<button name="save-container" onclick={handleSubmit}>Save</button>
		</div>
	</label>
</div>
{#if delModal}
	<Modal
		content="Are you sure you wanna delete this container?"
		onCancel={() => (delModal = false)}
		onClose={() => (delModal = false)}
	>
		<br />
		<div class="row-buttons">
			<button onclick={deleteSubmit} class="bg-red-600">Yes</button>
			<button onclick={() => (delModal = false)}>No</button>
		</div>
	</Modal>
{/if}

<style>
	.create-new {
		@apply flex flex-col justify-center w-90;
	}

	label {
		@apply flex flex-col justify-center;
	}

	label > * {
		@apply text-center mt-[0.5em] shadow-input w-90 rounded-[3%] bg-slate-100;
	}
	input {
		@apply h-[2em] text-formSize;
	}

	.itemslist {
		@apply flex flex-row;
	}

	.itemslist > input {
		@apply bg-slate-100 w-70min text-center grow;
	}

	.itemslist > div {
		@apply w-90;
	}
	.itemslist > button {
		@apply w-[10vw] bg-yellow-200 flex flex-col justify-center items-center;
	}
	.buttons {
		@apply flex flex-row;
	}
	.buttons > button {
		@apply bg-yellow-200 w-full text-2;
	}
	.row-buttons {
		@apply flex;
	}
	.row-buttons > button {
		@apply w-90;
	}
</style>
