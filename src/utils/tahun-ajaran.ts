/**
 * @param dateHijri string | number
 * @returns string
 */

function hijriToThAjaranH(dateHijri: string | number): string {
	const dateHijriStr = typeof dateHijri === 'number' ? String(dateHijri) : dateHijri;
	const bulan = dateHijriStr.slice(4, 6);
	const tahun = dateHijriStr.slice(0, 4);
	let tahun1: number;
	let tahun2: number;

	if (dateHijriStr.length !== 8 || !/^\d+$/.test(dateHijriStr) || +bulan === 0 || +tahun === 0 || +bulan > 12) {
		return '';
	}

	if (+bulan <= 8) {
		tahun1 = +tahun - 1;
		tahun2 = +tahun;
	} else {
		tahun1 = +tahun;
		tahun2 = +tahun + 1;
	}

	return `${tahun1}-${tahun2}`;
}

export { hijriToThAjaranH };
