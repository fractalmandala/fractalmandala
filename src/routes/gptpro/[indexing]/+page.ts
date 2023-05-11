import supabase from '$lib/utils/supabase'

export async function load({params}:{params: { indexing:number }}){
	const { data, error } = await supabase
	.from('vw-gpttitles')
	.select()
	.eq('indexing',`${params.indexing}`)
	.single()
	if (error) throw new Error(error.message)
	return data	
}