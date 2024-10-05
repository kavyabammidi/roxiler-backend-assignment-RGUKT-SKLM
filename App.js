import React, { useState } from 'react';
import TransactionsTable from './TransactionsTable';
import TransactionsStatistics from './TransactionsStatistics';
import TransactionsBarChart from './TransactionsBarChart';

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div>
      <h1>Transactions Dashboard</h1>
      <select 
        value={selectedMonth} 
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>

      <TransactionsStatistics selectedMonth={selectedMonth} />
      <TransactionsTable selectedMonth={selectedMonth} />
      <TransactionsBarChart selectedMonth={selectedMonth} />
    </div>
  );
};

export default App;
