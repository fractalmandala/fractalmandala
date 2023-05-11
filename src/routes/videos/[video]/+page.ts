export async function load({ params }: { params: { video: string } }){
	const post = await import(`../${params.video}.md`)
	const { title, videoid, about, slug } = post.metadata
	const content = post.default

	return {
		content,
		title,
		videoid,
		about,
		slug
	}
}