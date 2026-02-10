const config = {
	INS_DESC: 'Pondok Pesantren',
	INS_NAME: 'Syaichona Moh Cholil (Demangan)',
	INS_SHORT: 'Demangan',
	BASE_API: 'https://demangan.idsantri.my.id',
	END_API: '/admin',
	DEV: false,
	PWA_NAME: 'Admin Demangan.id',
	PWA_SHORT_NAME: 'Admin Demangan',
	PWA_DESCRIPTION: 'Aplikasi Demangan (Admin)',
	MENU: {
		sekretariat: {
			alumni: false,
			pulangan: false,
		},
		makhadiyah: {
			mutasi: true,
			quran: false,
		},
		keamanan: {
			izin_pesantren: true,
			indisipliner: false,
		},
		ugt: false,
		setting: {
			appWali: false,
			virtualAccount: false,
		},
	},
};
const menu = config.MENU;
export { menu };
export default config;
