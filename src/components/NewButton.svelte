<script>
    import {toggle, sortOption} from '../store';


    export let button;

</script>

<style>
    #menu-edit-create{
        position: fixed;
        width: 3em;
        height: 3em;
        
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
        height: 1.5em;
        position: relative;
        width: 0.1em;
    }
    #cross:after {
        background: black;
        content: "";
        height: 0.1em;
        left: -0.7em;
        position: absolute;
        top: 0.7em;
        width: 1.5em;
    }

    #sort-reverse{
    position: fixed;
    width: 3em;
    height: 3em;
    
    -webkit-border-radius: 50%;
    -khtml-border-radius: 50%;
    -moz-border-radius: 50%;

    top: 1vh;
    right: 82vw;
    color: black;
    text-decoration: none;
    font-family: 'Courier New', Courier, monospace;
    background-color: #8de29f;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    overflow: hidden;
    
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    text-align: center;
    display: flex;
    z-index: 4;
}

</style>

{#if button === 'newlist'}
<button id="menu-edit-create" name="new-list" on:click="{ () => toggle(button)}" aria-label="Create Container">
    <div id="cross" aria-hidden="true"></div>
</button>
{:else if button === 'sortReverse'}
<button id="sort-reverse" on:click="{sortOption}">
    <div>Sort</div>
</button>

{/if}



