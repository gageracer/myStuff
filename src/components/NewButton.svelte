<script>
    import { toggle } from '../store.js';

    export let button;

</script>

<style>
    #menu-edit-create{
        position: fixed;
        width: 5.5rem;
        height: 5.5rem;
        border: 1px transparent solid;
        border-radius: 50%;
        bottom: 5vh;
        right: 5vw;
        font-size: 4rem;
        padding-top: 0.4rem;
        color: red;
        text-decoration: none;
        font-family: 'Courier New', Courier, monospace;
        background-color: #454f69;
    }
    .edit-button{
        width: fit-content;
        align-self: center;
    }
</style>

{#if button === 'newlist'}
<button id="menu-edit-create" on:click="{ () => toggle(button)}">+</button>
{:else if button === 'editlist'}
<button class="edit-button">Edit</button>

{/if}



