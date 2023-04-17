import supabase from '$lib/utils/supabase'

export async function load({ params }: { params: { id: number } }){
	const { data, error } = await supabase
	.from('amrit-notes')
	.select()
	.eq('id',`${params.id}`)
	.eq('type','post')
	.single()
	if (error) throw new Error(error.message)
	return data
}