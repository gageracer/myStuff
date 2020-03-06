<script>
    import { toggle } from '../store.js';


    export let button;

</script>

<style>
    #menu-edit-create{
        position: fixed;
        width: 5em;
        height: 5em;
        
        -webkit-border-radius: 50%;
        -khtml-border-radius: 50%;
        -moz-border-radius: 50%;

        bottom: 6vw;
        right: 6vw;
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
    #cross {
        background: black;
        height: 2.5em;
        position: relative;
        width: 0.25em;
    }
    #cross:after {
        background: black;
        content: "";
        height: 0.25em;
        left: -1.1em;
        position: absolute;
        top: 1em;
        width: 2.5em;
    }

    
</style>

{#if button === 'newlist'}
<button id="menu-edit-create" on:click="{ () => toggle(button)}" ><div id="cross"></div></button>
{:else if button === 'editlist'}


{/if}



