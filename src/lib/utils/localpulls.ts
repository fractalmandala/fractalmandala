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

