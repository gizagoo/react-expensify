
import uuid from 'uuid';
import database from '../firebase/firebase';

// ADD_EXPENSE
  export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
  });

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {  // Return this function
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0      
    } = expenseData;  // Use expenseData or the defaults above
    const expense = { description, note, amount, createdAt }; // Object to pass to firebase
      // Return so that we can chain promises when testing
      return database.ref('expenses').push(expense).then( (ref) => { // Push to firebase to get id
      dispatch(addExpense({ // When done update redux with object including generated id (key)
        id: ref.key,          // Key from firebase
        ...expense            // plus - Spread this object
      })); 
    });
  };
};
  
  // REMOVE_EXPENSE
  export const removeExpense = ({ id } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
  });
  
  // EDIT_EXPENSE
  export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
  });
  
  