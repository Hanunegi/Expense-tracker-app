import { useExpense } from '../contexts/ExpenseContext';
import { Pie, Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useTheme } from '../contexts/ThemeContext';

const DashboardCharts = () => {
  const { expenses, categories } = useExpense();
  const { theme } = useTheme();
  const textColor = theme === 'dark' ? '#ffffff' : '#1a1a1a';

  // Common chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: textColor }
      },
      tooltip: {
        bodyColor: textColor,
        titleColor: textColor,
        backgroundColor: theme === 'dark' ? '#2d2d2d' : '#ffffff'
      }
    }
  };

  // 1. Category Distribution Pie Chart
  const pieData = {
    labels: categories,
    datasets: [{
      label: 'Spending',
      data: categories.map(cat => 
        expenses.filter(e => e.category === cat)
               .reduce((sum, e) => sum + e.amount, 0)
      ),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'
      ]
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
  const currentMonth = new Date().getMonth();
  const barData = {
    labels: categories,
    datasets: [{
      label: 'Current Month',
      data: categories.map(cat => 
        expenses.filter(e => e.category === cat && 
               new Date(e.date).getMonth() === currentMonth)
               .reduce((sum, e) => sum + e.amount, 0)
      ),
      backgroundColor: '#36A2EB'
    },
    {
      label: 'Previous Month',
      data: categories.map(cat => 
        expenses.filter(e => e.category === cat && 
               new Date(e.date).getMonth() === currentMonth - 1)
               .reduce((sum, e) => sum + e.amount, 0)
      ),
      backgroundColor: '#FFCE56'
    }]
  };

  return (
    <div className="chart-grid">
      <div className="chart-card">
        <h3>Spending by Category</h3>
        <div className="chart-container">
          <Pie data={pieData} options={chartOptions} />
        </div>
      </div>

      <div className="chart-card">
        <h3>Monthly Trend</h3>
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
  );
};

export default DashboardCharts;