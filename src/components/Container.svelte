<script>
    import Create from './Create.svelte';
    import {toggle} from '../store';
    import {addContainer} from '../stores/containers';
    import {editCont} from '../stores/containers';
    import NewButton from './NewButton.svelte';
    
    import { fly,fade } from 'svelte/transition';

    export let id = "";
    export let name = "TestName";
    export let type = "TestType";
    export let items = ["sugar"];
    export let interact = false;
    
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
    function theInteract(){
            interact = !interact;
            addContainer(name, type, items, id, interact);
    }
    function isRed(index){
        
        if(interact){
            items[index][1] = !items[index][1];
            addContainer(name,type,items,id,interact);
            // !event.target.style.color ? event.target.style.color = "red" : event.target.style.color = "";
            // console.log(event.target.style.color);
            // console.log(event.target);
        }
        
    }
    $: console.log("interaction is: ", interact);
</script>

<style>
    .containersum{
        margin-bottom: 1rem;
        width: 95vw;
        min-height: 10vh;
        height: auto;
        padding:2vh 0 2vh 0;
        list-style-type: none;
        display:flex;
        align-items: center;
        flex-direction: column;
        font-size:calc(1em + 4vmin);
        color: black;
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
    }
    .containersum-on{
        background-color: #fcec60;
    }
    .containersum-off{
        background-color:#e6e6e9;
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
        color: chocolate;
		padding-top: 0;
		/* font-size: calc(6px + 1vmin); */
	}
    .item-list{
        text-align: left;
        width: 90vw;
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
    .interactive-button{
        zoom: 2;
    }
    .interactive-text-off{
        color: grey;
    }
    .interactive-text-on{
        color: red;
    }
    .item-red{
        font-size: calc(1rem + 2vmin);
        color:red;
    }
    .item-not-red{
        font-size: calc(1rem + 2vmin);
        color:coral;
    }
    #name{
        height: 5vh;
        margin-top: 2.5vh;
        width: 100%;
    }
    .options{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
        color: black;
        font-size: 5vw;
    }
</style>


    <div class="{ interact ? 'containersum containersum-on':'containersum containersum-off' }"  in:fade="{{ duration: 200 }}" out:fade="{{duration: 0}}">

        <div id="name"on:click="{details}" >
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
                    <li on:click="{isRed.bind(this,i)}" class="{ item[1] ? 'item-not-red':'item-red' }">{item[0]}</li>
                {/each}
            </ul>
            <div class="options">
                <button class="edit-button" name="edit-button" on:click="{editHandle}">Edit</button>
                <div class="{ interact ? 'interactive-text-on':'interactive-text-off' }" on:click="{theInteract}"> 
                    Interactive Mode
                </div>
            </div>  
        </div>
        {/if}
        
        
    </div>

