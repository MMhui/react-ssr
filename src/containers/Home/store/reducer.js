import { GET_HOME_LIST } from './actions-types';

const defaultState = {
	newsList: []
};

export default (state = defaultState, action) => {
	switch(action.type) {
		case GET_HOME_LIST:
			return {
				...state,
				newsList: action.list
			};
		default:
			return state;
	}
};