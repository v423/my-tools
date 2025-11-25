<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<button onclick={() => goto('/calculator/salary')}>计算器</button>
<button onclick={() => goto('/generate-style-guide/real-estate')}>生成样式指南</button>
