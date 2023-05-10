export async function load({ params }: { params: { javs: string } }){
	const post = await import(`../${params.javs}.md`)
	const { title, tags } = post.metadata
	const content = post.default

	return {
		content,
		title,
		tags,
	}
}