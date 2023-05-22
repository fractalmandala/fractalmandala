export async function load({ params }: { params: { post: string } }){
	const post = await import(`../${params.post}.md`)
	const { title, videoid, about, slug, featured, type, tag } = post.metadata
	const content = post.default

	return {
		content,
		title,
		videoid,
		about,
		slug,
		type,
		tag,
		featured
	}
}