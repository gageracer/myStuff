<script lang="ts">
	import { mypage, tmpCont } from '$lib/stores/store';
	import Create from '$lib/components/Create.svelte';

	$inspect('Current page is: ' + $mypage);
</script>

<svelte:component
	this={Create}
	name={$tmpCont.name}
	type={$tmpCont.type}
	items={$tmpCont.items}
	id={$tmpCont.id}
	editt={true}
/>
