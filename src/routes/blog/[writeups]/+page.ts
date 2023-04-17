export async function load({ params }: { params: { writeups: string } }){
	const post = await import(`../${params.writeups}.md`)
	const { title, type, tags } = post.metadata
	const content = post.default

	return {
		content,
		title,
		type,
		tags
	}
}