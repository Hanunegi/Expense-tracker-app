import { createContext, useContext, useState, useEffect } from 'react';

const SalaryContext = createContext();

export const SalaryProvider = ({ children }) => {
  const [userStatus, setUserStatus] = useState(() => {
    const saved = localStorage.getItem('salaryData');
    return saved ? JSON.parse(saved).status : 'student';
  });
  
  const [salary, setSalary] = useState(() => {
    const saved = localStorage.getItem('salaryData');
    return saved ? JSON.parse(saved).salary : 0;
  });

  useEffect(() => {
    localStorage.setItem('salaryData', JSON.stringify({ status: userStatus, salary }));
  }, [userStatus, salary]);

  const expensePercentage = (totalExpenses) => {
    if(userStatus === 'student' || salary === 0) return 0;
    return ((totalExpenses / salary) * 100).toFixed(2);
  };

  return (
    <SalaryContext.Provider value={{ userStatus, setUserStatus, salary, setSalary, expensePercentage }}>
      {children}
    </SalaryContext.Provider>
  );
};

export const useSalary = () => useContext(SalaryContext);