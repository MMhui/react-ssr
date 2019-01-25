import { CHANGE_LOGIN_STATE } from './actions-types';

const changeLogin = (login) => ({
	type: CHANGE_LOGIN_STATE,
	login
});

export const getLoginState = () => {
	
	return (dispatch, getState, axiosInstance) => {
		return axiosInstance.get('/api/isLogin.json').then(res => {
			dispatch(changeLogin(res.data.data.login));
		});
	};
};

export const login = () => {
	
	return (dispatch, getState, axiosInstance) => {
		return axiosInstance.get('/api/login.json').then(res => {
			dispatch(changeLogin(true));
		});
	};
};

export const logout = () => {
	
	return (dispatch, getState, axiosInstance) => {
		return axiosInstance.get('/api/logout.json').then(res => {
			dispatch(changeLogin(false));
		});
	};
};