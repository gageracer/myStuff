<script lang="ts">
	import ContainerSum from '$lib/components/ContainerSum.svelte'
	import NewButton from '$lib/components/NewButton.svelte'
	import { slide } from 'svelte/transition'

	let status = $state('')
	$inspect(status)
	// let { w, h } = $props<{ w: number; h: number }>();
	// let ratio = $derived((w / h).toFixed(2));
</script>

<!-- Page width:{w} height:{h} ratio: {ratio} -->
<!-- <div transition:slide|global={{ duration: 500 }} onoutroend={() => (status = 'outro ended')}> -->
	<!-- <svg width="100vw" height="20vh">
            <circle cx="50%" cy="50%" r="40" stroke="green" stroke-width="4" fill="yellow" />
            <text fill="#0f0f0f" font-size="40" font-family="Verdana" x="50%" y="50%">SVG</text>
        </svg> -->

	<ContainerSum />
	<NewButton button="newlist" />
	<NewButton button="sortReverse" />
	<!-- <NewButton button="settings" /> -->
<!-- </div> -->
