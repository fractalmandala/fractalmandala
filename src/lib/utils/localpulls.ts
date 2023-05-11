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

export async function archivalWritings(){
	const allfiles = import.meta.glob('/src/routes/archival/writings/*.md')
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

export async function allVideos(){
	const allfiles = import.meta.glob('/src/routes/videos/*.md')
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

export async function entireProject(){
	const themeSvelte = await themeSveltekit();
	const themeSupa = await themeSupabase();
	const themeJava = await themeJavascript();
	const themeGene = await themeGeneral();
	const archs = await archivalWritings();
	
	const entireItems = [
		...themeSvelte,
		...themeSupa,
		...themeJava,
		...themeGene,
		...archs
	];
	
	return entireItems.map(post => ({
		heading: post.meta.title,
		tags: post.meta.tags,
		url: post.linkpath
	}));
}

export async function gptCombiner(){
		const { data, error } = await supabase
		.from('vw-gpttitles')
		.select()
		.order('indexing')
		if (error) throw new Error(error.message)
		return data.map(item => ({
			heading: item.title,
			url: `/gptpro/${item.indexing}`
		}));			
	}

export async function combinedProject() {
    const projos = await entireProject();
    const gptItems = await gptCombiner();
    
    const entireItems = [
        ...projos,
        ...gptItems
    ];
    
    return entireItems.map(post => ({
        heading: post.heading,
        url: post.url
    }));
}