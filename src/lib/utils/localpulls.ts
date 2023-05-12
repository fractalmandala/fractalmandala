import supabase from '$lib/utils/supabase'

export async function themeSveltekit(){
	const allfiles = import.meta.glob('/src/routes/sveltekit/*.md')
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
	const allfiles = import.meta.glob('/src/routes/supabase/*.md')
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
	const allfiles = import.meta.glob('/src/routes/javascript/*.md')
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
	const allfiles = import.meta.glob('/src/routes/webui/*.md')
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
	const allfiles = import.meta.glob('/src/routes/writings/archival/*.md')
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

export async function archivalHistory(){
	const allfiles = import.meta.glob('/src/routes/writings/history/*.md')
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

export async function archivalMandala(){
	const allfiles = import.meta.glob('/src/routes/writings/mandala/*.md')
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
	const hists = await archivalHistory();
	const mands = await archivalMandala();
	
	const entireItems = [
		...themeSvelte,
		...themeSupa,
		...themeJava,
		...themeGene,
		...archs,
		...hists,
		...mands
	];
	
	return entireItems.map(post => ({
		heading: post.meta.title,
		url: post.linkpath
	}));
}

export async function gptCombiner(){
		const { data, error } = await supabase
		.from('amrit-gpttitles')
		.select()
		.order('nextid')
		if (error) throw new Error(error.message)
		return data.map(item => ({
			heading: item.title,
			url: `/gpt/${item.theme}/${item.indexing}`
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