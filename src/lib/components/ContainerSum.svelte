<script lang="ts">
	import Container from '$lib/components/Container.svelte'
	import { getMyStuff } from '$lib/stores/store.svelte'
	import { flip } from 'svelte/animate'
	import { fade } from 'svelte/transition'
	import GitHub from '$lib/assets/github2.svelte'

	const mystuff = getMyStuff()

	// Github Button Animation Controller
	let githubVisible = $state(false)
	setTimeout(() => {
		githubVisible = true
	}, 3000)
</script>

<div class="containersum">
	{#each mystuff.stuff as _, id (id)}
		<div animate:flip={{ duration: 200 }}>
			<Container bind:container={mystuff.stuff[id]} {id} />
		</div>
	{:else}
		<div class="welcome">
			<div>
				Welcome to MyStuff! Start adding Containers to the app using the plus button so you can keep
				track of stuff you have, even when you forgot the app remembers!
			</div>

			<div>This app saves all data to your local store so all your data is on your device.</div>
		</div>
	{/each}
</div>
{#if githubVisible}
	<a
		class="github"
		href="https://github.com/gageracer/myStuff/tree/mystuff5"
		target="_blank"
		type="image/svg+xml"
		transition:fade
	>
		<GitHub />
	</a>
{/if}

<style lang="postcss">
	.containersum {
		@apply pb-20;
	}
	.welcome {
		@apply font-sans flex justify-evenly items-center flex-col text-1.5 opacity-75 h-80min mx-0 my-[4vw];
	}
	.github {
		@apply fixed no-underline top-5d -translate-y-1/2 right-[3vw] z-4;
	}
</style>
