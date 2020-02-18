<script>
    import { toggle } from '../store.js';


    export let button;


</script>

<style>
    #menu-edit-create{
        position: fixed;
        width: 4rem;
        height: 4rem;
        border: 1px transparent solid;
        align-items: center;
        border-radius: 50%;
        bottom: 5vh;
        right: 5vw;
        font-size: 4rem;
        padding-top: 0;
        color: black;
        text-decoration: none;
        font-family: 'Courier New', Courier, monospace;
        background-color: #cbc26d;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    }
    
</style>

{#if button === 'newlist'}
<button id="menu-edit-create" on:click="{ () => toggle(button)}" >+</button>
{:else if button === 'editlist'}


{/if}



