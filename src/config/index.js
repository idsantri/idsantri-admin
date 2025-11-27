const config = {
	INS_DESC: 'Pondok Pesantren',
	INS_NAME: 'Syaichona Moh Cholil',
	INS_SHORT: 'Syaichona',
	BASE_API: 'https://syaichona.idsantri.my.id',
	END_API: '/admin',
	DEV: false,
	PWA_NAME: 'Admin Syaichona.id',
	PWA_SHORT_NAME: 'Admin Syaichona',
	PWA_DESCRIPTION: 'Aplikasi Syaichona (Admin)',
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
		setting: {
			appWali: true,
			virtualAccount: true,
		},
	},
};
const menu = config.MENU;
export { menu };
export default config;
