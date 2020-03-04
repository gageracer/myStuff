<script>
	import Header from './Header.svelte';
	import Container from './components/Container.svelte';
	import CurrentPage from './CurrentPage.svelte';
	import {reLoad} from './store.js';
	
	reLoad();
</script>

<style>
	main{
		
		text-align: center;
		background-color: #e1e2e1;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: calc(10px + 2vmin);
		width: 100vw;
		margin-top: 12vh;
	}
	
</style>

<main>
	<Header/>
	<CurrentPage/>
</main>


