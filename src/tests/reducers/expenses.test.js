import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('Should set default state', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

test('Should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('Should not remove expense for non-id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('Should add an expense to the array', () => {
    const newItem = {
        id: '4',
        description: 'New Expense',
        note: '',
        amount: 999,
        createdAt: 0
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense: newItem
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([
        ...expenses,
        newItem
        ]
    );
});

test('Should edit an expense item', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: { amount: 1234 }
    }
    const state = expensesReducer(expenses, action);
    expect(state[1].amount).toBe(1234);
});

test('Should not edit non-id expense item', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-2',
        updates: { amount: 199 }
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});
