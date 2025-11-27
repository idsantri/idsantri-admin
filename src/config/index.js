const config = {
	INS_DESC: 'Demo Aplikasi',
	INS_NAME: 'Madrasah dan Pondok Pesantren',
	INS_SHORT: 'Demo Aplikasi',
	BASE_API: 'https://demo.idsantri.my.id',
	END_API: '/admin',
	DEV: true,
	PWA_NAME: 'ID Santri (Admin)',
	PWA_SHORT_NAME: 'Admin IDSantri',
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
		setting: {
			appWali: true,
			virtualAccount: true,
		},
	},
};
const menu = config.MENU;
export { menu };
export default config;
