import axios from 'axios';
import { returnErrors } from './messages';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
} from './types';

export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    axios
        .get('/profile', tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: USER_LOADED,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data), err.response.status);
            dispatch({
                type: AUTH_ERROR,
            });
        });
};

export const login = (username, password) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ username, password });

    axios
        .post('/auth/login', body, config)
        .then((res) => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err && err.response && err.response.data), err && err.response &&  err.response.status);
            dispatch({
                type: LOGIN_FAILED,
            });
        });
};

export const logout = () => (dispatch, getState) => {
    axios
        .post('/api/auth/logout/', null, tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: LOGOUT_SUCCESS,
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data), err.response.status);
        });
};

export const tokenConfig = (getState) => {
    const token = getState().auth.token;

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
};

export const register = ({ username, password, email }) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const body = JSON.stringify({ username, password, email });

    axios
        .post('/users/register', body, config)
        .then((res) => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data), err.response.status);
            dispatch({
                type: REGISTER_FAILED,
            });
        });
};
