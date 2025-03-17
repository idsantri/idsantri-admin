function sumLunas(arrayIuran) {
	if (!arrayIuran || !Array.isArray(arrayIuran)) return 0;
	return arrayIuran.reduce((total, item) => {
		// Check if the item is "lunas" (payment completed)
		if (item.lunas !== null) {
			// Add the nominal value to our running total
			return total + item.nominal;
		}
		// If not "lunas", just return the current total without adding
		return total;
	}, 0); // Start with 0 as initial value
}

function sumNotLunas(arrayIuran) {
	if (!arrayIuran || !Array.isArray(arrayIuran)) return 0;

	return arrayIuran.reduce((total, item) => {
		// Check if the item is "lunas" (payment completed)
		if (item.lunas == null) {
			// Add the nominal value to our running total
			return total + item.nominal;
		}
		// If not "lunas", just return the current total without adding
		return total;
	}, 0); // Start with 0 as initial value
}

function sumNominal(arrayIuran) {
	if (!arrayIuran || !Array.isArray(arrayIuran)) return 0;

	return arrayIuran.reduce((total, item) => total + item.nominal, 0);
}

export { sumLunas, sumNominal, sumNotLunas };
