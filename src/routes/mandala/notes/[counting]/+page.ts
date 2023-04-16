import supabase from '$lib/utils/supabase'

export async function load({ params }: { params: { counting: number } }){
	const { data, error } = await supabase
	.from('amrit-notes')
	.select()
	.eq('counting',`${params.counting}`)
	.neq('type','code')
	.single()
	if (error) throw new Error(error.message)
	return data
}