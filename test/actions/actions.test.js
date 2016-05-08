'use strict';
import expect from 'expect';
import { LOGIN } from './../../js/constants';
import * as actions from './../../js/actions';

describe('ACTIONS', () => {
    describe('Login', () => {
        it('loginRequest returns action object', () => {
            const action = actions.loginRequest('test@gmail.com', 'test');
            const expected = {
                type: LOGIN.REQUEST,
                payload: {
                    email: 'test@gmail.com',
                    password: 'test'
                }};
            expect(action).toEqual(expected);
        });
        it('loginSuccess returns action object', () => {
            const action = actions.loginSuccess('123abc', 'login success');
            const expected = {
                type: LOGIN.SUCCESS,
                payload: {
                    token: '123abc',
                    message: 'login success'
                }
            };
            expect(action).toEqual(expected);
        });
        it('loginFailure returns action object', () => {
            const action = actions.loginFailure('login error');
            const expected = {
                type: LOGIN.FAILURE,
                payload: {
                    message: 'login error'
                }
            };
            expect(action).toEqual(expected);
        });
        it('logout returns action object', () => {
            const action = actions.logout('logout');
            const expected = {
                type: LOGIN.LOGOUT,
                payload: {
                    message: 'logout'
                }
            };
            expect(action).toEqual(expected);
        });
    });
});
