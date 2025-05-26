import React from 'react';
import { useExpense } from '../contexts/ExpenseContext';
import { FaTrash } from 'react-icons/fa';

const ExpenseList = () => {
  const { expenses, deleteExpense } = useExpense();

  return (
    <div className="expense-list">
      <h2>Recent Expenses</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>{expense.description}</td>
              <td>{expense.category}</td>
              <td>${expense.amount}</td>
              <td>
                <button onClick={() => deleteExpense(expense.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;