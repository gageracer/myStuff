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
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);

	}
</style>

<button id="main_link" on:click="{ () => toggle('main')}">My_Stuff <span style="font-size: 1rem; color: gray;">0.301</span> </button>