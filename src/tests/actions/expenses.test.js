import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
    startAddExpense,
    addExpense, 
    editExpense,
    startEditExpense,
    removeExpense,
    setExpenses,
    startSetExpenses,
    startRemoveExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';
import expensesReducer from '../../reducers/expenses';

const createMockStore = configureMockStore([thunk]);

beforeEach( (done) => {
    const expensesData = {};
    expenses.forEach( ( {id, description, amount, createdAt, note}) => {
        expensesData[id] = { description, amount, createdAt, note};
    });
    database.ref('expenses').set(expensesData).then( () => done());
});

test('Should set up remove expense action', () => {
    const action = removeExpense( { id: 'Abc123' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: 'Abc123'
    });
});

test('Should remove expense from firebase', (done) => {
    const store = createMockStore({});
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense({id})).then (() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return database.ref(`expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
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

test('Should edit expense from firebase', (done) => {
    const store = createMockStore({});
    const id = expenses[0].id;
    const updates = {amount: 54321 };
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        return database.ref(`expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
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

test('Should set up expense action with values', () => {

    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('Should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [expenses[1]]
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[1]]);
});

test('Should get expenses from Firebase', (done) => {
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});