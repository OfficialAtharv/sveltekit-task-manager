<script>
	import "../app.css";
	import { onMount, onDestroy } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';

	export const theme = writable('light');

	onMount(() => {
		if (!browser) return;
		const saved = localStorage.getItem('theme') || 'light';
		theme.set(saved);
		document.documentElement.setAttribute('data-theme', saved);
	});

	let userEmail = '';
	let user = null;
	let authListener = null;

	async function fetchUser() {
		if (!browser) return;

		const { data } = await supabase.auth.getUser();
		user = data?.user ?? null;
		userEmail = user?.email ?? '';
	}

	onMount(async () => {
		await fetchUser();

		authListener = supabase.auth.onAuthStateChange((_event, session) => {
			user = session?.user ?? null;
			userEmail = user?.email ?? '';
		});
	});

	onDestroy(() => {
		authListener?.data?.subscription?.unsubscribe?.();
	});

	async function logout() {
		await supabase.auth.signOut();
		goto('/login');
	}

	$: path = $page.url.pathname;
	$: isOnSignup = path.startsWith('/signup');
	$: isOnLogin = path.startsWith('/login');
</script>

<nav class="navbar bg-base-300 px-5">
	<button class="btn btn-ghost normal-case text-xl" on:click={() => goto('/')}>Task Manager</button>

	<div class="ml-auto flex gap-3 items-center">
		<button class="btn btn-sm" on:click={() => goto('/tasks')}>Tasks</button>
		<button class="btn btn-sm btn-primary" on:click={() => goto('/tasks/new')}>Add Task</button>

		{#if user}
			<span class="px-3">{userEmail}</span>
			<button class="btn btn-sm btn-outline" on:click={logout}>Logout</button>
		{:else}
			<button class="btn btn-sm" on:click={() => goto('/login')}>Login</button>
			<button class="btn btn-sm" on:click={() => goto('/signup')}>Sign Up</button>
		{/if}
	</div>
</nav>

<slot />
