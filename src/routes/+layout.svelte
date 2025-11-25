<script>
	import "../app.css";
	import { onMount, onDestroy } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';


	export const theme = writable('light');

	
	onMount(() => {
		const saved = localStorage.getItem('theme') || 'light';
		theme.set(saved);
		document.documentElement.setAttribute('data-theme', saved);
	});

	let userEmail = '';
	let user = null;
	let authListener = null;

	async function fetchUser() {
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
		if (authListener && typeof authListener.data?.subscription?.unsubscribe === 'function') {
			authListener.data.subscription.unsubscribe();
		}
	});

	async function logout() {
		await supabase.auth.signOut();
		user = null;
		userEmail = '';
		goto('/login');
	}

	function toggleTheme() {
		theme.update(t => {
			const next = t === 'light' ? 'dark' : 'light';
			localStorage.setItem('theme', next);
			document.documentElement.setAttribute('data-theme', next);
			return next;
		});
	}

	$: path = $page.url.pathname;
	$: isOnSignup = path === '/signup' || path.startsWith('/signup/');
	$: isOnLogin = path === '/login' || path.startsWith('/login/');
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
		
			{#if isOnSignup}
				<button class="btn btn-sm" on:click={() => goto('/login')}>Login</button>
			{:else if isOnLogin}
				<button class="btn btn-sm" on:click={() => goto('/signup')}>Sign up</button>
			{:else}
				<button class="btn btn-sm" on:click={() => goto('/login')}>Login</button>
				<button class="btn btn-sm" on:click={() => goto('/signup')}>Sign up</button>
			{/if}
		{/if}

		<button class="btn btn-square" on:click={toggleTheme} aria-label="Toggle theme">
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
				<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
			</svg>
		</button>
	</div>
</nav>

<slot />
