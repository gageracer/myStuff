<script lang="ts">
	import { getMyStuff } from '$lib/stores/store.svelte';
	import Create from '$lib/components/Create.svelte';

	const mystuff = getMyStuff();
</script>

<Create
	tmpCont={mystuff.tmpCont}
	editt={true}
/>
