import type { Ref } from 'vue';

/**
 * Converts Vue ref data to FormData, combining with existing form element data
 * @param eTarget - The form element from submit event
 * @param refInput - Vue ref object containing form data
 * @returns FormData object with combined data
 */
function refToFormData<T extends Record<string, unknown>>(
	eTarget: HTMLFormElement,
	refInput: Ref<T>,
): FormData {
	const form = new FormData(eTarget);

	Object.keys(refInput.value).forEach((key) => {
		const value = refInput.value[key];

		if (value != null) {
			// Handle different types of values appropriately
			if (value instanceof File) {
				// Handle files
				form.append(key, value);
			} else if (typeof value === 'object' && !(value instanceof Date)) {
				// Convert objects to JSON strings
				form.append(key, JSON.stringify(value));
			} else if (value instanceof Date) {
				// Convert dates to ISO strings
				form.append(key, value.toISOString());
			} else if (typeof value === 'string') {
				// Handle strings, including input type 'date'
				const inputElement = eTarget.elements.namedItem(
					key,
				) as HTMLInputElement | null;
				if (inputElement?.type === 'date') {
					// Convert date strings to ISO format
					const date = new Date(value);
					if (!isNaN(date.getTime())) {
						form.append(key, date.toISOString());
					} else {
						form.append(key, value);
					}
				} else {
					// For other strings, append as-is
					form.append(key, value);
				}
			} else {
				// Fallback for other types (e.g., null, undefined, etc.)
				form.append(key, String(value as string));
			}
		}
	});

	// Debugging: Uncomment to log the FormData entries
	// console.log([...form]);
	return form;
}
export { refToFormData };
