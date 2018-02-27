import React from 'react';
import { shallow } from 'enzyme';
import ExpenseListItem from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';
 
test('Should render ExpenseListitem with expenses', () => {
    const expense = expenses[1];
    const wrapper = shallow(<ExpenseListItem ExpenseListItem key={expense.id} {...expense} />);
    expect(wrapper).toMatchSnapshot();
});
