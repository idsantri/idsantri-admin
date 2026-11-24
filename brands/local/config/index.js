const config = {
	BRAND: 'local',
	INS_DESC: 'Demo Aplikasi (Local)',
	INS_NAME: 'Madrasah dan Pondok Pesantren',
	INS_SHORT: 'Demo Aplikasi (Local)',
	BASE_API: 'http://localhost:8000',
	END_API: '/admin',
	DEV: true,
	PWA_NAME: 'ID Santri (Admin)',
	PWA_SHORT_NAME: 'Admin IDSantri',
	PWA_DESCRIPTION: 'Aplikasi ID Santri (Admin)',
	MENU: {
		sekretariat: {
			alumni: true,
			pulangan: true,
			emaal: true,
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
		},
	},
};
const menu = config.MENU;
export { menu };
export default config;
