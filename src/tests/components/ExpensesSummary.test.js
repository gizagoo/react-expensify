import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('Should correctly render ExpensesSummary with 1 expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={235} />);
    expect(wrapper).toMatchSnapshot();
});

test('Should correctly render ExpensesSummary with many or 0 expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={23} expensesTotal={654321} />);
    expect(wrapper).toMatchSnapshot();
});