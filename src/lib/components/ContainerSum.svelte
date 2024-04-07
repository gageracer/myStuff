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
	{#each mystuff.stuff as _, i (i)}
		<div animate:flip={{ duration: 200 }}>
			<Container bind:container={mystuff.stuff[i]} />
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
		href="https://github.com/gageracer/myStuff"
		target="_blank"
		type="image/svg+xml"
		transition:fade
	>
		<GitHub />
	</a>
{/if}

<style>
	.containersum {
		@apply pb-16;
	}
	.welcome {
		@apply flex justify-evenly align-middle flex-col text-1.5 opacity-75 h-80min mx-0 my-[4vw];
		font-family:
			Noto Sans,
			'Trebuchet MS',
			'Lucida Sans Unicode',
			'Lucida Grande',
			'Lucida Sans',
			Arial,
			sans-serif;
	}
	.github {
		position: fixed;
		text-decoration: none;
		top: 2vh;
		right: 3vw;
		z-index: 5;
	}
</style>
