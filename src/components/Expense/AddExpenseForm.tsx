import React, { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext"


const AddExpenseForm = () => {
  // Exercise: Consume the AppContext here
    const expenses= useContext(AppContext);
  // Exercise: Create name and cost to state variables
  
  const initialExpense = {
    id: "",
    name: "",
    cost: 0,
  };

  const [createExpense,setCreateExpense] = useState(initialExpense);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("name: ", createExpense.name);
    console.log("cost: ", createExpense.cost);
    expenses.setExpenses([createExpense, ...expenses.expenses]);
    setCreateExpense(initialExpense);
  

    // Exercise: Add add new expense to expenses context array
  };

  return (
    <form onSubmit={(event) => onSubmit(event)}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            placeholder="Expense"
            required
            type="text"
            className="form-control"
            id="name"
            onChange={(event) => setCreateExpense({...createExpense, name: event.target.value})}
          ></input>
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            placeholder="0"
            required
            type="number"
            className="form-control"
            id="cost"
            onChange={(event) => setCreateExpense({...createExpense, cost: event.target.valueAsNumber})}
          ></input>
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
