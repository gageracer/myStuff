<script lang="ts">
	import { getMyStuff } from '$lib/stores/store.svelte';
	import Create from '$lib/components/Create.svelte';

	const mystuff = getMyStuff();
</script>

<svelte:component
	this={Create}
	id={mystuff.unSaved.id}
	name={mystuff.unSaved.name}
	type={mystuff.unSaved.type}
	items={mystuff.unSaved.items}
	editt={false}
/>
