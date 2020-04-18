<script>
    import {addContainer, toggle, setList, deleteContainer} from '../store.js';
    import Modal from './Modal.svelte';
    import { fade,fly } from 'svelte/transition';
    import { flip } from 'svelte/animate';

    export let id = "";
    export let name = "";
    export let type = "";
    export let items = [""];
    export let editt = false;

    let delModal = false;

    let inputMsg = "Start adding items to your container!";

    $: if(items.length > 1){ inputMsg= "And another one"}

    function handleSubmit(){
        if(name && type && items) {
            items = items.filter(Boolean);
            addContainer(name, type, items, id);

            console.log("handleSubmitted");
            toggle("main");
        }
        
    }

    function deleteSubmit(){
        deleteContainer(id);
        toggle("main");
    }

    $: {
        console.log(name+ ':'+type+':'+items);
        
        editt? setList({ name: name, type: type, items: items }, "tmpCont") 
        :setList({name: name, type: type, items: items},"unSaved");
    }

    $: {
        console.log(items.length+" items:"+items);
    }

    function newItem(itm){
        if(items[items.length-1] !== ""){
            items[items.length - 1] = itm;
            items = [...items, ""];
        }
    }

    function remItem(index) {
        console.log(index+ " th item deleted");
        items = items.filter((i,idx) => { return idx !== index;});
    }
</script>

<style>
    .create-new{
    display: flex;
    flex-direction: column;
    margin-top: 5em;
    width: 90vw;
    font-size: 1.5em;
    }

    label{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    label>*{
        text-align: center;
        margin-top: 0.5em;
        width: 90vw;
        border-radius: 3%;
        background-color: #f5f5f6;
    }
    label>input{
        font-size: 1.5em;
        height: 2em;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);

    }

    .itemslist{
        display: flex;
        flex-direction: row;
        margin-top: 5em;
        width: 100vw;
    }

    .itemslist>input{
        width: 90%;
        text-align: center;
        background-color: #f5f5f6;
        font-size: 1.5em;
        height: 2em;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
    }
    
    .itemslist>div{
        width: 90%;
    }
    .itemslist>button{
        width:10vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #fff59d;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);

    }
    .buttons{
        display: flex;
        flex-direction: row;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);

    }
    .buttons>button{
        width: 100%;
        background-color: #fff59d;
        font-size: 2em;
    }
    .row-buttons{
        display: flex;
        flex-direction: row;
        justify-content: center;
        
    }
    .row-buttons>button{
        width: 90vw;
    }
    .cross {
        background: black;
        height: 1.5em;
        position: relative;
        width: 0.075em;
        left: 0;
    }

    .cross:after {
        background: black;
        content: "";
        height: 0.075em;
        left: -0.7em;
        position: absolute;
        top: 0.7em;
        width: 1.5em;
    }

    .minus {
        background: black;
        height: 0.075em;
        position: relative;
        width: 1.5em;
    }
</style>

<div className="create-new" in:fade="{{ duration: 1000 }}" out:fade="{{duration: 0}}">
    <label>
        <input type="text" name="name" bind:value={name} autocomplete="off" maxlength="25"
            placeholder="The Container Name" required/>
        <input type="text" name="type" bind:value={type}  autocomplete="off" maxlength="32"
        placeholder="The Container Type"  required/>
        
        {#each items as item, i (i)}
            <div class="itemslist"
                    transition:fade="{{key: i}}"
                    animate:flip="{{key: i}}">
                <input type="text" name="tmpitems" autocomplete="off" maxlength="48"
                    placeholder={inputMsg} bind:value={item} required/>
                {#if i != 0}
                <button name="rem-item" on:click={remItem.bind(this,i)}>
                    <div class="minus"></div>
                </button>
                {/if}
                <button name="add-item" on:click="{ () => newItem(item)}">
                    <div class="cross"></div>
                </button>
            </div>
        {/each}
        <div class="buttons">
            {#if editt}
            <button name="delete-container" style="color: red;background-color: #f5f5f6;" on:click="{ () => delModal = true}">Delete</button>
            {/if}
            <button name="save-container" on:click|once={handleSubmit}>Save</button>
        </div>    
        

    </label>
</div>
{#if delModal}
    <Modal content="Are you sure you wanna delete this container?" on:cancel="{ () => delModal = false}" on:close="{ () => delModal = false}">
        Delete Confirm Modal
        <div class="row-buttons">
            <button on:click|once={deleteSubmit} style="background-color: red;">Yes</button>
            <button on:click="{ () => delModal = false}">No</button>
        </div>
        
    </Modal>
{/if}
