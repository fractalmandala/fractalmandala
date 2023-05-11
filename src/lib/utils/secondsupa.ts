import { createClient } from '@supabase/supabase-js'


const supabase = createClient(
  import.meta.env.VITE_SECOND_SUPAURL,
  import.meta.env.VITE_SECOND_SUPAKEY
)

export default supabase

export async function getBucket(){
	const { data, error } = await supabase
	.storage
	.from('images')
	.list('batch1', {
		limit: 500,
		offset: 0,
		sortBy: { column: 'name', order: 'asc'},	
	})
	if (error) throw new Error(error.message)
	return data
}