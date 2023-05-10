export async function load({ params }: { params: { supes: string } }){
	const post = await import(`../${params.supes}.md`)
	const { title, tags } = post.metadata
	const content = post.default

	return {
		content,
		title,
		tags,
	}
}