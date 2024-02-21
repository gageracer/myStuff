<script>
	import { getMyStuff } from '$lib/stores/store.svelte';
	const mystuff = getMyStuff();
</script>

<div id="main_link">
	<a class="headlink" href="/">My_Stuff</a>
	<span class="verspan">{mystuff.version}</span>
</div>

<style>
	#main_link {
		width: 100%;
		font-family: Noto Sans;
		font-size: 2em;
		position: fixed;
		display: flex;
		justify-content: center;
		flex-direction: row;
		align-items: center;
		z-index: 3;
		padding: 0;
		background-color: #fff59d;
		text-align: center;
		top: 0;
		height: 10vh;
		box-shadow:
			0 1px 2px 0 rgba(0, 0, 0, 0.2),
			0 6px 10px 0 rgba(0, 0, 0, 0.19);
	}
	.headlink {
		color: #212121;
		text-decoration: none;
	}
	.verspan {
		bottom: 0;
		font-size: 0.75rem;
		color: black;
		opacity: 66%;
		margin-bottom: -2em;
		margin-left: 1em;
	}
</style>
