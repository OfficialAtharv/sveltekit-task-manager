<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let loading = false;
	let message = '';

	onMount(async () => {
		const { data } = await supabase.auth.getUser();
		if (data?.user) goto('/tasks');
	});

	async function login() {
		loading = true;
		message = '';

		const { error } = await supabase.auth.signInWithPassword({ email, password });

		if (error) {
			message = error.message;
			loading = false;
			return;
		}

		goto('/tasks');
	}
</script>

<div class="min-h-screen flex items-center justify-center bg-base-200">
	<div class="card w-full max-w-md shadow-xl bg-base-100 p-6">
		<h2 class="text-3xl font-bold mb-4 text-center">Login</h2>

		<input class="input input-bordered w-full mb-3" placeholder="Email" bind:value={email} />
		<input class="input input-bordered w-full mb-3" placeholder="Password" type="password" bind:value={password} />

		<button class="btn btn-primary w-full" on:click={login} disabled={loading}>
			{loading ? 'Logging in...' : 'Login'}
		</button>

		{#if message}
			<p class="mt-3 text-center text-red-500">{message}</p>
		{/if}
	</div>
</div>
