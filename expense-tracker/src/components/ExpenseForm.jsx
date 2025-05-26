import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useExpense } from '../contexts/ExpenseContext';

const ExpenseForm = () => {
  const { addExpense, categories } = useExpense();
  const [formData, setFormData] = useState({
    amount: '',
    category: categories[0],
    date: new Date(),
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(formData);
    setFormData({ ...formData, amount: '', description: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <div className="form-group">
        <input
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          placeholder="Amount"
          required
        />
      </div>
      
      <div className="form-group">
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <DatePicker
          selected={formData.date}
          onChange={(date) => setFormData({ ...formData, date })}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Description"
        />
      </div>

      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;