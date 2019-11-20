<script>
	import Header from './Header.svelte';
	import Container from './components/Container.svelte';
	import CurrentPage from './CurrentPage.svelte';
	
	import {reLoad} from './store.js';
	
	
	reLoad();
</script>

<style>
	main{
		
		border: 2px ridge red;
		text-align: center;
		background-color: #282c34;
		min-height: 60vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		font-size: calc(10px + 2vmin);
		width: 90%;
		margin-top: calc(5% + 6rem);;
	}
</style>

<main>
	<Header/>
	<CurrentPage/>
	
</main>


