import React from "react";
import { Progress } from "antd";

const Analytics = ({ allTransaction }) => {
  const categories = [
    "salary", "tip", "food", "bills", "project", "shopping", "movie", "medical", "tax", "fee"
  ];

  const totalTransaction = allTransaction.length;
  const totalIncomeTransaction = allTransaction.filter(t => t.type === "income");
  const totalExpenseTransaction = allTransaction.filter(t => t.type === "expense");
  const totalIncomePercent = (totalIncomeTransaction.length / totalTransaction) * 100;
  const totalExpensePercent = (totalExpenseTransaction.length / totalTransaction) * 100;

  const totalTurnover = allTransaction.reduce((acc, t) => acc + t.amount, 0);
  const totalIncomeTurnover = totalIncomeTransaction.reduce((acc, t) => acc + t.amount, 0);
  const totalExpenseTurnover = totalExpenseTransaction.reduce((acc, t) => acc + t.amount, 0);
  const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <div className="container mt-4">
      <div className="row g-3">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white fw-bold">Total Transactions: {totalTransaction}</div>
            <div className="card-body">
              <h5 className="text-success">Income: {totalIncomeTransaction.length}</h5>
              <h5 className="text-danger">Expense: {totalExpenseTransaction.length}</h5>
              <div className="d-flex justify-content-center">
                <Progress type="circle" strokeColor="green" className="mx-2" percent={totalIncomePercent.toFixed(0)} />
                <Progress type="circle" strokeColor="red" className="mx-2" percent={totalExpensePercent.toFixed(0)} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white fw-bold">Total Turnover: {totalTurnover}</div>
            <div className="card-body">
              <h5 className="text-success">Income: {totalIncomeTurnover}</h5>
              <h5 className="text-danger">Expense: {totalExpenseTurnover}</h5>
              <div className="d-flex justify-content-center">
                <Progress type="circle" strokeColor="green" className="mx-2" percent={totalIncomeTurnoverPercent.toFixed(0)} />
                <Progress type="circle" strokeColor="red" className="mx-2" percent={totalExpenseTurnoverPercent.toFixed(0)} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-3 mt-4">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-info text-white fw-bold">Category-wise Income</div>
            <div className="card-body">
              {categories.map(category => {
                const amount = totalIncomeTransaction.filter(t => t.category === category).reduce((acc, t) => acc + t.amount, 0);
                return amount > 0 && (
                  <div className="card mb-2" key={category}>
                    <div className="card-body">
                      <h5>{category}</h5>
                      <Progress percent={((amount / totalIncomeTurnover) * 100).toFixed(0)} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-danger text-white fw-bold">Category-wise Expense</div>
            <div className="card-body">
              {categories.map(category => {
                const amount = totalExpenseTransaction.filter(t => t.category === category).reduce((acc, t) => acc + t.amount, 0);
                return amount > 0 && (
                  <div className="card mb-2" key={category}>
                    <div className="card-body">
                      <h5>{category}</h5>
                      <Progress percent={((amount / totalExpenseTurnover) * 100).toFixed(0)} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
