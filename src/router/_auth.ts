import type { Component } from 'vue';

export default [
	{
		path: '/logout',
		name: 'Logout',
		component: (): Component => import('../pages/auth/LogoutPage.vue'),
		meta: { title: 'Logout' },
	},
	{
		path: 'verify',
		name: 'Verify',
		component: (): Component => import('../pages/auth/VerifyPage.vue'),
		meta: { title: 'Verifikasi Email' },
	},
	{
		path: 'register',
		name: 'Register',
		component: (): Component => import('../pages/auth/RegisterPage.vue'),
		meta: { title: 'Registrasi' },
	},
	{
		path: 'login',
		name: 'Login',
		component: (): Component => import('../pages/auth/LoginPage.vue'),
		meta: { title: 'Login' },
	},
	{
		path: 'forgot-password',
		name: 'Forgot',
		component: (): Component => import('../pages/auth/ForgotPage.vue'),
		meta: { title: 'Lupa Password' },
	},
	{
		path: 'reset-password',
		name: 'Reset',
		component: (): Component => import('../pages/auth/ResetPage.vue'),
		meta: { title: 'Ganti Password' },
	},
];
