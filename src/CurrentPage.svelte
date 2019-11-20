<script>
import { mypage } from './store.js';

import Create from './components/Create.svelte';
import ContainerSum from './components/ContainerSum.svelte';
import NewButton from './components/NewButton.svelte';

$: console.log("Current page is: " + $mypage);
</script>

{#if $mypage === "newlist"}

    <Create/>

{:else}
    
    <ContainerSum/>
    <NewButton button='newlist'/>
{/if}