<script>
    import Create from './Create.svelte';
    import { toggle, editCont} from '../store.js';
    import NewButton from './NewButton.svelte';

    export let id = "";
    export let name = "TestName";
    export let type = "TestType";
    export let items = ["sugar"];
    let itemsnum = items.length;

    export let isSum = true;

    export function editHandle() {
            
        editCont(name, type, items, id);
        toggle("editlist");
        console.log("handleSubmitted by editCont");
            
    
    }

    function details() {
            isSum = !isSum;
    }
</script>

<style>
    .containersum{
        margin-bottom: 1rem;
        width: 100%;
        height: 100%;
        list-style-type: none;
        display:flex;
        flex-direction: column;
        justify-content: center;
        background-color:darkslategrey;
        font-size:calc(10px + 4vmin);
    }
    #details{
		display: flex;
		flex-direction: row;
		align-items: center;
        justify-content: center;
		/* border: 1px solid green; */
		zoom: 2;
		/* transform: scale(1.5); */
		padding-top: 0;
		font-size: calc(6px + 1vmin);
	}
    .item-list{
        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        color:coral;
    }
    .edit-button{
        width: fit-content;
        align-self: center;
    }
</style>


    <div class="containersum">
        <div id="details">
            <input  type="checkbox" on:click="{details}">
            {#if isSum}Show{:else}Hide{/if} details
        </div>
        Name: {name}
        <br>
        Type: {type}
        <br>
        {itemsnum} Stuff here
        
        {#if !isSum}:
        <div class="item-list">
            {#each items as item,i}
                * {item}<br>
                {/each}
        </div>
        {/if}
        <button class="edit-button" on:click="{editHandle}">Edit</button>
        
    </div>

