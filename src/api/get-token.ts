import authStore from 'stores/auth-store';

const getToken = (): string => {
	return authStore().token || 'FAIL TO GET TOKEN';
};

export default getToken;
