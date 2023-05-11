import { createClient } from '@supabase/supabase-js'


const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default supabase

export async function formEntries(){
	const { data, error } = await supabase
	.from('form-payment-nitividhana')
	.select()
	.order('id')
	if (error) throw new Error(error.message)
	return data
}

export async function formCount(){
	const { count, error } = await supabase
  .from('form-payment-nitividhana')
  .select('*', { count: 'exact', head: true })
	if (error) throw new Error(error.message)
	return count
}

/*
export const searchWord = async() => {
	loadingStore = true
	showResults = true
	const searchTerm = get(searchStore)
	let results:any = []
	const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.textSearch('title', searchTerm)
		.order('id')
		if (error) throw new Error(error.message)
		results = results.concat(data)
	// @ts-ignore
	resultsStore.set(data)
	loadingStore = false
	input.value = ''
}
*/

export async function MidjourneyImages(imagesLow:any,imagesHigh:any){
	const { data, error } = await supabase
	.from('amrit-gallery')
	.select()
	.range(imagesLow,imagesHigh)
	.order('id', {ascending: false})
	if (error) throw new Error(error.message)
	return data
}

export async function limitedImages(limit:number){
	const { data, error } = await supabase
	.from('amrit-gallery')
	.select()
	.order('id', {ascending: false})
	.limit(limit)
	if (error) throw new Error(error.message)
	return data
}

export async function MidjourneyTagged(tag:any){
	const { data, error } = await supabase
	.from('amrit-gallery')
	.select()
	.eq('tag',tag)
	.order('id', {ascending: false})
	if (error) throw new Error(error.message)
	return data
}

export async function MidjourneyLight(id: any){
	const { data, error } = await supabase
	.from('amrit-gallery')
	.select()
	.eq('id', id)
	if (error) throw new Error(error.message)
	return data
}

export async function formentries(){
		const { data, error } = await supabase
		.from('form-payment-nitividhana')
		.select()
		.order('id')
		if (error) throw new Error(error.message)
		return data
	}


export async function newGPT(indexing:number){
		const { data, error } = await supabase
		.from('amrit-gpt')
		.select()
		.eq('indexing', indexing)
		.order('id')
		if (error) throw new Error(error.message)
		return data		
	}

export async function gptTitles(){
		const { data, error } = await supabase
		.from('vw-gpttitles')
		.select()
		.order('indexing')
		if (error) throw new Error(error.message)
		return data				
	}