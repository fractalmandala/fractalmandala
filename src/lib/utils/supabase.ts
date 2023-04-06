import { createClient } from '@supabase/supabase-js'


const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default supabase

export const allCodes = async() => {
	const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.eq('type','code')
		.order('id',{ascending: false})
		if (error) throw new Error(error.message)
	return data
}

export const allGenerals = async() => {
	const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.eq('type','general')
		.order('id',{ascending: false})
		if (error) throw new Error(error.message)
	return data
}

export const TagsFiltered = async(tags: any) => {
	const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.textSearch('fts',tags)
		.order('id',{ascending: false})
		if (error) throw new Error(error.message)
	return data
}

export const LangFiltered = async(lang: any) => {
	const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.eq('lang',lang)
		.order('id',{ascending: false})
		if (error) throw new Error(error.message)
	return data
}


export const CodesFiltered = async(code: any) => {
	const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.eq('type',code)
		.order('id',{ascending: false})
		if (error) throw new Error(error.message)
	return data
}

export const CodeSQL = async() => {
	const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.eq('type','code')
		.eq('lang','sql')
		.order('id',{ascending: false})
		if (error) throw new Error(error.message)
	return data
}

export const CodeCSS = async() => {
	const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.eq('type','code')
		.or('lang.eq.css,lang.eq.sass')
		.order('id',{ascending: false})
		if (error) throw new Error(error.message)
	return data
}

export const CodeJS = async() => {
	const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.eq('type','code')
		.eq('lang','javascript')
		.order('id',{ascending: false})
		if (error) throw new Error(error.message)
	return data
}

export const CodeHTML = async() => {
	const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.eq('type','code')
		.eq('lang','html')
		.order('id',{ascending: false})
		if (error) throw new Error(error.message)
	return data
}

export async function allOthers()  {
	const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.or('type.eq.general,type.eq.bookmark,type.eq.task')
		.order('id',{ascending: false})
		if (error) throw new Error(error.message)
	return data
}

export async function allNotes() {
	const { data, error } = await supabase
		.from('amrit-notes')
		.select()
		.order('id',{ascending: false})
		if (error) throw new Error(error.message)
	return data
}


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


export async function editData(title: any,lang: any,note: any,codesnippet: any,type: any,tags: any,url: any){
	try {
		const { error } = await supabase
		.from('amrit-notes')
		.insert({
				title: title,
				type: type,
				lang: lang,
				note: note,
				codesnippet: codesnippet,
				tags: tags,
				url: url
		})
		if (error) throw new Error(error.message) 
	} finally {
			alert('submitted')
		}
}

export async function editTitle(id: any,title: any){
	try {
		const { error } = await supabase
		.from('amrit-notes')
		.update({
				title: title
		})
		.eq('id',id)
		if (error) throw new Error(error.message) 
	} finally {
		}
}

export async function MidjourneyImages(){
	const { data, error } = await supabase
	.from('amrit-gallery')
	.select()
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