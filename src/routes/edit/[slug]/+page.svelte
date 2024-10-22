<script lang="ts">
	import { getMyStuff } from '$lib/stores/store.svelte'
	import Create from '$lib/components/Create.svelte'
	let { data } = $props()
	const mystuff = getMyStuff()

	$effect(() => {
		if (mystuff.stuff.length) {
			mystuff.editCont(data.id)
		}
	})
</script>

<Create bind:tmpCont={mystuff.tmpCont} editt={true} />
