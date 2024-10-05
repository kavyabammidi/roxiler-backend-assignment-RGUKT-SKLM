import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsStatistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({
    totalSale: 0,
    totalSoldItems: 0,
    totalUnsoldItems: 0,
  });

  useEffect(() => {
    fetchStatistics();
  }, [selectedMonth]);

  const fetchStatistics = async () => {
    const response = await axios.get(`http://localhost:3000/statistics`, {
      params: { month: selectedMonth },
    });
    setStatistics(response.data);
  };

  return (
    <div>
      <h3>Statistics for {selectedMonth}</h3>
      <div>Total Sale: ${statistics.totalSale}</div>
      <div>Total Sold Items: {statistics.totalSoldItems}</div>
      <div>Total Unsold Items: {statistics.totalUnsoldItems}</div>
    </div>
  );
};

export default TransactionsStatistics;
