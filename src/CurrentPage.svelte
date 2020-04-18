<script>
    import { mypage,tmpCont,unSaved } from './store.js';

    import Container from './components/Container.svelte';
    import Create from './components/Create.svelte';
    import ContainerSum from './components/ContainerSum.svelte';
    import NewButton from './components/NewButton.svelte';

    $: console.log("Current page is: " + $mypage);
    export let w,h;
    let ratio;

    $: ratio = (w / h).toFixed(2);
</script>

{#if $mypage === "newlist"}

    <Create
        name={$unSaved.name}
        type={$unSaved.type}
        items={$unSaved.items}
        editt={false}
    />

{:else if $mypage === "editlist"}

    <Create 
        name={$tmpCont.name}
        type={$tmpCont.type}
        items={$tmpCont.items}
        id={$tmpCont.id}
        editt={true}
        /> 
{:else}
    width:{w} height:{h} ratio: {ratio}
    <ContainerSum alt="Welcome-Page"/>
    <NewButton button='newlist' NewList/>
{/if}