import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('Should set up remove expense action', () => {
    const action = removeExpense( { id: 'Abc123' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'Abc123'
    });
});

test('Should set up edit expense action', () => {

    const action = editExpense('Abc123', { note: 'Update note value'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: 'Abc123',
        updates: {
            note: 'Update note value'
        }
    });
});

test('Should set up add expense action with values', () => {
    const expenseData = {
        description: 'Gas Bill',
        note: 'Paid on time',
        amount: 5021,
        createdAt: 1234567
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    })
});

test('Should set up add expense action with values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            description: '',
            note: '',
            amount: 0,
            createdAt: expect.any(Number),
            id: expect.any(String)
        }
    })
});