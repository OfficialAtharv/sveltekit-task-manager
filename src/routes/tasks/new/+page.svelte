<script>
	import { supabase } from '$lib/supabase';

	let title = '';
	let description = '';
	let priority = 'Low';
	let due_date = '';
	let message = '';
	let loading = false;

	async function addTask() {
		loading = true;
		message = "";

		const { data } = await supabase.auth.getUser();

		if (!data.user) {
			message = "You are not logged in.";
			loading = false;
			return;
		}

		const { error } = await supabase.from("tasks").insert({
			user_id: data.user.id,
			title,
			description,
			priority,
			due_date,
			status: "Pending"
		});

		if (error) {
			message = error.message;
		} else {
			message = "Task added successfully!";
			title = "";
			description = "";
			priority = "Low";
			due_date = "";
		}

		loading = false;
	}
</script>

<div class="min-h-screen flex justify-center p-8 bg-base-200">
	<div class="card w-full max-w-lg bg-base-100 shadow-xl p-6">

		<h2 class="text-3xl font-bold mb-4 text-center">Add New Task</h2>

		<input class="input input-bordered w-full mb-3" placeholder="Title" bind:value={title} />
		<textarea class="textarea textarea-bordered w-full mb-3" placeholder="Description" bind:value={description}></textarea>

		<select class="select select-bordered w-full mb-3" bind:value={priority}>
			<option>Low</option>
			<option>Medium</option>
			<option>High</option>
		</select>

		<input type="date" class="input input-bordered w-full mb-3" bind:value={due_date} />

		<button class="btn btn-primary w-full" on:click={addTask} disabled={loading}>
			{loading ? "Saving..." : "Save Task"}
		</button>

		{#if message}
			<p class="mt-4 text-center text-lg">{message}</p>
		{/if}
	</div>
</div>
