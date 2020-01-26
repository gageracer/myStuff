<script>
    import {addContainer, toggle, setList} from '../store.js';
    
    
    export let name = "";
    export let type = "";
    export let items = [""];
    

    let inputMsg = "Start adding items to your container!";

    $: if(items.length > 1){ inputMsg= "And another one";}

    function handleSubmit(){
        //TODO: use JSON to save data to localStorage
        addContainer(name,type,items);

        console.log("handleSubmitted");
        toggle("main");
    }

    $: {
        console.log(name+ ':'+type+':'+items);
        setList({name: name, type: type, items: items},"unSaved");
    }

    $: {
        console.log(items.length+" items:"+items);
    }

    function newItem(itm){
        items[items.length-1] = itm;
        items = [...items, ""];
        
    }

    function remItem(index) {
        console.log(index+ " th item deleted");
        items = items.filter((i,idx) => { return idx !== index;
        });
    }
</script>

<style>
    .create-new{
    display: flex;
    flex-direction: column;
    margin-top: 5em;
    border: 1px solid red;
    width: 90vw;
    font-size: 1.5em;
    }
    label>*{
    margin-top: 1em;
    font-size: 1em;
    width: 100%;
    height: auto;
    }
    .itemslist{
        display: flex;
        flex-direction: row;
        margin-top: 5em;
        border: 1px solid red;
        width: 100vw;
        font-size: 1.5em;
    }
    .itemslist>input{
        width: 90%;
    }
    .itemslist>div{
        width: 90%;
    }
    .itemslist>button{
        width:10%;
    }
</style>

<div className="create-new">
    Create Your Container
    <label>
        <input type="text" name="name" bind:value={name}
            placeholder="The Container Name" />
        <input type="text" name="type" bind:value={type} 
        placeholder="The Container Type" />
        
        {#each items as item, i (i)}
            <div class="itemslist">
                <input type="text" name="tmpitems" 
                    placeholder={inputMsg} bind:value={item}/>
                {#if i != 0}
                <button on:click={remItem.bind(this,i)}>-</button>
                {/if}
                <button on:click="{ () => newItem(item)}">+</button>
            </div>
        {/each}

        <button on:click|once={handleSubmit}>Done</button>

    </label>
</div>
