import { useExpense } from '../contexts/ExpenseContext';
import { useSalary } from '../contexts/SalaryContext';

const getQuote = (percentage) => {
  const quotes = [
    { range: [0, 30], text: "Great job! You're saving well! 💰", emoji: "🎉" },
    { range: [31, 50], text: "Good control! Keep tracking! 👀", emoji: "👍" },
    { range: [51, 75], text: "Watch spending! Needs attention! ⚠️", emoji: "⚠️" },
    { range: [76, 100], text: "Danger zone! Reduce expenses! 🔥", emoji: "🚨" },
    { range: [101, Infinity], text: "Over budget! Emergency cuts needed! 🆘", emoji: "💸" }
  ];

  const matched = quotes.find(q => percentage >= q.range[0] && percentage <= q.range[1]);
  return matched || { text: "Start tracking to see your status!", emoji: "📊" };
};

const ExpenseQuote = () => {
  const { expenses } = useExpense();
  const { userStatus, salary, expensePercentage } = useSalary();
  
  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const percentage = expensePercentage(totalExpenses);

  const { text, emoji } = getQuote(percentage);

  return (
    <div className="expense-quote">
      {userStatus === 'working' && salary > 0 ? (
        <>
          <h4>Financial Health: {percentage}% of salary spent</h4>
          <div className="quote-box">
            <span className="emoji">{emoji}</span>
            <p>{text}</p>
          </div>
        </>
      ) : (
        <p>Track expenses as {userStatus} 📚</p>
      )}
    </div>
  );
};

export default ExpenseQuote;