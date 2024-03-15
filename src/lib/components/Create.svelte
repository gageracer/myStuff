<script lang="ts">
	import { getMyStuff } from '$lib/stores/store.svelte'
	import Modal from './Modal.svelte'
	import type { stuff } from '$lib/stores/types'
	import { slide } from 'svelte/transition'
	import { goto } from '$app/navigation'

	let {
		tmpCont,
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

	function handleSubmit() {
		if (tmpCont.name && tmpCont.type && tmpCont.items) {
			// items = items.filter(Boolean);
			if (tmpCont.items[tmpCont.items.length - 1][0] === '')
				tmpCont.items.splice(tmpCont.items.length - 1, 1)
			tmpCont.items[tmpCont.items.length - 1][1] = false

			mystuff.addContainer(tmpCont)

			console.log('edit is: ', editt)
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
	<label>
		<input
			type="text"
			name="name"
			bind:value={tmpCont.name}
			autocomplete="off"
			maxlength="28"
			placeholder="The Container Name"
			required
		/>
		<input
			type="text"
			name="type"
			bind:value={tmpCont.type}
			autocomplete="off"
			maxlength="32"
			placeholder="The Container Type"
			required
		/>

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
					on:click={() => (delModal = true)}>Delete</button
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
			<button onclick={deleteSubmit} style="background-color: red;">Yes</button>
			<button onclick={() => (delModal = false)}>No</button>
		</div>
	</Modal>
{/if}

<style>
	.create-new {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 90vw;
		font-size: 1em;
	}

	label {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	label > * {
		text-align: center;
		margin-top: 0.5em;
		width: 90vw;
		border-radius: 3%;
		background-color: #f5f5f6;
	}
	label > input {
		font-size: 1.3em;
		height: 2em;
		box-shadow:
			0 2px 4px 0 rgba(0, 0, 0, 0.2),
			0 6px 10px 0 rgba(0, 0, 0, 0.19);
	}

	.itemslist {
		display: flex;
		flex-direction: row;
		width: 90vw;
	}

	.itemslist > input {
		width: 90%;
		text-align: center;
		background-color: #f5f5f6;
		font-size: 1.3em;
		height: 2em;
		box-shadow:
			0 2px 4px 0 rgba(0, 0, 0, 0.2),
			0 6px 10px 0 rgba(0, 0, 0, 0.19);
	}

	.itemslist > div {
		width: 90%;
	}
	.itemslist > button {
		width: 10vw;
		display: flex;
		font-size: 1em;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #fff59d;
		box-shadow:
			0 2px 4px 0 rgba(0, 0, 0, 0.2),
			0 6px 10px 0 rgba(0, 0, 0, 0.19);
	}
	.buttons {
		display: flex;
		flex-direction: row;
		box-shadow:
			0 2px 4px 0 rgba(0, 0, 0, 0.2),
			0 6px 10px 0 rgba(0, 0, 0, 0.19);
	}
	.buttons > button {
		width: 100%;
		background-color: #fff59d;
		font-size: 2em;
	}
	.row-buttons {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.row-buttons > button {
		width: 90vw;
	}
	.cross {
		background: black;
		height: 1.5em;
		position: relative;
		width: 0.075em;
		left: 0;
	}

	.cross:after {
		background: black;
		content: '';
		height: 0.075em;
		left: -0.7em;
		position: absolute;
		top: 0.7em;
		width: 1.5em;
	}

	.minus {
		background: black;
		height: 0.075em;
		position: relative;
		width: 1.5em;
	}
</style>
