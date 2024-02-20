<script lang="ts">
	import { get } from 'svelte/store';
	import Container from '$lib/components/Container.svelte';
	import { myContainers, sortReverse, containerColors } from '$lib/stores/store.svelte';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import Github from '$lib/assets/github2.svg';
	// import GoogleSignInButton from './GoogleSignInButton.svelte';
	// import { onDestroy } from 'svelte';

	// let containers;
	// const subs = myContainers.subscribe(stuff => {
	//     containers = stuff;
	// });

	// onDestroy(() => {
	//     subs && subs();
	// })

	// Sort Button Reactive Function
	let localContainers = get(sortReverse) ? get(myContainers).reverse() : get(myContainers);
	$: {
		$sortReverse;
		localContainers = localContainers.reverse();
	}

	// Github Button Animation Controller
	let githubVisible = false;
	const githubTimer = setTimeout(() => {
		githubVisible = true;
	}, 3000);

	// test The Container Colors
	console.log($containerColors);
</script>

<!-- <GoogleSignInButton/> -->
{#each localContainers as container, i (container.id)}
	<div animate:flip={{ duration: 200 }}>
		<Container {...container} />
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
{#if githubVisible}
	<a
		class="github"
		href="https://github.com/gageracer/myStuff"
		target="_blank"
		type="image/svg+xml"
		transition:fade
	>
		<Github />
	</a>
{/if}

<style>
	.welcome {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		flex-direction: column;
		font-size: 1.5em;
		opacity: 75%;
		margin: 0 4vw;
		height: 80vh;
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
