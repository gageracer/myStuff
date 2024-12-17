<script>
	import { getMyStuff } from '$lib/stores/store.svelte'
	import NewButton from './NewButton.svelte'

	const mystuff = getMyStuff()
</script>

<div class="header">
	<a href="/" aria-label="Goes to the main page">My_Stuff</a>
	<span class="version">{mystuff.version}</span>
	<!-- <NewButton button="settings" /> -->
</div>

<style lang="postcss">
	.header {
		@apply w-screen text-[2em] fixed flex justify-center flex-row
		items-center z-[3] p-0 bg-yellow-200 text-center h-[10vh] shadow-title top-0;
	}
	.version {
		@apply text-xs opacity-65 mb-[-2em] ml-4 bottom-0;
	}
</style>
