// src/App.js
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ExpenseProvider } from './contexts/ExpenseContext';
import { SalaryProvider } from './contexts/SalaryContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Dashboard from './components/Dashboard';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <SalaryProvider>
      <ExpenseProvider>
        <Router>
          {/* Navigation Bar */}
          <nav className="main-nav">
            <div className="nav-links">
              <Link to="/" className="nav-link">Dashboard</Link>
              <Link to="/expenses" className="nav-link">Expenses</Link>
            </div>
            <ThemeToggle />
          </nav>

          {/* Main Content */}
          <div className="app-container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/expenses" element={
                <div className="expense-page">
                  <ExpenseForm />
                  <ExpenseList />
                </div>
              } />
            </Routes>
          </div>
        </Router>
      </ExpenseProvider>
      </SalaryProvider>
    </ThemeProvider>
  );
}

export default App;