<script lang="ts">
    import {toggle} from '../store';
    import {addContainer} from '../stores/containers';
    import {editCont} from '../stores/containers';
    import { fly } from 'svelte/transition';

    export let id = "";
    export let name = "TestName";
    export let type = "TestType";
    export let items: (string | boolean)[] = ["sugar",false];
    export let interact = false;
    export let containerColor = "#e6e6e9";
    let itemsnum = items.length;
    export let isSum = true;
    let interactColor = "#CADCE2";
    let remaining: number;
    $: {
        remaining = items.filter(t => !t[1]).length;
        console.log("remaining is:",remaining);
    }

    // TODO: Add the color here, change the editCont function to add the new color if the user changes it or not
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
    function isRed(index:number){
        
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
        transition: background-color 0.5s ease;
        margin-bottom: 1rem;
        width: 95vw;
        min-height: 10vh;
        height: auto;
        padding:2vh 0 2vh 0;
        list-style-type: none;
        display:flex;
        align-items: center;
        flex-direction: column;
        font-size:calc(1rem + 4vmin);
        color: black;
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
    }
    .containersum-on{
        background-color: var(--container-color-on);
    }
    .containersum-off{
        background-color:var(--container-color-off);
    }
    .details{
        font-size:calc(1rem + 2vmin);
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
        scrollbar-width: none; /* For Firefox */
        -ms-overflow-style: none; /* For Internet Explorer and Edge */
    }
    .item-list::-webkit-scrollbar {
    width: 0px; /* For Chrome, Safari, and Opera */
    }
    .item-list>li{
        transition: color 1s;
    }
    .edit-button{
        display: block;
        width: fit-content;
        align-self: center;
        background-color: #fff59d;
        float: right;
        font-size: 1.5em;
    }
    /* .interactive-button{
        zoom: 2;
    } */
    .interactive-text-off{
        color: grey;
    }
    .interactive-text-on{
        transition: color 1s;
        color: rgb(255, 111, 0);
    }
    .item-red{
        font-size: calc(1rem + 2vmin);
        color:black;
    }
    .item-not-red{
        font-size: calc(1rem + 2vmin);
        text-decoration: line-through;
        color:rgba(90, 90, 90, 0.9);
    }
    #name{
        font-size:calc(1rem + 4vmin);
        height: 5vh;
        width: 100%;
    }
    .options{
        transition: color 1s;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
        color: black;
        font-size: (1em + 4vmin);
    }
</style>


    <div class="{ interact ? 'containersum containersum-on':'containersum containersum-off' }" style="--container-color-off: {containerColor}; --container-color-on: {interactColor}">

        <div id="name"on:click="{details}" >
            {name}
        </div>
        <hr style="width: 90%; border-color: #e1e2e186;" />
        
        
        {#if !isSum}
        <div class="details" transition:fly="{{ y: -10, duration: 200 }}">
            {#if remaining == itemsnum}
                <span>{type} | {itemsnum} Stuff here</span>
            {:else}
                <span>{type} | {remaining} / {itemsnum} Stuff</span>
            {/if}

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

