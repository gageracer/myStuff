<script>
    import { get } from 'svelte/store';
    import Container from './Container.svelte';
    import {myContainers, sortReverse} from '../store.js';
    import { flip } from 'svelte/animate';
    import GoogleSignInButton from './GoogleSignInButton.svelte';
    // import { onDestroy } from 'svelte';

    // let containers;
    // const subs = myContainers.subscribe(stuff => {
    //     containers = stuff;
    // });

    // onDestroy(() => {
    //     subs && subs();
    // })
    let localContainers = get(sortReverse) ? get(myContainers).reverse() : get(myContainers);
    $: { $sortReverse; localContainers = localContainers.reverse(); }
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
        font-family: Noto Sans, 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }
</style>
    <!-- <GoogleSignInButton/> -->
    
    {#each localContainers as container, i (container.id)}
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