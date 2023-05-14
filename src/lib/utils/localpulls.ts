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
				linkpath: postPath,
				type: 'Sveltekit'
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
				linkpath: postPath,
				type: 'Supabase'
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
				linkpath: postPath,
				type: 'Javascript'
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
				linkpath: postPath,
				type: 'Web UI'
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
				linkpath: postPath,
				type: 'Writings'
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
				linkpath: postPath,
				type: 'Writings'
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
				linkpath: postPath,
				type: 'Writings'
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
				linkpath: postPath,
				type: 'Video'
			}
		})
	)
	return eachfiled
}

export async function allTest(){
	const allfiles = import.meta.glob('/src/routes/gpt/svelte/*.md')
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
		url: post.linkpath,
		cat: post.meta.tags,
		type: post.type
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
			url: `/gpt/${item.theme}/${item.indexing}`,
			cat: item.theme,
			type: 'GPT'
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
        url: post.url,
				cat: post.cat,
				type: post.type
    }));
}

export async function featuredSveltekit() {
	const allPostFiles = import.meta.glob('/src/routes/sveltekit/*.md')
	const iterablePostFiles = Object.entries(allPostFiles)
	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				linkpath: postPath,
				type: 'Sveltekit'
			}
		})
	)
	// @ts-ignore
	const featuredPosts = allPosts.filter((post) => post.meta.featured === true)
	return featuredPosts
} 

export async function featuredSupabase() {
	const allPostFiles = import.meta.glob('/src/routes/supabase/*.md')
	const iterablePostFiles = Object.entries(allPostFiles)
	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				linkpath: postPath,
				type: 'Supabase'
			}
		})
	)
	// @ts-ignore
	const featuredPosts = allPosts.filter((post) => post.meta.featured === true)
	return featuredPosts
} 

export async function featuredWebui() {
	const allPostFiles = import.meta.glob('/src/routes/webui/*.md')
	const iterablePostFiles = Object.entries(allPostFiles)
	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				linkpath: postPath,
				type: 'Web UI'
			}
		})
	)
	// @ts-ignore
	const featuredPosts = allPosts.filter((post) => post.meta.featured === true)
	return featuredPosts
} 

export async function featuredJavascript() {
	const allPostFiles = import.meta.glob('/src/routes/javascript/*.md')
	const iterablePostFiles = Object.entries(allPostFiles)
	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				linkpath: postPath,
				type: 'Javascript'
			}
		})
	)
	// @ts-ignore
	const featuredPosts = allPosts.filter((post) => post.meta.featured === true)
	return featuredPosts
} 

export async function featuredMandala() {
	const allPostFiles = import.meta.glob('/src/routes/writings/mandala/*.md')
	const iterablePostFiles = Object.entries(allPostFiles)
	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				linkpath: postPath,
				type: 'Fractal Maṇḍala'
			}
		})
	)
	// @ts-ignore
	const featuredPosts = allPosts.filter((post) => post.meta.featured === true)
	return featuredPosts
} 

export async function featuredArchival() {
	const allPostFiles = import.meta.glob('/src/routes/writings/archival/*.md')
	const iterablePostFiles = Object.entries(allPostFiles)
	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				linkpath: postPath,
				type: 'Writings'
			}
		})
	)
	// @ts-ignore
	const featuredPosts = allPosts.filter((post) => post.meta.featured === true)
	return featuredPosts
} 

export async function featuredHistory() {
	const allPostFiles = import.meta.glob('/src/routes/writings/history/*.md')
	const iterablePostFiles = Object.entries(allPostFiles)
	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				linkpath: postPath,
				type: 'Writings'
			}
		})
	)
	// @ts-ignore
	const featuredPosts = allPosts.filter((post) => post.meta.featured === true)
	return featuredPosts
} 

export async function featuredVideos() {
	const allPostFiles = import.meta.glob('/src/routes/videos/*.md')
	const iterablePostFiles = Object.entries(allPostFiles)
	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				linkpath: postPath,
				type: 'Video'
			}
		})
	)
	// @ts-ignore
	const featuredPosts = allPosts.filter((post) => post.meta.featured === true)
	return featuredPosts
} 

export async function featuredAll(){
	const featSvelte = await featuredSveltekit();
	const featSupa = await featuredSupabase();
	const featJava = await featuredJavascript();
	const featWebui = await featuredWebui();
	const featArch = await featuredArchival();
	const featHist = await featuredHistory();
	const featMand = await featuredMandala();
	const featVid = await featuredVideos();
	
	const featureItems = [
		...featSvelte,
		...featSupa,
		...featJava,
		...featWebui,
		...featArch,
		...featHist,
		...featMand,
		...featVid
	];
	
	return featureItems.map(post => ({
		heading: post.meta.title,
		url: post.linkpath,
		tag: post.meta.tags,
		cat: post.type
	}));
}


export async function designLibrary(){
	const allfiles = import.meta.glob('/src/routes/build/designlibrary/*.md')
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