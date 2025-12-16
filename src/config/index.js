const config = {
	INS_DESC: 'Demo Lokal',
	INS_NAME: 'Pondok Pesantren',
	INS_SHORT: 'Demo Aplikasi (lokal)',
	BASE_API: 'http://localhost:8000',
	END_API: '/admin',
	DEV: true,
	PWA_NAME: 'ID Santri (Admin)',
	PWA_SHORT_NAME: 'ID Santri',
	PWA_DESCRIPTION: 'Aplikasi ID Santri (Admin)',
	MENU: {
		sekretariat: {
			alumni: true,
		},
		makhadiyah: {
			mutasi: true,
			quran: true,
		},
		keamanan: {
			izin_pesantren: true,
			indisipliner: true,
		},
		ugt: true,
		apb: true,
		setting: {
			appWali: true,
			virtualAccount: true,
		},
	},
};
const menu = config.MENU;
export { menu };
export default config;
