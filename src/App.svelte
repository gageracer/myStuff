<script lang="ts">
	import Header from './Header.svelte';
	// import Container from './components/Container.svelte';
	import CurrentPage from './CurrentPage.svelte';
	import {reLoad} from './store';
	//import {carrotTypes, getMaxValue} from './stores/stateHelpers';
	reLoad();
	let w:number,h:number;

	// const testTypes = [{ kg: 1, price: 20 }, { kg: 3, price: 40 }, { kg: 2, price: 60 }, { kg: 5, price: 80 }, { kg: 4, price: 50 }]

	// getMaxValue(carrotTypes,36);
	// getMaxValue(testTypes, 35);
	$: console.log("main w and h: " ,w ," ", h);
</script>

<style>
	main{
		text-align: center;
		background-color: #f3f3f3;
		height: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: calc(10px + 2vmin);
		width: 100vw;
		margin-top: 12vh;
	}
	:global(html,body) {
		position: relative;
		width: 100%;
		height: 100%;
	}
	:global(body) {
		background-color: #f3f3f3;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		font-size: calc(10px + 2vmin);
		margin: 0;
		box-sizing: border-box;
		font-family: Noto Sans, Roboto;
}
</style>

<main bind:clientWidth={w} bind:clientHeight={h} alt="Main Page">
	<Header />
	<CurrentPage
	w={w}
	h={h}/>
	
</main>


