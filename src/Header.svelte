<script>
    import { toggle } from './store.js';
</script>

<style>
    #main_link{
		width: 100%;
		font-size: 2em;
		text-decoration: none;
		color: #212121;
		position: fixed;
		z-index: 2;
		padding: 0;
		background-color: #fff59d;
		text-align: center;
		top:0;
		height: 10vh;
	}
</style>

<button id="main_link" on:click="{ () => toggle('main')}">My_Stuff</button>