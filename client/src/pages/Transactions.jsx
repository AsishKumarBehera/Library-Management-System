import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Transaction.css"; // Import the CSS file for styling

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    description: "",
    amount: "",
    status: "Pending",
  });

  // Fetch transactions on component mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("/api/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/transactions", newTransaction);
      setTransactions((prev) => [...prev, response.data]); // Update the transaction list
      setNewTransaction({ date: "", description: "", amount: "", status: "Pending" }); // Clear the form
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <div className="transaction-container">
      <form className="transaction-form" onSubmit={handleSubmit}>
        <h2>Add Transaction</h2>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={newTransaction.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={newTransaction.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={newTransaction.amount}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={newTransaction.status}
            onChange={handleInputChange}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
        <button type="submit">Add Transaction</button>
      </form>

      <div className="transaction-list">
        <h2>Transaction List</h2>
        {transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction._id}>
                <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
                <p>Description: {transaction.description}</p>
                <p>Amount: ${transaction.amount}</p>
                <p>Status: {transaction.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Transactions;
