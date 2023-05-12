import supabase from '$lib/utils/supabase'

export async function load({params}:{params: { post:string }}){
	const { data, error } = await supabase
	.from('amrit-gpttitles')
	.select()
	.eq('indexing',`${params.post}`)
	.eq('theme','dharmastuff')
	.single()
	if (error) throw new Error(error.message)
	return data	
}