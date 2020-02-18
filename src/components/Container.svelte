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
        width: 95vw;
        height: fit-content;
        padding:5vh 0 5vh 0;
        list-style-type: none;
        display:flex;
        flex-direction: column;
        justify-content: center;
        background-color:#f5f5f6;
        font-size:calc(10px + 4vmin);
        color: black;
    }
    .details{
		display: flex;
		flex-direction: column;
		align-items: center;
        justify-content: center;
		/* border: 1px solid green; */
		/* transform: scale(1.5); */
		padding-top: 0;
		/* font-size: calc(6px + 1vmin); */
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
        background-color: #fdd835;
        float: right;
    }
    #name{
        height: 5vh;
        margin-top: 2.5vh;
    }
</style>


    <div class="containersum" on:click="{details}">

        <div id="name">
            {name}
        </div>
            
            
        
        
        {#if !isSum}
        <div class="details">
            <hr style="width: 90%;border-color: gray;" />
            Type: {type}
            <br>
            {itemsnum} Stuff here
            <div class="item-list">
                {#each items as item,i}
                    * {item}<br>
                    {/each}
            </div>
            <button class="edit-button" on:click="{editHandle}">Edit</button>
        </div>
        {/if}
        
        
    </div>

