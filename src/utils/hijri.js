import { numbersOnly } from 'src/utils/format-number';
import { isDate } from 'src/utils/format-date';

/**
 * @deprecated
 * @param {*} inputMasehi
 * @param {*} koreksi
 * @returns
 */
function m2h(inputMasehi, koreksi = 0) {
	if (!isDate(inputMasehi)) return;

	const mData = new Date(inputMasehi);
	let mThn = mData.getFullYear();
	let mBln = mData.getMonth() + 1;
	let mTgl = mData.getDate();
	let okt15th1582;
	let hThn;
	let hBln;
	let hTgl;
	let hKabisat;
	let mKabisat;

	mData.setDate(mData.getDate() + koreksi);
	mThn = mData.getFullYear();
	mBln = mData.getMonth() + 1;
	mTgl = mData.getDate();

	if (mThn % 4 === 0) {
		if (mThn % 100 !== 0) {
			if (mThn % 400 === 0) {
				mKabisat = 1;
			} else {
				mKabisat = 0;
			}
		} else {
			mKabisat = 1;
		}
	} else {
		mKabisat = 0;
	}

	if (mBln < 3) {
		mThn -= 1;
		mBln += 12;
	}

	if (mThn > 1582 || (mThn === 1582 && mBln * 31 - (mKabisat === 1 ? 5 : 6) >= 287)) {
		okt15th1582 = 2 - Math.floor(mThn / 100) + Math.floor(Math.floor(mThn / 100) / 4);
	} else {
		okt15th1582 = 0;
	}

	const hasil1 = Math.floor(365.25 * mThn) + Math.floor(30.6001 * (mBln + 1)) + mTgl + okt15th1582 - 428;
	const hasil2 = hasil1 - 227016;
	hThn = Math.round(hasil2 / 354.3671 + 0.5);
	const hasil3 = hasil2 + 1 - Math.floor(hasil2 / 354.3671) * 354.3671;

	if (
		hThn % 30 === 2 ||
		hThn % 30 === 5 ||
		hThn % 30 === 7 ||
		hThn % 30 === 10 ||
		hThn % 30 === 13 ||
		hThn % 30 === 15 ||
		hThn % 30 === 18 ||
		hThn % 30 === 21 ||
		hThn % 30 === 24 ||
		hThn % 30 === 26 ||
		hThn % 30 === 29
	) {
		hKabisat = 1;
	} else {
		hKabisat = 0;
	}
	// console.log("hasil3", hasil3);
	switch (true) {
		case hasil3 <= 30:
			hBln = 1;
			hTgl = Math.round(hasil3 + 0.5);
			break;
		case hasil3 <= 59:
			hBln = 2;
			hTgl = Math.round(hasil3 + 0.5) - 30;
			break;
		case hasil3 <= 89:
			hBln = 3;
			hTgl = Math.round(hasil3 + 0.5) - 59;
			break;
		case hasil3 <= 118:
			hBln = 4;
			hTgl = Math.round(hasil3 + 0.5) - 89;
			break;
		case hasil3 <= 148:
			hBln = 5;
			hTgl = Math.round(hasil3 + 0.5) - 118;
			break;
		case hasil3 <= 177:
			hBln = 6;
			hTgl = Math.round(hasil3 + 0.5) - 148;
			break;
		case hasil3 <= 207:
			hBln = 7;
			hTgl = Math.round(hasil3 + 0.5) - 177;
			break;
		case hasil3 <= 236:
			hBln = 8;
			hTgl = Math.round(hasil3 + 0.5) - 207;
			break;
		case hasil3 <= 266:
			hBln = 9;
			hTgl = Math.round(hasil3 + 0.5) - 236;
			break;
		case hasil3 <= 295:
			hBln = 10;
			hTgl = Math.round(hasil3 + 0.5) - 266;
			break;
		case hasil3 <= 325:
			hBln = 11;
			hTgl = Math.round(hasil3 + 0.5) - 295;
			break;
		default:
			hBln = 12;
			hTgl = Math.round(hasil3 + 0.5) - (325 + hKabisat);
	}

	// case 2023-07-19
	if (hTgl > 30) {
		hTgl = hTgl - 30;
		if (hBln < 12) {
			hBln = hBln + 1;
		} else {
			hBln = 1;
			hThn = hThn + 1;
		}
	}

	if ((hTgl < 1 && hBln < 1) || (hTgl === null && hBln === null)) {
		hTgl = 30;
		hBln = 12;
	}

	// 2007-12-10
	if (hTgl < 1) {
		hTgl = 1;
	}

	return `${hThn.toString().padStart(4, '0')}${hBln.toString().padStart(2, '0')}${hTgl.toString().padStart(2, '0')}`;
}

