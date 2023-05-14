import supabase from '$lib/utils/supabase'

export async function load({params}:{params: { slug:string }}){
	const { data, error } = await supabase
	.from('amrit-gallery')
	.select()
	.eq('slug',`${params.slug}`)
	.single()
	if (error) throw new Error(error.message)
	return data	
}