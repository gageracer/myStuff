<script lang="ts">
	import { getMyStuff } from '$lib/stores/store.svelte';
	import Create from '$lib/components/Create.svelte';

	const mystuff = getMyStuff();
</script>

<svelte:component
	this={Create}
	name={mystuff.tmpCont.name}
	type={mystuff.tmpCont.type}
	items={mystuff.tmpCont.items}
	id={mystuff.tmpCont.id}
	editt={true}
/>
