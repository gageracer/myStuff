<script>
	import Header from './Header.svelte';
	import Container from './components/Container.svelte';
	import CurrentPage from './CurrentPage.svelte';
	import {reLoad} from './store.js';
	
	reLoad();
	let w,h;

	$: console.log("main w and h: " ,w ," ", h);
</script>

<style>
	main{
		
		text-align: center;
		background-color: #e1e2e1;
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: calc(10px + 2vmin);
		width: 100vw;
		margin-top: 12vh;
	}
	
</style>

<main bind:clientWidth={w} bind:clientHeight={h}>
	<Header/>
	<CurrentPage
	w={w}
	h={h}/>
</main>


