import { Dialog } from 'quasar';
import { register } from 'register-service-worker';
import releases from 'src/config/releases';

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

function showUpdatePrompt(): void {
	Dialog.create({
		title: `Update`,
		message: `Versi baru aplikasi sudah tersedia. Muat ulang sekarang untuk memperbarui? <br/><small>v${releases[0]?.ver}</small>`,
		cancel: true,
		persistent: true,
		html: true,
	}).onOk(() => {
		window.location.reload();
	});
}

register(import.meta.env.QUASAR_SERVICE_WORKER_FILE, {
	// The registrationOptions object will be passed as the second argument
	// to ServiceWorkerContainer.register()
	// https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

	// registrationOptions: { scope: './' },

	ready(/* registration */) {
		// console.log('Service worker is active.')
	},

	registered(/* registration */) {
		// console.log('Service worker has been registered.')
	},

	cached(/* registration */) {
		// console.log('Content has been cached for offline use.')
	},

	updatefound(/* registration */) {
		// console.log('New content is downloading.')
	},

	updated(/* registration */) {
		console.log('New content is available; please refresh.');
		showUpdatePrompt();
	},

	offline() {
		// console.log('No internet connection found. App is running in offline mode.')
	},

	error(/* err */) {
		// console.error('Error during service worker registration:', err)
	},
});
