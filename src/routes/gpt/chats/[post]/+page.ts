import supabase from '$lib/utils/supabase'

export async function load({params}:{params: { post:any }}){
	const { data, error } = await supabase
	.from('amrit-gpt')
	.select()
	.eq('id',`${params.post}`)
	.single()
	if (error) throw new Error(error.message)
	return data	
}