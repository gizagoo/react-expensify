import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

test('Should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('Should render ExpenseForm with Data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>);
    expect(wrapper).toMatchSnapshot();
});

test('Should render error for invalid form submit', () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('form').simulate('submit', { 
        preventDefault: () => {}
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
});

test('Should set description on input change', () => {
    const value = 'New Description';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', { 
        target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
});

test('Should set note on input change', () => {
    const value = 'New Note';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change', { 
        target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
});

test('Should set amount on valid change', () => {
    const value = '12.95';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', { 
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(value);
});

test('Should not set amount on invalid change', () => {
    const value = '15.999';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', { 
        target: { value }
    });
    expect(wrapper.state('amount')).toBe('');
});

test('Should submit with correct object', () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
    wrapper.find('form').simulate('submit', { 
        preventDefault: () => {}
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenCalledWith({
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });
});

test('should set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('Should set calendar focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused});
    expect(wrapper.state('calendarFocused')).toBe(focused);
});