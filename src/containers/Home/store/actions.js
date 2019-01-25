import { GET_HOME_LIST } from './actions-types';

const changeList = (list) => ({
	type: GET_HOME_LIST,
	list
});

export const getHomeList = () => {
	
	return (dispatch, getState, axiosInstance) => {
		return axiosInstance.get('/api/news.json').then(res => {
			const list = res.data.data;
			dispatch(changeList(list));
		});
	};
};