<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	let tasks = [];
	let loading = true;

	onMount(async () => {
		const { data: { user } } = await supabase.auth.getUser();

		if (!user) return;

		const { data, error } = await supabase
			.from("tasks")
			.select("*")
			.eq("user_id", user.id)
			.order("created_at", { ascending: false });

		if (!error) tasks = data;
		loading = false;
	});
</script>

<div class="p-6">
	<h1 class="text-3xl font-bold mb-4">Your Tasks</h1>

	{#if loading}
		<p>Loading...</p>
	{:else if tasks.length === 0}
		<p class="text-gray-500">No tasks yet. Create one!</p>
	{:else}
		<div class="grid gap-4">
			{#each tasks as t}
				<div class="card bg-base-100 shadow-xl p-4">
					<h2 class="text-xl font-bold">{t.title}</h2>
					<p class="text-gray-500">{t.description}</p>

					<div class="mt-2 flex gap-3">
						<span class="badge badge-outline">{t.priority}</span>
						<span class="badge">{t.status}</span>
					</div>

					<p class="mt-2 text-sm">Due: {t.due_date}</p>
				</div>
			{/each}
		</div>
	{/if}
</div>
