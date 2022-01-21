import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { grades } from '../assets/selectOptions';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      ticks: {
        color: '#6969b4',
      },
      grid: {
        color: '#161923',
      },
    },
    x: {
      ticks: {
        color: '#6969b4',
      },
      grid: {
        color: '#161923',
      },
    },
  },
};

const labels = grades.map((g) => g.label);

export const AscentChart = (ascentGrades: number[]) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Ascents',
        data: labels.map((_, i) => ascentGrades[i]),
        backgroundColor: '#e9c46a',
      },
    ],
  };
  return <Bar options={options} data={data} height={180} width={340} />;
};
