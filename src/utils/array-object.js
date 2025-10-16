const toArray = (value) => {
	let result = [];
	if (Array.isArray(value)) result = value;
	else if (typeof value === 'object')
		result = Object.keys(value).map((key) => value[key]);
	else result.push(value);
	return result;
};
function getObjectById(arr, id) {
	// Periksa apakah array merupakan Proxy
	const dataArr = Array.isArray(arr) ? arr : arr.value;
	return dataArr.find((obj) => obj.id === id);
}
const isPrimitiveArray = (arr) =>
	Array.isArray(arr) && arr.every((item) => typeof item !== 'object');

/**
 * @deprecated
 * @param {*} message
 * @returns
 */
function buildTextError(message) {
	let result = '';
	if (isPrimitiveArray(message)) {
		result =
			'<ul style="padding:0; padding-left:8px; min-width:250px;max-width:400px">';
		result += message.map((msg) => `<li>${msg}</li>`).join('');
		result += '</ul>';
	} else {
		result = message;
	}
	return result;
}

function deleteById(arr, id) {
	// Cari index dari objek dengan id yang sesuai
	const index = arr.findIndex((item) => item.id == id);

	// Jika objek ditemukan, hapus dari array
	if (index !== -1) {
		arr.splice(index, 1);
	}

	// Kembalikan array yang sudah diubah
	return arr;
}

function replaceById(arr, id, newObj) {
	// Cari index dari objek dengan id yang sesuai
	const index = arr.findIndex((item) => item.id === id);

	// Jika objek ditemukan, ganti dengan objek baru
	if (index !== -1) {
		arr[index] = newObj;
	}

	// Kembalikan array yang sudah diubah
	return arr;
}
export {
	toArray,
	getObjectById,
	isPrimitiveArray,
	buildTextError,
	deleteById,
	replaceById,
};
