import authReducer from '../../reducers/auth';

test('Should set uid on login', () => {
    const action = {
        type: 'LOGIN',
        uid: 'abc123'
    };
    const state = authReducer( {} , action);
    expect(state.uid).toBe(action.uid);
});

test('Should clear uid on login', () => {
    const action = {
        type: 'LOGOUT'
    };
    const state = authReducer({ uid: 'anyuid' }, action);
    expect(state).toEqual({});
});
