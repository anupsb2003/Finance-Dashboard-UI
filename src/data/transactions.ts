import type { Transaction } from "../store/useStore";

export const initialTransactions: Transaction[] = [
  { id: 1, date: "2026-01-05", amount: 5000, category: "Salary", type: "income" },
  { id: 2, date: "2026-01-10", amount: 300, category: "Food", type: "expense" },

  { id: 3, date: "2026-02-03", amount: 15000, category: "Freelance", type: "income" },
  { id: 4, date: "2026-02-11", amount: 800, category: "Transport", type: "expense" },

  { id: 5, date: "2026-03-01", amount: 4000, category: "Salary", type: "income" },
  { id: 6, date: "2026-03-15", amount: 1200, category: "Shopping", type: "expense" },

  { id: 7, date: "2026-04-01", amount: 6000, category: "Salary", type: "income" },
  { id: 8, date: "2026-04-12", amount: 900, category: "Food", type: "expense" },

  { id: 9, date: "2026-05-05", amount: 7000, category: "Salary", type: "income" },
  { id: 10, date: "2026-05-20", amount: 1500, category: "Shopping", type: "expense" },

  { id: 11, date: "2026-06-02", amount: 8000, category: "Salary", type: "income" },
  { id: 12, date: "2026-06-18", amount: 2000, category: "Rent", type: "expense" },

  { id: 13, date: "2026-07-01", amount: 9000, category: "Salary", type: "income" },
  { id: 14, date: "2026-07-14", amount: 1200, category: "Food", type: "expense" },

  { id: 15, date: "2026-08-03", amount: 8500, category: "Salary", type: "income" },
  { id: 16, date: "2026-08-22", amount: 1300, category: "Transport", type: "expense" },

  { id: 17, date: "2026-09-05", amount: 9500, category: "Salary", type: "income" },
  { id: 18, date: "2026-09-25", amount: 1800, category: "Shopping", type: "expense" },

  { id: 19, date: "2026-10-01", amount: 10000, category: "Salary", type: "income" },
  { id: 20, date: "2026-10-10", amount: 2200, category: "Rent", type: "expense" },

  { id: 21, date: "2026-11-04", amount: 11000, category: "Salary", type: "income" },
  { id: 22, date: "2026-11-15", amount: 2500, category: "Food", type: "expense" },

  { id: 23, date: "2026-12-01", amount: 12000, category: "Salary", type: "income" },
  { id: 24, date: "2026-12-20", amount: 3000, category: "Shopping", type: "expense" },
];