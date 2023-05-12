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



export async function formentries(){
		const { data, error } = await supabase
		.from('form-payment-nitividhana')
		.select()
		.order('id')
		if (error) throw new Error(error.message)
		return data
	}


export async function newGPT(title:string){
		const { data, error } = await supabase
		.from('amrit-gpt')
		.select()
		.eq('title', title)
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

	export async function gptSveltekit(){
		const { data, error } = await supabase
		.from('amrit-gpttitles')
		.select()
		.eq('theme','sveltekit')
		.order('nextid')
		if (error) throw new Error(error.message)
		return data				
	}

	export async function gptSupabase(){
		const { data, error } = await supabase
		.from('amrit-gpttitles')
		.select()
		.eq('theme','supabase')
		.order('nextid')
		if (error) throw new Error(error.message)
		return data				
	}

	export async function gptAI(){
		const { data, error } = await supabase
		.from('amrit-gpttitles')
		.select()
		.eq('theme','AI')
		.order('nextid')
		if (error) throw new Error(error.message)
		return data				
	}

	export async function gptAnimation(){
		const { data, error } = await supabase
		.from('amrit-gpttitles')
		.select()
		.eq('theme','animation')
		.order('nextid')
		if (error) throw new Error(error.message)
		return data				
	}

	export async function gptWebui(){
		const { data, error } = await supabase
		.from('amrit-gpttitles')
		.select()
		.eq('theme','webui')
		.order('nextid')
		if (error) throw new Error(error.message)
		return data				
	}

	export async function gptDharmastuff(){
		const { data, error } = await supabase
		.from('amrit-gpttitles')
		.select()
		.eq('theme','dharmastuff')
		.order('nextid')
		if (error) throw new Error(error.message)
		return data				
	}

	export async function gptOther(){
		const { data, error } = await supabase
		.from('amrit-gpttitles')
		.select()
		.eq('theme','other')
		.order('nextid')
		if (error) throw new Error(error.message)
		return data				
	}




	export async function fullGallery(){
		const { data, error } = await supabase
		.from('amrit-gallery')
		.select()
		.order('id')
		if ( error ) throw new Error(error.message)
		return data
	}

export async function limitGallery(genre:string){
		const { data, error } = await supabase
		.from('amrit-gallery')
		.select()
		.eq('genre',genre)
		.order('id')
		if ( error ) throw new Error(error.message)
		return data
	}

export async function singleImage(id:number){
		const { data, error } = await supabase
		.from('amrit-gallery')
		.select()
		.eq('id',id)
		if ( error ) throw new Error(error.message)
		return data
	}

