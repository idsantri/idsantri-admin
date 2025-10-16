import axios from 'axios';
import { notifyError } from 'src/utils/notify';

const isPrimitiveArray = (
	arr: unknown,
): arr is (string | number | boolean | bigint | symbol | null | undefined)[] =>
	Array.isArray(arr) && arr.every((item) => typeof item !== 'object');

function buildTextError(message: unknown): string {
	let result = '';
	if (isPrimitiveArray(message)) {
		result =
			'<ul style="padding:0; padding-left:8px; min-width:250px;max-width:400px">';
		result += message.map((msg) => `<li>${String(msg)}</li>`).join('');
		result += '</ul>';
	} else {
		result = String(message);
	}
	return result;
}

function apiError(error: unknown): void {
	// Check for axios.AxiosError type
	if (axios.isAxiosError(error)) {
		if (error.response) {
			const message = error.response.data?.message;
			if (message) {
				notifyError(buildTextError(message));
			} else {
				console.log(
					`Response error during ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
					error,
				);
			}
		} else {
			// Handle general error, e.g., network error
			console.error(
				`General error during ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
				error,
			);
		}
	} else {
		// Handle unexpected error types
		console.error('Unexpected error: ', error);
	}
}
export default apiError;
