import { CHANGE_LOGIN_STATE } from './actions-types';

const defaultState = {
	login: false
};

export default (state = defaultState, action) => {
	switch(action.type) {
		case CHANGE_LOGIN_STATE:
			return {
				...state,
				login: action.login
			};
		default:
			return state;
	}
};