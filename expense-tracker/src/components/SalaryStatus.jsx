import { useState } from 'react';
import { useSalary } from '../contexts/SalaryContext';

const SalaryStatus = () => {
  const { userStatus, setUserStatus, salary, setSalary } = useSalary();
  const [localSalary, setLocalSalary] = useState(salary);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSalary(localSalary);
  };

  return (
    <div className="salary-status">
      <h3>Financial Profile</h3>
      <select 
        value={userStatus}
        onChange={(e) => setUserStatus(e.target.value)}
      >
        <option value="student">Student</option>
        <option value="working">Working Professional</option>
      </select>

      {userStatus === 'working' && (
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={localSalary}
            onChange={(e) => setLocalSalary(e.target.value)}
            placeholder="Monthly Salary"
          />
          <button type="submit">Update Salary</button>
        </form>
      )}
    </div>
  );
};

export default SalaryStatus;