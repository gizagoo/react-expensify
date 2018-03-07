import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

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

    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});


test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',     
        createdAt: 1000
    };
    store.dispatch(startAddExpense(expenseData))
    .then(() => {
        const actions = store.getActions();     // get the actions from the mock store
        expect(actions[0]).toEqual({            // This is what the only actions should have been
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        // Now get the expense that should have been written to firebase
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then ((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('Should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const defaultData = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0  
    };
    store.dispatch(startAddExpense({}))
    .then(() => {
        const actions = store.getActions();     // get the actions from the mock store
        expect(actions[0]).toEqual({            // This is what the only actions should have been
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...defaultData
            }
        });
        // Now get the expense that should have been written to firebase
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then ((snapshot) => {
        expect(snapshot.val()).toEqual(defaultData);
        done();
    });
});


// test('Should set up add expense action with values', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: expect.any(Number),
//             id: expect.any(String)
//         }
//     })
// });