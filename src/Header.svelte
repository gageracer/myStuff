<script>
    import { toggle } from './store.js';
</script>

<style>
    #main_link{
		border: 2px ridge yellow;
		width: 90%;
		font-size: 3em;
		text-decoration: none;
		color: #61dafb;
		position: fixed;
		z-index: 2;
		padding: 0;
		background-color: #282c30;
		text-align: center;
		top:5%;
	}
</style>

<button id="main_link" on:click="{ () => toggle('main')}">My_Stuff</button>