<script>
	import { getMyStuff } from '$lib/stores/store.svelte'
	const mystuff = getMyStuff()
</script>

<div
	class="w-screen headlink text-7xl fixed flex justify-center flew-row items-center z-3 p-0
bg-yellow-200 text-center h-[10vh] shadow-title top-0"
>
	<a class="" href="/">My_Stuff</a>
	<span class="b-0 text-xs opacity-65 mb-[-2em] ml-4 bottom-0">{mystuff.version}</span>
</div>
