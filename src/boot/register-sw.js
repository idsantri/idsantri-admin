import { notifyConfirm } from 'src/utils/notify';

// src/boot/register-sw.js
export default () => {
	if (import.meta.env.QUASAR_PROD && 'serviceWorker' in navigator) {
		navigator.serviceWorker.register('/sw.js').then((registration) => {
			registration.addEventListener('updatefound', () => {
				const newWorker = registration.installing;
				if (newWorker) {
					newWorker.addEventListener('statechange', async () => {
						if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
							await showUpdatePrompt();
						}
					});
				}
			});
		});

		navigator.serviceWorker.addEventListener('controllerchange', () => {
			console.log('Service worker baru aktif');
		});
	}

	async function showUpdatePrompt() {
		const isConfirmed = await notifyConfirm('Update tersedia. Muat ulang sekarang?', false, 'Update');
		if (isConfirmed) {
			window.location.reload();
		}

		// import { Dialog } from 'quasar';
		// Dialog.create({
		// 	title: 'Update tersedia',
		// 	message: 'Versi baru tersedia. Muat ulang sekarang?',
		// 	cancel: true,
		// 	persistent: true,
		// }).onOk(() => {
		// 	window.location.reload();
		// });
	}
};
