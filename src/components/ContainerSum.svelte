<script>
    import Container from './Container.svelte';
    import {myContainers} from '../store.js';
    import { flip } from 'svelte/animate';
    // import { onDestroy } from 'svelte';

    // let containers;
    // const subs = myContainers.subscribe(stuff => {
    //     containers = stuff;
    // });

    // onDestroy(() => {
    //     subs && subs();
    // })
</script>

<style>
    .welcome{
        display: flex;
        justify-content: space-evenly;
        align-items: flex-start;
        flex-direction: column;
        font-size: 2em;
        opacity: 75%;
        height: 80vh;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }
</style>
    {#each $myContainers as container, i (container.id)}
            <div animate:flip={{duration: 200}} >
                <Container
                    {...container}
                />
            </div>
    {:else}
        <div class="welcome"> 
            
            <div>
                Welcome to MyStuff! Start adding Containers to the app using the plus button so you
                can keep track of stuff you have, even when you forgot the app remembers!
            </div>
            
            <div>
                This app saves all data to your local store so all your data is on your device.
            </div>
        </div>
	{/each}