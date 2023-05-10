export async function load({ params }: { params: { section: string } }){
	const post = await import(`../${params.section}.md`)
	const { title, tags } = post.metadata
	const content = post.default

	return {
		content,
		title,
		tags,
	}
}