<script lang="ts">
	import { unSaved } from '$lib/stores/store';
	import Create from '$lib/components/Create.svelte';
</script>

<svelte:component
	this={Create}
	name={$unSaved.name}
	type={$unSaved.type}
	items={$unSaved.items}
	editt={false}
/>
