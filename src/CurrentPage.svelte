<script>
    import { mypage,tmpCont,unSaved } from './store.js';

    import Container from './components/Container.svelte';
    import Create from './components/Create.svelte';
    import ContainerSum from './components/ContainerSum.svelte';
    import NewButton from './components/NewButton.svelte';
    import { slide } from 'svelte/transition';

    // import('./components/Create.svelte')
    //     .then(module => module.default)
    //     .then(Create => { return Create })
    //     .catch(err => console.error(err))

    // let cmp
    
    // const setComponent = module => {
    //     cmp = module.default
    // }
    // const logError = err => {
    //     console.error(err && err.stack || err)
    // }
    // const loadCreate = e => {
    //     e.preventDefault()
    //     import('./components/Create.svelte').then(setComponent).catch(logError)
    // }
    let status;
    $: console.log(status);
    $: console.log("Current page is: " + $mypage);
    export let w,h;
    let ratio;

    $: ratio = (w / h).toFixed(2);
</script>
<style>
.content{
    height: 80vmin;
}

</style>
{#if $mypage === "newlist"}

    <svelte:component this={Create}
        name={$unSaved.name}
        type={$unSaved.type}
        items={$unSaved.items}
        editt={false}
    />

{:else if $mypage === "editlist"}

    <svelte:component this={Create}
        name={$tmpCont.name}
        type={$tmpCont.type}
        items={$tmpCont.items}
        id={$tmpCont.id}
        editt={true}
        /> 
{:else}
    width:{w} height:{h} ratio: {ratio}
    <div class="content" transition:slide="{{ duration: 500}}" on:outroend="{() => status = 'outro ended'}"
>
        <ContainerSum />
        <NewButton button='newlist'/>
        <NewButton button='sortReverse'/>
    </div>
{/if}