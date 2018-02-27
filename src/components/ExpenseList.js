import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
    <div>
    {   // If there are no expenses
        props.expenses.length === 0 ? (
            <p>No expenses</p>
        ) : ( // if there are expenses
            props.expenses.map((expense) => {
                return <ExpenseListItem key={expense.id} {...expense}/>;
            })
        )
    }
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
}; 

export default connect(mapStateToProps)(ExpenseList); 
