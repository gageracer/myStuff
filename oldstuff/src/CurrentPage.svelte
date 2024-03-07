<script lang="ts">
    import { mypage,tmpCont,unSaved } from './store.js';
    
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
    export let w:number,h:number;
    let ratio:string;

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
    <!-- Page width:{w} height:{h} ratio: {ratio} -->
    <div class="content" transition:slide="{{ duration: 500}}" on:outroend="{() => status = 'outro ended'}">
        
        <!-- <svg width="100vw" height="20vh">
            <circle cx="50%" cy="50%" r="40" stroke="green" stroke-width="4" fill="yellow" />
            <text fill="#0f0f0f" font-size="40" font-family="Verdana" x="50%" y="50%">SVG</text>
        </svg> -->

        <ContainerSum />
        <NewButton button='newlist'/>
        <NewButton button='sortReverse'/>
    </div>
{/if}