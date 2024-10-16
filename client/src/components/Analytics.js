import React from "react";
import { Progress } from "antd";

const Analytics = ({ allTransaction }) => {
  // Categories
  const categories = [
    "salary",
    "tip",
    "food",
    "bills",
    "project",
    "shopping",
    "movie",
    "medical",
    "tax",
    "fee",
  ];

  // Total transactions
  const totalTransaction = allTransaction.length;
  const totalIncomeTransaction = allTransaction.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransaction = allTransaction.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransaction.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransaction.length / totalTransaction) * 100;

  // Total turnover
  const totalTurnover = allTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransaction
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = allTransaction
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <>
      <div className="row m-3">
        {/* Total Transactions */}
        <div className="col-md-4">
          <div className="card h-100" style={{ minHeight: "250px" }}>
            <div className="card-header fw-bold">Total Transactions: {totalTransaction}</div>
            <div className="card-body">
              <h5 className="text-success">Income: {totalIncomeTransaction.length}</h5>
              <h5 className="text-danger">Expense: {totalExpenseTransaction.length}</h5>

              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomePercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpensePercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Total Turnover */}
        <div className="col-md-4">
          <div className="card h-100" style={{ minHeight: "250px" }}>
            <div className="card-header fw-bold">Total Turnover: {totalTurnover}</div>
            <div className="card-body">
              <h5 className="text-success">Income: {totalIncomeTurnover}</h5>
              <h5 className="text-danger">Expense: {totalExpenseTurnover}</h5>

              <div>
                <Progress
                  type="circle"
                  strokeColor={"green"}
                  className="mx-2"
                  percent={totalIncomeTurnoverPercent.toFixed(0)}
                />
                <Progress
                  type="circle"
                  strokeColor={"red"}
                  className="mx-2"
                  percent={totalExpenseTurnoverPercent.toFixed(0)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row m-3">
        {/* Category-wise Income */}
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-header fw-bold">Category-wise Income</div>
            <div className="card-body">
              {categories.map((category) => {
                const amount = allTransaction
                  .filter(
                    (transaction) =>
                      transaction.type === "income" &&
                      transaction.category === category
                  )
                  .reduce((acc, transaction) => acc + transaction.amount, 0);
                return (
                  amount > 0 && (
                    <div className="card mb-2" key={category} style={{ minHeight: "100px" }}>
                      <div className="card-body">
                        <h5>{category}</h5>
                        <Progress
                          percent={(
                            (amount / totalIncomeTurnover) *
                            100
                          ).toFixed(0)}
                        />
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>

        {/* Category-wise Expense */}
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-header fw-bold">Category-wise Expense</div>
            <div className="card-body">
              {categories.map((category) => {
                const amount = allTransaction
                  .filter(
                    (transaction) =>
                      transaction.type === "expense" &&
                      transaction.category === category
                  )
                  .reduce((acc, transaction) => acc + transaction.amount, 0);
                return (
                  amount > 0 && (
                    <div className="card mb-2" key={category} style={{ minHeight: "100px" }}>
                      <div className="card-body">
                        <h5>{category}</h5>
                        <Progress
                          percent={(
                            (amount / totalExpenseTurnover) *
                            100
                          ).toFixed(0)}
                        />
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
