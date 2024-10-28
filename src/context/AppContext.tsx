import { createContext, useState } from "react";
import { Expense } from "../types/types";


// Exercise: Create add budget to the context

interface AppContextType {
  budget: number;
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

export const initialState: AppContextType = {
  budget: 0,
  expenses: [],
  setExpenses: () => {},
};

export const AppContext = createContext<AppContextType>(initialState);

export const AppProvider = (props: any) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialState.expenses);

  return (
    <AppContext.Provider
      value={{
        budget: 1000,
        expenses: expenses,
        setExpenses: setExpenses,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};


