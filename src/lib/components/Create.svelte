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
	const mystuff = getMyStuff()
	$effect(() => {
		editt ? mystuff.tmpContLS() : mystuff.unSavedtLS()
		$inspect(editt ? 'tmp changed:' : 'unsaved changed:', tmpCont)
	})
	$inspect(editt ? 'tmp loaded' : 'unsaved loaded', tmpCont)
	async function handleSubmit() {
		const length = tmpCont.items.length - 1
		if (tmpCont.name && tmpCont.type && tmpCont.items) {
			// items = items.filter(Boolean);
			if (tmpCont.items[length][0] === '') tmpCont.items.splice(length, 1)
			if (tmpCont.items[length][1] === undefined) {
				tmpCont.items[length][1] = false
			}

			await mystuff.addContainer(tmpCont)

			goto('/', { replaceState: true })
		}
	}

	async function deleteSubmit() {
		if (tmpCont?.id) {
			await mystuff.deleteContainer(tmpCont.id)
			goto('/', { replaceState: true })
		} else {
			console.error('tmpCont or tmCont.id is undefined')
		}
	}
	function formSubmit(e: SubmitEvent) {
		e.preventDefault()
	}

	function newItem() {
		const length = tmpCont.items.length - 1
		if (tmpCont.items[length][0] !== '') {
			tmpCont.items.push(['', false])
		}
	}

	function remItem(index: number) {
		tmpCont.items = tmpCont.items.filter((_, idx) => {
			return idx !== index
		})
	}
</script>

<form class="create-new" transition:slide={{ duration: 500 }} onsubmit={formSubmit}>
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
					<button aria-label="removebtn" name="rem-item" onclick={() => remItem(i)}>
						<div class="minus"></div>
					</button>
				{/if}
				<button aria-label="addbtn" name="add-item" onclick={() => newItem()}>
					<div class="cross"></div>
				</button>
			</div>
		{/each}
		<div class="buttons" transition:slide>
			{#if editt}
				<button class="delete-btn" name="delete-container" onclick={() => (delModal = true)}
					>Delete</button
				>
			{/if}
			<button name="save-container" class="save-btn" onclick={handleSubmit}>Save</button>
		</div>
	</label>
</form>
{#if delModal}
	<Modal content="Are you sure you wanna delete this container?" onClose={() => (delModal = false)}>
		<br />
		<div class="row-buttons">
			<button onclick={deleteSubmit} class="bg-red-600">Yes</button>
			<button onclick={() => (delModal = false)}>No</button>
		</div>
	</Modal>
{/if}

<style lang="postcss">
	.create-new {
		@apply flex-1 flex-col justify-center;
	}

	label {
		@apply flex flex-col justify-center;
	}

	label > * {
		@apply text-center mt-[0.5em] shadow-input w-90 rounded-[3%]
		bg-slate-100 dark:bg-neutral-700/50;
	}
	input {
		@apply h-[2em] text-formSize dark:text-neutral-300;
	}

	.itemslist {
		@apply flex flex-row;
	}

	.itemslist > input {
		@apply bg-slate-100 w-70min text-center grow dark:bg-neutral-700/50 dark:text-neutral-300;
	}

	.itemslist > div {
		/* @apply w-90; */
	}
	.itemslist > button {
		@apply w-[10vw] bg-yellow-200 flex flex-col justify-center items-center;
	}
	.buttons {
		@apply flex flex-row;
	}
	.save-btn {
		@apply dark:text-neutral-700 bg-yellow-200;
	}
	.buttons > button {
		@apply w-screen text-2;
	}
	.delete-btn {
		@apply text-red-500 dark:text-red-500  dark:bg-neutral-700/5;
	}
	.row-buttons {
		@apply flex;
	}
	.row-buttons > button {
		@apply w-90;
	}
</style>
