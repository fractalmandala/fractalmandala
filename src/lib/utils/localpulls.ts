import supabase from '$lib/utils/supabase'

export async function allWebdev(){
	const allfiles = import.meta.glob('/src/routes/webdev/*.md')
	const filed = Object.entries(allfiles)
	const eachfiled = await Promise.all(
		filed.map(async([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				linkpath: postPath,
			}
		})
	)
	return eachfiled
}

export async function allWritings(){
	const allfiles = import.meta.glob('/src/routes/writings/*.md')
	const filed = Object.entries(allfiles)
	const eachfiled = await Promise.all(
		filed.map(async([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				linkpath: postPath,
			}
		})
	)
	return eachfiled
}



export async function filteredWebdev(type:string){
	const allfiles = import.meta.glob('/src/routes/webdev/*.md')
	const filed = Object.entries(allfiles)
	const eachfiled = await Promise.all(
		filed.map(async([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				linkpath: postPath,
			}
		})
	)
	const filteredFiled = eachfiled.filter((post ) => post.meta.type === type)
	return filteredFiled
	
}

export async function filteredWritings(type:string){
	const allfiles = import.meta.glob('/src/routes/writings/*.md')
	const filed = Object.entries(allfiles)
	const eachfiled = await Promise.all(
		filed.map(async([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				linkpath: postPath,
			}
		})
	)
	const filteredFiled = eachfiled.filter((post ) => post.meta.type === type)
	return filteredFiled
	
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
			}
		})
	)
	return eachfiled
}

export async function allMusic(){
	const allfiles = import.meta.glob('/src/routes/music/*.md')
	const filed = Object.entries(allfiles)
	const eachfiled = await Promise.all(
		filed.map(async([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				linkpath: postPath,
			}
		})
	)
	return eachfiled
}

export async function entireProject(){
	const writes = await allWritings();
	const webs = await allWebdev();
	const mands = allVideos();
	
	const entireItems = [
		...writes,
		...webs,
		...mands,
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

export async function featuredWebdev() {
	const allPostFiles = import.meta.glob('/src/routes/webdev/*.md')
	const iterablePostFiles = Object.entries(allPostFiles)
	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				linkpath: postPath,
			}
		})
	)
	// @ts-ignore
	const featuredPosts = allPosts.filter((post) => post.meta.featured === true)
	return featuredPosts
} 


export async function featuredWritings() {
	const allPostFiles = import.meta.glob('/src/routes/writings/*.md')
	const iterablePostFiles = Object.entries(allPostFiles)
	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			// @ts-ignore
			const { metadata } = await resolver()
			const postPath = path.slice(11,-3)
			return {
				meta: metadata,
				linkpath: postPath,
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
	const featWebs = await featuredWebdev();
	const featWrit = await featuredWritings();
	const featVid = await featuredVideos();
	
	const featureItems = [
		...featWebs,
		...featWrit,
		...featVid,
	];
	
	return featureItems.map(post => ({
		heading: post.meta.title,
		url: post.linkpath,
		tag: post.meta.tags,
		cat: post.meta.type
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