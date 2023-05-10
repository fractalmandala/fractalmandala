import supabase from '$lib/utils/supabase'

export async function themeSveltekit(){
	const allfiles = import.meta.glob('/src/routes/themes/webdev/sveltekit/*.md')
	const filed = Object.entries(allfiles)
	const eachfiled = await Promise.all(
		filed.map(async([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				linkpath: postPath
			}
		})
	)
	return eachfiled
}

export async function themeSupabase(){
	const allfiles = import.meta.glob('/src/routes/themes/webdev/supabase/*.md')
	const filed = Object.entries(allfiles)
	const eachfiled = await Promise.all(
		filed.map(async([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				linkpath: postPath
			}
		})
	)
	return eachfiled
}

export async function themeJavascript(){
	const allfiles = import.meta.glob('/src/routes/themes/webdev/javascript/*.md')
	const filed = Object.entries(allfiles)
	const eachfiled = await Promise.all(
		filed.map(async([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				linkpath: postPath
			}
		})
	)
	return eachfiled
}

export async function themeGeneral(){
	const allfiles = import.meta.glob('/src/routes/themes/webdev/general/*.md')
	const filed = Object.entries(allfiles)
	const eachfiled = await Promise.all(
		filed.map(async([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				linkpath: postPath
			}
		})
	)
	return eachfiled
}

export async function manuscript(){
	const allfiles = import.meta.glob('/src/routes/manuscript/*.md')
	const filed = Object.entries(allfiles)
	const eachfiled = await Promise.all(
		filed.map(async([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				linkpath: postPath
			}
		})
	)
	return eachfiled
}

// all md docs inside route docs
export async function allDocs() {
	const allPostFiles = import.meta.glob('/src/routes/mandala/docs/*.md')
	const iterablePostFiles = Object.entries(allPostFiles)
	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				path: postPath,
			}
		})
	)
	// @ts-ignore
	return allPosts
}

export async function docCodes() {
	const allPostFiles = import.meta.glob('/src/routes/mandala/docs/*.md')
	const iterablePostFiles = Object.entries(allPostFiles)
	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				path: postPath,
			}
		})
	)
	// @ts-ignore
	const featuredPosts = allPosts.filter((post) => post.meta.type === "code")
	return featuredPosts
}

export async function docDocs() {
	const allPostFiles = import.meta.glob('/src/routes/mandala/docs/*.md')
	const iterablePostFiles = Object.entries(allPostFiles)
	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata, default: content } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				path: postPath,
				content,
			}
		})
	)
	// @ts-ignore
	const featuredPosts = allPosts.filter((post) => post.meta.type === "documentation")
	return featuredPosts
}

export async function selectedTag(selecttag:any) {
	const allPostFiles = import.meta.glob('/src/routes/mandala/docs/*.md')
	const iterablePostFiles = Object.entries(allPostFiles)
	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				path: postPath,
			}
		})
	)

  if (selecttag === '') {
    return allPosts;
  }
	// @ts-ignore
  const filteredposts = allPosts.filter((post) => post.meta.tags.includes(selecttag))
  return filteredposts;
}

export async function allMandalas() {
	const allPostFiles = import.meta.glob('/src/routes/blog/*.md')
	const iterablePostFiles = Object.entries(allPostFiles)
	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				path: postPath,
			}
		})
	)
	// @ts-ignore
	return allPosts
}

export async function singlePost(postTitle:any) {
	const allPostFiles = import.meta.glob('/src/routes/blog/*.md')
	const iterablePostFiles = Object.entries(allPostFiles)
	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				path: postPath,
			}
		})
	)
	// @ts-ignore
	const filteredpost = allPosts.filter((post) => post.meta.title.includes(postTitle))
	return filteredpost
}

export async function limitMandalas() {
	const allPostFiles = import.meta.glob('/src/routes/mandala/*.md')
	const iterablePostFiles = Object.entries(allPostFiles)
	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				path: postPath,
			}
		})
	)
	// @ts-ignore
	return allPosts.slice(0, 4)	
}

export async function limitDocs() {
	const allPostFiles = import.meta.glob('/src/routes/mandala/docs/*.md')
	const iterablePostFiles = Object.entries(allPostFiles)
	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				path: postPath,
			}
		})
	)
	// @ts-ignore
	return allPosts.slice(0, 4)	
}