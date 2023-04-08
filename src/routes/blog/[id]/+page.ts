import supabase from '$lib/utils/supabase'

export async function load({ params }: { params: { id: number } }){
	const { data, error } = await supabase
	.from('amrit-notes')
	.select()
	.eq('type','quillnote')
	.eq('id',`${params.id}`)
	.single()
	if (error) throw new Error(error.message)
	return data
}