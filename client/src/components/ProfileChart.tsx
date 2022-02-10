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
      position: 'top' as const,

      labels: { color: '#dedeeb', font: { size: 15 } },
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

interface Props {
  ascentGrades: number[];
  problemGrades: number[];
}
export const ProfileChart = ({ ascentGrades, problemGrades }: Props) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Ascents',
        fontColor: '#dedeeb',
        data: labels.map((_, i) => ascentGrades[i]),
        backgroundColor: '#e9c46a',
      },
      {
        label: 'Creations',
        data: labels.map((_, i) => problemGrades[i]),
        backgroundColor: '#e76f51',
      },
    ],
  };
  return <Bar options={options} data={data} height='190px' />;
};
