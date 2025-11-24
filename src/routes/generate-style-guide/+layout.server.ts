import { marked } from 'marked';

export const load = async ({ route }) => {
  const routeId = route.id;
  // route.id starts with /, e.g., "/generate-style-guide/real-estate"
  // We need to match this against the glob paths.

  // Load all design images
  // Eager load to get URLs immediately. Query ?url ensures we get the asset URL.
  const imagesGlob = import.meta.glob('./**/design/*.{png,jpg,jpeg,webp}', {
    eager: true,
    query: '?url',
    import: 'default'
  });

  // Load all markdown files
  // Eager load with ?raw to get content.
  const markdownGlob = import.meta.glob('./**/design/*.md', {
    eager: true,
    query: '?raw',
    import: 'default'
  });

  let images: string[] = [];
  let promptContent = '';
  let styleGuideContent = '';

  // Filter images for the current route
  // The keys in glob are relative to this file, e.g., "./real-estate/design/image.jpg"
  // routeId for this layout might be generic, but we are looking for resources *under* this layout's children.
  // Wait, this is a layout. It runs for all children.
  // If I am at /generate-style-guide/real-estate, route.id is /generate-style-guide/real-estate
  // The file structure is src/routes/generate-style-guide/real-estate/design/...
  // This file is at src/routes/generate-style-guide/+layout.server.ts
  // So relative path from here to real-estate is "./real-estate/..."

  // We need to extract the relative part of the route from the current layout's location.
  // This layout is at root of generate-style-guide.
  // So if route.id is /generate-style-guide/real-estate, the relative part is "real-estate".

  // Let's normalize the routeId to match glob keys.
  // Glob keys start with "./"

  // We can iterate over the glob keys and check if they belong to the current route.
  // But wait, `route.id` gives the ID of the leaf route.
  // If we are at /generate-style-guide/real-estate, route.id is /generate-style-guide/real-estate.
  // We need to find files that are in the `design` folder of that route.

  // Construct the expected prefix for glob matching.
  // If route.id is "/generate-style-guide/real-estate", and this file is in "/generate-style-guide",
  // then we are looking for "./real-estate/design/..."

  // Let's get the current directory name of this file relative to src/routes?
  // Actually, simpler: we know this file is in `src/routes/generate-style-guide`.
  // So we can strip `/generate-style-guide` from `route.id` to get the relative path.

  // Better yet, let's just look for the `design` folder that is a sibling of the leaf route's +page.svelte?
  // Or just use the fact that we organized it as `route/design`.

  // Let's try to match the path.
  // route.id: /generate-style-guide/real-estate
  // glob key: ./real-estate/design/image.jpg (relative to this file)

  // We need to know the base segment of this layout.
  // Since we are hardcoding this in `src/routes/generate-style-guide/+layout.server.ts`,
  // we know the prefix is `/generate-style-guide`.

  const layoutBaseId = '/generate-style-guide';
  let relativeRoute = '';

  if (routeId?.startsWith(layoutBaseId)) {
    relativeRoute = routeId.slice(layoutBaseId.length);
    // relativeRoute is now "/real-estate" or "" (if at root) or "/real-estate/sub"
    if (relativeRoute.startsWith('/')) {
      relativeRoute = relativeRoute.slice(1);
    }
  }

  // If relativeRoute is empty, we might be at the root of generate-style-guide.
  // If it is "real-estate", we look for "./real-estate/design/..."

  const searchPrefix = relativeRoute ? `./${relativeRoute}/design/` : `./design/`;

  // Process images
  for (const [path, url] of Object.entries(imagesGlob)) {
    if (path.startsWith(searchPrefix)) {
      images.push(url as string);
    }
  }

  // Process markdown
  for (const [path, content] of Object.entries(markdownGlob)) {
    if (path.startsWith(searchPrefix)) {
      const fileName = path.split('/').pop()?.toLowerCase();
      if (fileName?.includes('prompt') && fileName.endsWith('.md')) {
        promptContent = await marked.parse(content as string);
      } else if (fileName === 'style-guide.md') {
        styleGuideContent = await marked.parse(content as string);
      }
    }
  }

  return {
    designResources: {
      images,
      prompt: promptContent,
      styleGuide: styleGuideContent
    }
  };
};
