import authStore from 'stores/auth-store';

const getToken = (): string => {
	return authStore().getToken || 'FAIL TO GET TOKEN';
};

export default getToken;
