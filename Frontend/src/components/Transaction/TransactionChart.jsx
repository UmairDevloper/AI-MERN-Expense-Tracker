import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { listTransactionAPI } from "../../services/Transactions/transactionService";
ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = () => {
  //? fetching transactions
  const { data, isError, error, isSuccess, isPending, refetch } = useQuery({
    queryFn: listTransactionAPI,
    queryKey: ["list-transactions"],
  });

  //? total of all data
  const totals = data?.reduce(
    (acc, transactions) => {
      if (transactions?.type === "Income") {
        acc.Income += transactions.amount;
      } else {
        acc.Expense += transactions.amount;
      }
      return acc;
    },
    {
      Income: 0,
      Expense: 0,
    }
  );

  console.log(totals);
  

  const data1 = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Transactions",
        data: [totals?.Income, totals?.Expense],
        backgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: ["#36A2EB", "#FF6384"],
        borderWith: 1,
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 25,
          boxWidth: 12,
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Income vs Expense",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    cutout: "70%",
  };

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <h1 className="text-2xl font-bold text-center mb-6">
        Transaction Overview
      </h1>
      <div style={{ height: "350px" }}>
        < Doughnut  data={data1} options={options} />
      </div>
    </div>
  );
};

export default TransactionChart;
