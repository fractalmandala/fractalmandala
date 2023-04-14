export async function load({ params }: { params: { doc: string } }){
	const post = await import(`../${params.doc}.md`)
	const { title, type, tags } = post.metadata
	const content = post.default

	return {
		content,
		title,
		type,
		tags
	}
}