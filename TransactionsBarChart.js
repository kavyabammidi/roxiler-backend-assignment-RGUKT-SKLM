import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const TransactionsBarChart = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetchChartData();
  }, [selectedMonth]);

  const fetchChartData = async () => {
    const response = await axios.get(`http://localhost:3000/chart`, {
      params: { month: selectedMonth },
    });

    const data = response.data;
    setChartData({
      labels: ['0-100', '100-500', '500-1000', '1000+'],
      datasets: [
        {
          label: 'Number of Items',
          data: data,
          backgroundColor: ['rgba(75, 192, 192, 0.6)'],
        },
      ],
    });
  };

  return (
    <div>
      <h3>Price Range Chart for {selectedMonth}</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default TransactionsBarChart;
