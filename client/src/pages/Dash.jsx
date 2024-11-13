import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Registering necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dash() {
  const [sales, setSales] = useState([]);
  const [agencies, setAgencies] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [products, setProducts] = useState([]);
  const [returns, setReturns] = useState([]);

  // Fetch sales data
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await fetch(`/api/reco/getallSale` );
        const data = await res.json();
        if (res.ok) {
          setSales(data.equipment);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchSales();
  }, []);

  // Fetch agencies data
  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const res = await fetch(`/api/reco/getall`);
        const data = await res.json();
        if (res.ok) {
          setAgencies(data.equipment);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAgencies();
  }, []);

  // Fetch employees data
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch(`/api/reco/getAllemployee`);
        const data = await res.json();
        if (res.ok) {
          setEmployees(data.employees);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchEmployees();
  }, []);

  // Fetch products data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/reco/getallProduct`);
        const data = await res.json();
        if (res.ok) {
          setProducts(data.equipment);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProducts();
  }, []);

  //Fetch Returned Product data
  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const res = await fetch(`/api/reco/getallReturn`);
        const data = await res.json();
        if (res.ok) {
          setReturns(data.equipment);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchReturns();
  }, []);

  // Chart data for the first bar chart
  const firstChartData = {
    labels: ['Sales', 'Agencies', 'Employees', 'Products', 'Returns'],
    datasets: [
      {
        label: 'Counts',
        data: [sales.length, agencies.length, employees.length, products.length, returns.length],
        backgroundColor: [
          'rgba(75, 142, 192, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
        borderWidth: 0.5,
      },
    ],
  };

  // Chart data for the second bar chart (placeholder for growth data)
  const secondChartData = {
    labels: ['Sales', 'Agencies', 'Employees', 'Products'],
    datasets: [
      {
        label: 'Growth',
        data: [10, 20, 30, 40], // Example data, replace with actual growth data
        backgroundColor: [
         'rgba(235, 54, 162)',
          'rgba(255, 159, 64, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 205, 86, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart data for the pie chart
  const pieChartData = {
    labels: ['Sales', 'Agencies', 'Employees', 'Products','Returns'],
    datasets: [
      {
        label: 'Distribution',
        data: [sales.length, agencies.length, employees.length, products.length, returns.length],
        backgroundColor: [
          'rgba(75, 142, 192, 0.8)',
          'rgba(255, 99, 132, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#fff',
        },
      },
    },
  };

  return (
    <div className="dashboard-container">
      <style jsx>{`
        .dashboard-container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
          height: 110vh;
          background-color: white;
          padding: 10px;
        }

        .charts-row {
          display: flex;
          justify-content: space-around;
          width: 100%;
          margin-top: 20px;
        }

        .chart-wrapper {
          background-color: #F7FAFA;
          padding: 27px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          width: 31%; /* Adjusted width for pie chart */
          max-width: 500px;
        }

        .header1 {
          text-align: center;
          margin-bottom: 40px;
          color: Black;
        }

        .info {
          text-align: center;
          margin-bottom: 50px;
          font-size: 18px;
          color: #6b6a6a;
        }

        @media (max-width: 600px) {
          .header {
            font-size: 2rem;
          }
          .info {
            font-size: 1rem;
          }
          .chart-wrapper {
            width: 90%; /* Full width on smaller screens */
            margin: 10px 0; /* Margin between charts */
          }
        }
      `}</style>
       
          <div>
          <h1 className="header1 font-bold font-family: 'Arial', sans-serif ml-[420px] text-3xl">Distribution Overview</h1>
          </div>
      
     
      <p className="info font-thin text-lg">
        Welcome to the dashboard! Here you can view a summary of key metrics including sales, agencies, employees, and products. 
        Use this information to gain insights into your operations.
      </p>

      <div className="charts-row">
        <div className="chart-wrapper">
          <h2 className="text-center font-semibold text-xl mb-12">Counts Overview</h2>
          <Bar data={firstChartData} options={options} />
        </div>

        <div className="chart-wrapper">
          <h2 className="text-center font-semibold text-xl mb-12">Growth Overview</h2>
          <Bar data={secondChartData} options={options} />
        </div>

        <div className="chart-wrapper">
          <h2 className="text-center font-semibold text-xl mb-6">Distribution Overview</h2>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
}
