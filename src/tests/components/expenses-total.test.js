import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('Should return 0 if no expenses', () => {
    const res = selectExpensesTotal([]);
    expect(res).toBe(0);
});

test('Should return total for 1 expense', () => {
    const res = selectExpensesTotal([expenses[0]]);
    expect(res).toBe(195);
});

test('Should return total for expenses', () => {
    const res = selectExpensesTotal(expenses);
    expect(res).toBe(114200);
});
