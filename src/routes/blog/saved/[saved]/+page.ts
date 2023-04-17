export async function load({ params }: { params: { saved: string } }){
	const post = await import(`../${params.saved}.md`)
	const { title, type, tags } = post.metadata
	const content = post.default

	return {
		content,
		title,
		type,
		tags
	}
}