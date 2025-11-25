<script lang="ts">
	import { page } from '$app/stores';

	export let data;

	let showModal = false;
	let activeTab = 'preview'; // 'preview' | 'prompt' | 'styleGuide'
	let showHoverPreview = false;
	let selectedImage: string | null = null;

	$: hasResources =
		data.designResources.images.length > 0 ||
		data.designResources.prompt ||
		data.designResources.styleGuide;
	$: previewImage = data.designResources.images[0];

	function toggleModal() {
		if (hasResources) {
			showModal = !showModal;
		}
	}

	function downloadFile(content: string, filename: string) {
		const blob = new Blob([content], { type: 'text/markdown' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}
</script>

<slot />

<aside class="fixed top-1/2 right-4 z-50 flex -translate-y-1/2 flex-col gap-4">
	<!-- Existing buttons (kept as placeholders if they were intended to be kept, or maybe I should replace them? 
	     The user said "add a sidebar button", implying addition. 
	     But the existing ones look like static mockups: "prompt", "design".
	     I will keep them for now to be safe, or maybe the user wants me to make THOSE functional?
	     "在 layout 中添加一个侧边按钮" -> Add A sidebar button.
	     I'll add a new one specifically for this feature, or maybe combine?
	     Let's add a new one with a clear icon or text "Resources".
	-->

	<div class="group relative">
		<button
			class="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg transition-transform hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50"
			on:click={toggleModal}
			on:mouseenter={() => (showHoverPreview = true)}
			on:mouseleave={() => (showHoverPreview = false)}
			disabled={!hasResources}
			aria-label="Design Resources"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-6 w-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
				/>
			</svg>
		</button>

		<!-- Hover Preview -->
		{#if showHoverPreview && previewImage && !showModal}
			<div
				class="absolute top-1/2 right-full mr-4 w-48 -translate-y-1/2 rounded-lg border border-gray-200 bg-white p-2 shadow-xl transition-opacity"
			>
				<img src={previewImage} alt="Preview" class="h-auto w-full rounded" />
				<div
					class="absolute top-1/2 right-[-6px] -translate-y-1/2 border-y-[6px] border-r-0 border-l-[6px] border-y-transparent border-l-white"
				></div>
			</div>
		{/if}
	</div>
</aside>

<!-- Modal -->
{#if showModal}
	<div
		class="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm"
		on:click|self={toggleModal}
		on:keydown={(e) => e.key === 'Escape' && toggleModal()}
		role="button"
		tabindex="0"
	>
		<div
			class="flex h-[80vh] w-[90vw] max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
		>
			<!-- Header -->
			<div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
				<h2 class="text-xl font-semibold text-gray-800">Design Resources</h2>
				<button
					on:click={toggleModal}
					class="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
					aria-label="Close modal"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Tabs -->
			<div class="flex border-b border-gray-100 px-6">
				<button
					class="border-b-2 px-4 py-3 text-sm font-medium transition-colors {activeTab === 'preview'
						? 'border-indigo-600 text-indigo-600'
						: 'border-transparent text-gray-500 hover:text-gray-700'}"
					on:click={() => (activeTab = 'preview')}
				>
					Preview ({data.designResources.images.length})
				</button>
				<button
					class="border-b-2 px-4 py-3 text-sm font-medium transition-colors {activeTab === 'prompt'
						? 'border-indigo-600 text-indigo-600'
						: 'border-transparent text-gray-500 hover:text-gray-700'}"
					on:click={() => (activeTab = 'prompt')}
				>
					Prompt
				</button>
				<button
					class="border-b-2 px-4 py-3 text-sm font-medium transition-colors {activeTab ===
					'styleGuide'
						? 'border-indigo-600 text-indigo-600'
						: 'border-transparent text-gray-500 hover:text-gray-700'}"
					on:click={() => (activeTab = 'styleGuide')}
				>
					Style Guide
				</button>
			</div>

			<!-- Content -->
			<div class="flex-1 overflow-y-auto bg-gray-50 p-6">
				{#if activeTab === 'preview'}
					{#if data.designResources.images.length > 0}
						<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{#each data.designResources.images as img}
								<button
									class="group relative w-full overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5 transition-all hover:shadow-md focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
									on:click={() => (selectedImage = img)}
								>
									<img src={img} alt="Design resource" class="h-auto w-full" />
									<div
										class="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
											/>
										</svg>
									</div>
								</button>
							{/each}
						</div>
					{:else}
						<div class="flex h-full items-center justify-center text-gray-400">No images found</div>
					{/if}
				{:else if activeTab === 'prompt'}
					<div class="relative rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5">
						{#if data.designResources.prompt}
							<button
								class="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 hover:text-indigo-600"
								on:click={() => downloadFile(data.designResources.promptRaw, 'prompt.md')}
								title="Download Markdown"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="h-4 w-4"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
									/>
								</svg>
								Download
							</button>
							<div class="prose max-w-none prose-indigo">
								{@html data.designResources.prompt}
							</div>
						{:else}
							<p class="text-gray-400">No prompt file found</p>
						{/if}
					</div>
				{:else if activeTab === 'styleGuide'}
					<div class="relative rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-900/5">
						{#if data.designResources.styleGuide}
							<button
								class="absolute top-4 right-4 z-10 flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50 hover:text-indigo-600"
								on:click={() => downloadFile(data.designResources.styleGuideRaw, 'style-guide.md')}
								title="Download Markdown"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="h-4 w-4"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
									/>
								</svg>
								Download
							</button>
							<div class="prose max-w-none prose-indigo">
								{@html data.designResources.styleGuide}
							</div>
						{:else}
							<p class="text-gray-400">No style guide file found</p>
						{/if}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<!-- Large Image Modal -->
{#if selectedImage}
	<div
		class="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
		on:click={() => (selectedImage = null)}
		on:keydown={(e) => e.key === 'Escape' && (selectedImage = null)}
		role="button"
		tabindex="0"
	>
		<img
			src={selectedImage}
			alt="Full size"
			class="max-h-[95vh] max-w-[95vw] object-contain transition-transform duration-300"
		/>
		<button
			class="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
			on:click|stopPropagation={() => (selectedImage = null)}
			aria-label="Close full view"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-6 w-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	</div>
{/if}
