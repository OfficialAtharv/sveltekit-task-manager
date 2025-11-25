<script>
	import { goto } from '$app/navigation';
	import "../app.css";
</script>

<nav class="navbar bg-base-300 px-5">
	<a href="/" class="btn btn-ghost normal-case text-xl">Task Manager</a>

	<div class="ml-auto flex gap-3">
		<button class="btn btn-sm" on:click={() => goto('/tasks')}>Tasks</button>
		<button class="btn btn-sm btn-primary" on:click={() => goto('/tasks/new')}>Add Task</button>
		<button class="btn btn-sm btn-outline" on:click={() => goto('/logout')}>Logout</button>
	</div>
</nav>

<slot />
