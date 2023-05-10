export async function load({ params }: { params: { sveltes: string } }){
	const post = await import(`../${params.sveltes}.md`)
	const { title, tags } = post.metadata
	const content = post.default

	return {
		content,
		title,
		tags,
	}
}