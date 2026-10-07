// src/boot/register-sw.js
import { Dialog } from 'quasar';

export default () => {
	if (import.meta.env.QUASAR_PROD && 'serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js').then((registration) => {
			registration.addEventListener('updatefound', () => {
				const newWorker = registration.installing;
				if (newWorker) {
					newWorker.addEventListener('statechange', () => {
						if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
							console.log('Service worker baru tersedia');
							showUpdatePrompt();
						}
					});
				}
			});
		});

		navigator.serviceWorker.addEventListener('controllerchange', () => {
			console.log('Service worker baru aktif');
		});
	}

	function showUpdatePrompt() {
		Dialog.create({
			title: 'Update tersedia',
			message: 'Versi baru tersedia. Muat ulang sekarang?',
			cancel: true,
			persistent: true,
		}).onOk(() => {
			window.location.reload();
		});
	}
};
