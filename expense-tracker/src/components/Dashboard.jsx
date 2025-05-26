// src/components/Dashboard.jsx
import React from 'react';
import { useExpense } from '../contexts/ExpenseContext';
import { useTheme } from '../contexts/ThemeContext';
import { Pie, Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import SalaryStatus from './SalaryStatus';
import ExpenseQuote from './ExpenseQuote';
import CountUp from 'react-countup';

const Dashboard = () => {
  const { expenses, categories } = useExpense();
  const { theme } = useTheme();
  const textColor = theme === 'dark' ? '#ffffff' : '#1a1a1a';

  // Calculate totals
  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const currentMonth = new Date().getMonth();

  // Common chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: textColor, padding: 20, font: { size: 14 } }
      },
      tooltip: {
        bodyColor: textColor,
        titleColor: textColor,
        backgroundColor: theme === 'dark' ? '#2d2d2d' : '#ffffff',
        borderColor: theme === 'dark' ? '#404040' : '#e0e0e0',
        borderWidth: 1
      }
    }
  };

  // 1. Category Distribution Pie Chart
  const pieData = {
    labels: categories,
    datasets: [{
      data: categories.map(cat => 
        expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0)
      ),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
    }]
  };

  // 2. Monthly Trend Line Chart
  const monthlyData = Array(12).fill(0).map((_, month) => ({
    month: new Date(2024, month).toLocaleString('default', { month: 'short' }),
    total: expenses.filter(e => new Date(e.date).getMonth() === month)
                 .reduce((sum, e) => sum + e.amount, 0)
  }));

  const lineData = {
    labels: monthlyData.map(d => d.month),
    datasets: [{
      label: 'Monthly Spending',
      data: monthlyData.map(d => d.total),
      borderColor: '#4CAF50',
      tension: 0.4
    }]
  };

  // 3. Category Comparison Bar Chart
  const barData = {
    labels: categories,
    datasets: [{
      label: 'Current Month',
      data: categories.map(cat => 
        expenses.filter(e => e.category === cat && 
               new Date(e.date).getMonth() === currentMonth).reduce((sum, e) => sum + e.amount, 0)
      ),
      backgroundColor: '#36A2EB'
    }, {
      label: 'Previous Month',
      data: categories.map(cat => 
        expenses.filter(e => e.category === cat && 
               new Date(e.date).getMonth() === currentMonth - 1).reduce((sum, e) => sum + e.amount, 0)
      ),
      backgroundColor: '#FFCE56'
    }]
  };

  return (
    <div className="dashboard">
      {/* Top Section - Profile & Summary */}
      <div className="profile-summary-container">
        <div className="profile-card">
          <SalaryStatus />
        </div>

        <div className="summary-card main-summary">
          <h3>Total Expenses</h3>
          <p>
            $<CountUp 
              end={totalExpenses}
              duration={1.5}
              decimals={2}
              separator=","
            />
          </p>
          <div className="summary-subtext">
            {categories.length} active categories
          </div>
        </div>
      </div>

      {/* Middle Section - Charts Grid */}
      <div className="chart-grid">
        <div className="chart-card">
          <h3>Category Distribution</h3>
          <div className="chart-container">
            <Pie data={pieData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <h3>Monthly Trends</h3>
          <div className="chart-container">
            <Line data={lineData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <h3>Monthly Comparison</h3>
          <div className="chart-container">
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Bottom Section - Insights */}
      <div className="status-quote">
        <ExpenseQuote />
      </div>
    </div>
  );
};

export default Dashboard;