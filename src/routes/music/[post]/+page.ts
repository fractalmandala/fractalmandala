export async function load({ params }: { params: { video: string } }){
	const post = await import(`../${params.video}.md`)
	const { title, featured, type, tag, soundcloudLink } = post.metadata
	const content = post.default

	return {
		content,
		title,
		type,
		tag,
		featured,
		soundcloudLink
	}
}