const listBulanHijri = [
	{ month: 1, name: 'Muharram' },
	{ month: 2, name: 'Shafar' },
	{ month: 3, name: 'Rabiul Awal' },
	{ month: 4, name: 'Rabiul Akhir' },
	{ month: 5, name: 'Jumadal Ula' },
	{ month: 6, name: 'Jumadal Akhirah' },
	{ month: 7, name: 'Rajab' },
	{ month: 8, name: 'Syaban' },
	{ month: 9, name: 'Ramadan' },
	{ month: 10, name: 'Syawal' },
	{ month: 11, name: 'Dzul Qadah' },
	{ month: 12, name: 'Dzul Hijjah' },
];

function getBulanHijri(inputMonth) {
	const monthObject = listBulanHijri.find((obj) => obj.month === parseInt(inputMonth));
	return monthObject ? monthObject.name : '';
}

function bacaHijri(input) {
	if (!input) return '-';
	const cleanInput = numbersOnly(input);

	const dd = String(cleanInput).substring(6, 8);
	const mm = String(cleanInput).substring(4, 6);
	const yy = String(cleanInput).substring(0, 4);
	if (String(cleanInput).length != 8 || dd < 1 || mm < 1 || yy < 1) {
		return 'Format salah!';
	}
	return `${dd} ${getBulanHijri(mm)} ${yy}`;
}

function m2hFormat(input) {
	if (!input) return '-';
	const hijri = m2h(input);
	return hijri.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
}

function m2hBacaHijri(input) {
	if (!input) return '-';
	const hijri = m2h(input);
	return bacaHijri(hijri);
}
/**
 * @param {number} textHijri
 * @returns  yyyy-mm-dd
 */
function formatHijri(textHijri) {
	if (!textHijri || textHijri.length != 8) return '';
	else return textHijri.replace(/(.{4})(.{2})(.{2})/, '$1-$2-$3') || '';
}

/**
 * Konversi tanggal Masehi ke Hijriah
 * @param {Date|string} tanggalMasehi - Tanggal Masehi (objek Date atau string)
 * @param {number} koreksiHari - Koreksi hari untuk menyesuaikan hasil (default: 0)
 * @returns {string} Tanggal Hijri dalam format "YYYYMMDD"
 */
function masehiToHijri(tanggalMasehi, koreksiHari = 0) {
	// Pastikan input adalah objek Date
	const date = tanggalMasehi instanceof Date ? tanggalMasehi : new Date(tanggalMasehi);

	// Validasi tanggal
	if (isNaN(date.getTime())) {
		return '-';
	}

	// Ambil komponen tanggal Masehi
	const tahun = date.getFullYear();
	const bulan = date.getMonth() + 1;
	const hari = date.getDate();

	// Hitung Julian Day Number
	const a = Math.floor((14 - bulan) / 12);
	const y = tahun + 4800 - a;
	const m = bulan + 12 * a - 3;
	let jdn =
		hari +
		Math.floor((153 * m + 2) / 5) +
		365 * y +
		Math.floor(y / 4) -
		Math.floor(y / 100) +
		Math.floor(y / 400) -
		32045;

	// Terapkan koreksi hari
	jdn += koreksiHari;

	// Konversi Julian Day Number ke Hijriah
	let l = jdn - 1948440 + 10632;
	const n = Math.floor((l - 1) / 10631);
	l = l - 10631 * n + 354;
	const j =
		Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) +
		Math.floor(l / 5670) * Math.floor((43 * l) / 15238);
	l =
		l -
		Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
		Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
		29;

	const bulanHijri = Math.floor((24 * l) / 709);
	const hariHijri = l - Math.floor((709 * bulanHijri) / 24);
	const tahunHijri = 30 * n + j - 30;

	// Format ke YYYYMMDD
	const tahunStr = tahunHijri.toString().padStart(4, '0');
	const bulanStr = bulanHijri.toString().padStart(2, '0');
	const hariStr = hariHijri.toString().padStart(2, '0');

	return `${tahunStr}${bulanStr}${hariStr}`;
}
export { m2h, bacaHijri, m2hFormat, m2hBacaHijri, formatHijri, listBulanHijri, masehiToHijri };
