import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(() => {
    const localData = localStorage.getItem('expenses');
    return localData ? JSON.parse(localData) : [];
  });

  const [categories] = useState([
    'Food',
    'Transport',
    'Housing',
    'Entertainment',
    'Utilities'
  ]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([{ id: uuidv4(), ...expense }, ...expenses]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, categories }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => useContext(ExpenseContext);