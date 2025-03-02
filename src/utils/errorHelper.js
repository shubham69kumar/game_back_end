export async function generateInternalServerErrorRepsonse(e, fName = '') {
	console.log(e);
	return { status: 500, message: 'Unexpected error occurred' };
}
export function generateBadRequestResponse(e, message) {
	return { status: 400, message: message };
}
export function sendErrorHttpResponse(response, e) {
	response.status(e.status).json({ message: e.message });
}
