export async function load({ params }: { params: { gens: string } }){
	const post = await import(`../${params.gens}.md`)
	const { title, tags } = post.metadata
	const content = post.default

	return {
		content,
		title,
		tags,
	}
}