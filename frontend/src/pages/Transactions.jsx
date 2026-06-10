import { useEffect, useState } from "react";
import API from "../services/api";

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTransactions(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch transactions");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-semibold mb-8">
        Transaction History
      </h1>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-4">Type</th>
              <th className="text-left p-4">Amount</th>
              <th className="text-left p-4">Description</th>
              <th className="text-left p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-6 text-gray-500"
                >
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr
                  key={transaction._id}
                  className="border-t"
                >
                  <td className="p-4 capitalize">
                    {transaction.type}
                  </td>

                  <td className="p-4">
                    ₹ {transaction.amount}
                  </td>

                  <td className="p-4">
                    {transaction.description}
                  </td>

                  <td className="p-4">
                    {new Date(transaction.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;