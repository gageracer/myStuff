<script>
    import { toggle } from '../store.js';


    export let button;

</script>

<style>
    #menu-edit-create{
        position: fixed;
        width: 1.1em;
        height: 1.1em;
        border: 1px red solid;
        
        -webkit-border-radius: 100%;
        -khtml-border-radius: 100%;
        -moz-border-radius: 100%;

        bottom: 6vw;
        right: 6vw;
        font-size: 5em;
        color: black;
        text-decoration: none;
        font-family: 'Courier New', Courier, monospace;
        background-color: #cbc26d;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        overflow: hidden;
        
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        text-align: center;
        display: flex;

    }

    
</style>

{#if button === 'newlist'}
<button id="menu-edit-create" on:click="{ () => toggle(button)}" ><span>+</span></button>
{:else if button === 'editlist'}


{/if}



