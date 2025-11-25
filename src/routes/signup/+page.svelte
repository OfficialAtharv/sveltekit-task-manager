<script>
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';
	let message = '';
	let loading = false;

	function validate() {
		if (!email.includes('@')) return 'Please enter a valid email.';
		if (password.length < 6) return 'Password must be at least 6 characters.';
		return '';
	}

	async function signup() {
		message = '';
		const err = validate();
		if (err) { message = err; return; }
		loading = true;

		const { data, error } = await supabase.auth.signUp({ email, password });

		if (error) {
			message = error.message;
			loading = false;
			return;
		}

		message = 'Signup successful — please check email (if confirmation enabled). Redirecting to login...';
		setTimeout(() => goto('/login'), 1200);
	}
</script>

<div class="min-h-screen flex items-center justify-center bg-base-200">
	<div class="card w-full max-w-md shadow-xl bg-base-100 p-6">
		<h2 class="text-3xl font-bold mb-4 text-center">Create Account</h2>

		<input class="input input-bordered w-full mb-3" placeholder="Email" bind:value={email} />
		<input class="input input-bordered w-full mb-3" placeholder="Password" type="password" bind:value={password} />

		<button class="btn btn-primary w-full" on:click={signup} disabled={loading}>
			{loading ? 'Creating...' : 'Sign Up'}
		</button>

		{#if message}
		<p class="mt-3 text-center text-sm text-error">{message}</p>

		{/if}
	</div>
</div>
