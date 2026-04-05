import { create } from "zustand";
import { initialTransactions } from "../data/transactions";
export type Transaction = {
  id: number;
  date: string;
  amount: number;
  category: string;
  type: "income" | "expense";
};

type Store = {
  role: "viewer" | "admin";
  transactions: Transaction[];

  search: string;
  filter: "all" | "income" | "expense";
  dateFrom: string;
  dateTo: string;
  category: string;

  setCategory: (value: string) => void;

  setRole: (role: "viewer" | "admin") => void;
  addTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: number) => void;

  setSearch: (v: string) => void;
  setFilter: (v: "all" | "income" | "expense") => void;
  setDateFrom: (v: string) => void;
  setDateTo: (v: string) => void;
  updateTransaction: (updatedTx: Transaction) => void;

};

export const useStore = create<Store>((set) => ({
  role: "viewer",

  search: "",
  filter: "all",
  dateFrom: "",
  dateTo: "",
  category: "all",

  transactions: initialTransactions,

  setRole: (role) => set({ role }),

  addTransaction: (tx) =>
    set((state) => ({
      transactions: [...state.transactions, { ...tx, id: Date.now() }],
    })),

  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
  updateTransaction: (updatedTx) =>
  set((state) => ({
    transactions: state.transactions.map((t) =>
      t.id === updatedTx.id ? updatedTx : t
    ),
  })),

  setSearch: (v) => set({ search: v }),
  setFilter: (v) => set({ filter: v }),
  setDateFrom: (v) => set({ dateFrom: v }),
  setDateTo: (v) => set({ dateTo: v }),
  setCategory: (value) => set({ category: value }),
}));