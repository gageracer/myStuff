<script>
import { mypage,tmpCont,unSaved } from './store.js';

import Container from './components/Container.svelte';
import Create from './components/Create.svelte';
import ContainerSum from './components/ContainerSum.svelte';
import NewButton from './components/NewButton.svelte';

$: console.log("Current page is: " + $mypage);

</script>

{#if $mypage === "newlist"}

    <Create
        name={$unSaved.name}
        type={$unSaved.type}
        items={$unSaved.items}
    />

{:else if $mypage === "editlist"}

    <Create 
            name={$tmpCont.name}
            type={$tmpCont.type}
            items={$tmpCont.items}
            /> 
{:else}
    
    <ContainerSum/>
    <NewButton button='newlist'/>
{/if}