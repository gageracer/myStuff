<script>
    import Create from './Create.svelte';
    import { toggle, editCont} from '../store.js';
    import NewButton from './NewButton.svelte';
    import { fly,fade } from 'svelte/transition';

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
        min-height: 10vh;
        height: auto;
        padding:5vh 0 2vh 0;
        list-style-type: none;
        display:flex;
        align-items: center;
        flex-direction: column;
        background-color:#f5f5f6;
        font-size:calc(1em + 4vmin);
        color: black;
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
    }
    .details{
		display: flex;
		flex-direction: column;
		align-items: center;
        justify-content: center;
        min-height: 20vh;
        max-height: 80vh;
		/* border: 1px solid green; */
		/* transform: scale(1.5); */
		padding-top: 0;
		/* font-size: calc(6px + 1vmin); */
	}
    .item-list{
        text-align: left;
        color:coral;
        width: 80%;
        overflow-x: hidden;
        overflow-y: scroll;
    }
    .edit-button{
        display: block;
        width: fit-content;
        align-self: center;
        background-color: #fff59d;
        float: right;
        font-size: 1.5em;
    }
    #name{
        height: 5vh;
        margin-top: 2.5vh;
    }
</style>


    <div class="containersum" on:click="{details}" in:fade="{{ duration: 500 }}" out:fade="{{duration: 0}}">

        <div id="name">
            {name}
        </div>
        <hr style="width: 90%; border-color: #e1e2e186;" />
        
        
        {#if !isSum}
        <div class="details" transition:fly="{{ y: -10, duration: 200 }}"
            
        >
            
            Type: {type} |
            {itemsnum} Stuff here
            <ul class="item-list">
                {#each items as item,i}
                    <li>{item}</li>
                {/each}
            </ul>
            <button class="edit-button" on:click="{editHandle}">Edit</button>
        </div>
        {/if}
        
        
    </div>

