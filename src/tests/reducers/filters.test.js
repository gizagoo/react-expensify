import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('Should setup default filter values', () => {
    const state = filtersReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('Should set sortBy to amount', () => {
    const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
    expect(state.sortBy).toBe('amount');
});

test('Should set sortBy to date', () => {
    const state = filtersReducer({
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }, {type: 'SORT_BY_DATE'});
    expect(state.sortBy).toBe('date');
});

test('Should set text filter', () => {
    const state = filtersReducer(undefined, {type: 'SET_TEXT_FILTER', text: 'TestData'});
    expect(state.text).toBe('TestData');
});

test('Should set startDate filter', () => {
    const state = filtersReducer(undefined, {type: 'SET_START_DATE', startDate: moment(0)});
    expect(state.startDate).toEqual(moment(0));
});

test('Should set endDate filter', () => {
    const state = filtersReducer(undefined, {type: 'SET_END_DATE', endDate: moment(1000)});
    expect(state.endDate).toEqual(moment(1000));
});