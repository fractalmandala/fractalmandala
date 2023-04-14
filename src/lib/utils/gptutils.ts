export function respondToClient(response: any) {
	return new Response(JSON.stringify(response), {
		status: 200,
		headers: {
			'content-type': 'application/json'
		}
	});
}