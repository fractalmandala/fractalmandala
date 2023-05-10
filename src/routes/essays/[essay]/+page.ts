export async function load({ params }: { params: { essay: string } }){
	const post = await import(`../${params.essay}.md`)
	const { title, image } = post.metadata
	const content = post.default

	return {
		content,
		title,
		image,
	}
}