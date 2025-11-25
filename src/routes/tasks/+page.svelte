<script>
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';

	import { goto } from '$app/navigation';

	let tasks = [];
	let loading = true;
	let userId = null;

	let filterStatus = 'All';
	let filterPriority = 'All';
	let search = '';
	let sortBy = 'created_at'; // default sorting

	// -------------------------------
	// Load Tasks
	// -------------------------------
	async function loadTasks() {
		loading = true;
		tasks = [];

		// Get logged-in user
		const { data } = await supabase.auth.getUser();
		userId = data?.user?.id;

		if (!userId) {
			goto('/login'); // safe inside onMount
			return;
		}

		// Build query
		let query = supabase.from('tasks').select('*').eq('user_id', userId);

		if (filterStatus !== 'All') query = query.eq('status', filterStatus);
		if (filterPriority !== 'All') query = query.eq('priority', filterPriority);
		if (search.trim()) query = query.ilike('title', `%${search}%`);

		query = query.order(sortBy, { ascending: false });

		const { data: rows, error } = await query;

		if (!error) tasks = rows;
		loading = false;
	}

	onMount(loadTasks);

	// -------------------------------
	// Task Actions
	// -------------------------------
	async function removeTask(id) {
		if (!confirm('Delete this task?')) return;

		const { error } = await supabase.from('tasks').delete().eq('id', id);
		if (error) return alert(error.message);

		await loadTasks();
	}

	async function toggleComplete(task) {
		const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';

		const { error } = await supabase
			.from('tasks')
			.update({ status: newStatus })
			.eq('id', task.id);

		if (error) return alert(error.message);

		await loadTasks();
	}

	async function editTask(task) {
		const newTitle = prompt('Edit title', task.title);
		if (!newTitle) return;

		const { error } = await supabase
			.from('tasks')
			.update({ title: newTitle })
			.eq('id', task.id);

		if (error) return alert(error.message);

		await loadTasks();
	}

	function goToAdd() {
		goto('/tasks/new');
	}
</script>

<!-- ------------------------------
     PAGE UI
------------------------------- -->

<div class="p-6">
	<div class="flex items-center gap-3 mb-6">
		<h1 class="text-3xl font-bold">Your Tasks</h1>
		<button class="btn btn-sm btn-primary ml-auto" on:click={goToAdd}>Add Task</button>
	</div>

	<!-- Filters -->
	<div class="flex gap-3 mb-4">
		<input
			class="input input-bordered"
			placeholder="Search title..."
			bind:value={search}
			on:input={loadTasks}
		/>

		<select class="select select-bordered" bind:value={filterStatus} on:change={loadTasks}>
			<option>All</option>
			<option>Pending</option>
			<option>In Progress</option>
			<option>Completed</option>
		</select>

		<select class="select select-bordered" bind:value={filterPriority} on:change={loadTasks}>
			<option>All</option>
			<option>Low</option>
			<option>Medium</option>
			<option>High</option>
		</select>

		<select class="select select-bordered" bind:value={sortBy} on:change={loadTasks}>
			<option value="created_at">Created (new)</option>
			<option value="due_date">Due date</option>
			<option value="priority">Priority</option>
		</select>

		<button class="btn btn-ghost" on:click={loadTasks}>Refresh</button>
	</div>

	<!-- Task List -->
	{#if loading}
		<p>Loading...</p>

	{:else if tasks.length === 0}
		<p class="text-gray-500">No tasks yet. Click Add Task to create one.</p>

	{:else}
		<div class="grid gap-4">
			{#each tasks as t}
				<div class="card bg-base-100 shadow-xl p-4">
					<div class="flex justify-between items-start">
						<div>
							<h2 class="text-xl font-bold">{t.title}</h2>
							<p class="text-gray-500">{t.description}</p>
							<p class="mt-2 text-sm">Due: {t.due_date || '—'}</p>
						</div>

						<div class="flex flex-col items-end gap-2">
							<span class="badge" class:badge-success={t.status === 'Completed'}>
								{t.status}
							</span>
							<span class="badge badge-outline">{t.priority}</span>

							<div class="flex gap-2 mt-3">
								<button class="btn btn-xs" on:click={() => toggleComplete(t)}>
									{t.status === 'Completed' ? 'Mark Pending' : 'Complete'}
								</button>

								<button class="btn btn-xs" on:click={() => editTask(t)}>
									Edit
								</button>

								<button class="btn btn-xs btn-error" on:click={() => removeTask(t.id)}>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
