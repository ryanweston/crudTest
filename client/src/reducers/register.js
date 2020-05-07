import {
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    GET_USER,
    LOGOUT_USER
} from '../actions/types';

//Fetches token to mainatain session, store.js deals with issue of having no token and will check 
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: {}
};

export default function (state = initialState, actions) {
    const { type, payload } = actions;

    switch (type) {
        case REGISTER_FAILURE:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            }
        case REGISTER_SUCCESS:
            console.log(payload.token);
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: false,
                loading: true,
            }
        case LOGIN_FAILURE:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            }
        case GET_USER:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                //Handle email server side, privacy issues with email us in state when using google anayltics userID tracking
                user: {
                    id: payload._id,
                    name: payload.name,
                }
            }

        case LOGOUT_USER:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: {}
            }
        default:
            return state;
    }
}