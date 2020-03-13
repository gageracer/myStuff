<script>

    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let content;

</script>

<style type="text/css"> 
    .modal-bg{
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.75);
    }
    .modal{
        position: absolute;
        left: 50%;
        top: 50%;
        width: calc(90vw - 4em);
        max-width: 32em;
        overflow: auto;
        transform: translate(-50%,-50%);
        padding: 1em;
        border-radius: 0.2em;
        background: white;
        color: black;
        display: flex;
        flex-direction: column;
    }
    
</style>


<div class="modal-bg" on:click="{ () => dispatch('cancel')}"></div>

<div class="modal">
    {content}
    <slot>
        <button on:click="{ () => dispatch('close')}">Close</button>
    </slot>
</div>