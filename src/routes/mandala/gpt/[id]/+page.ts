import supabase from '$lib/utils/supabase'

export async function load({ params }: { params: { id: number } }){
	const { data, error } = await supabase
	.from('amrit-chatswithgpt')
	.select()
	.eq('id',`${params.id}`)
	.single()
	if (error) throw new Error(error.message)
	return data
}