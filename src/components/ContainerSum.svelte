<script>
    import Container from './Container.svelte';
    import { myContainers } from '../store.js';

    import { get } from 'svelte/store';
    
    $: console.log("myContainers list has: ", get(myContainers));
</script>

    {#each get(myContainers) as container, i (container.id)}
		
            <Container
                {...container}
            />
    {:else}
        Welcome to MyStuff! Start adding Containers to the app using the plus button so you
        can keep track of stuff you have, even when you forgot the app remembers!
        <br/>
        This app saves all data to your local store so all your data is on your device.
	{/each}