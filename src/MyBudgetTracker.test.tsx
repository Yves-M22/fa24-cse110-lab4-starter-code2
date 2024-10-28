import { render, screen, fireEvent } from "@testing-library/react";
import App from './App';

describe("Expense Creation", () => {
    test("Creates an Expense", () => {
      render(<App />);
      const saveExpenseButton = screen.getByText("Save");

      const expenseNameInput = screen.getByPlaceholderText("Expense");
      const expenseCostInput = screen.getByPlaceholderText("0");

      fireEvent.change(expenseNameInput, { target: { value: "Bills" } });
      fireEvent.change(expenseCostInput, { target: { value: "200" } });
      fireEvent.click(saveExpenseButton);

      const newName = screen.getByText("Bills");
      const newCost = screen.getByText("$200");

      expect(newName.textContent).toBe("Bills");
      expect(newCost.textContent).toBe("$200");

      const remaining = screen.getByTestId("remaining");
      const spent = screen.getByTestId("spent");

      expect(remaining.textContent).toBe("Remaining: $800");
      expect(spent.textContent).toBe("Spent so far: $200");
      
    });

    test("Zero Cost Case",() => {
      render(<App />);
      const saveExpenseButton = screen.getByText("Save");

      const expenseNameInput = screen.getByPlaceholderText("Expense");
      const expenseCostInput = screen.getByPlaceholderText("0");

      fireEvent.change(expenseNameInput, { target: { value: "" } });
      fireEvent.change(expenseCostInput, { target: { value: "0" } });
      fireEvent.click(saveExpenseButton);

      const remaining = screen.getByTestId("remaining");
      const spent = screen.getByTestId("spent");

      expect(remaining.textContent).toBe("Remaining: $1000");
      expect(spent.textContent).toBe("Spent so far: $0");
    })
   
   })

describe("Expense Deletion", () => {
    test("Deletes an Expense", () => {
      render(<App />);
      const saveExpenseButton = screen.getByText("Save");

      const expenseNameInput = screen.getByPlaceholderText("Expense");
      const expenseCostInput = screen.getByPlaceholderText("0");

      fireEvent.change(expenseNameInput, { target: { value: "Bills" } });
      fireEvent.change(expenseCostInput, { target: { value: "200" } });
      fireEvent.click(saveExpenseButton);

      const deleteButton = screen.getByText("x");
      fireEvent.click(deleteButton);

      const oldName = screen.queryByText("Bills");
      const oldCost = screen.queryByText("$200");

      expect(oldName).toBe(null);
      expect(oldCost).toBe(null);

      const remaining = screen.getByTestId("remaining");
      const spent = screen.getByTestId("spent");

      expect(remaining.textContent).toBe("Remaining: $1000");
      expect(spent.textContent).toBe("Spent so far: $0");


    });
   
   })

describe("Budget Balance Verification", () => {
    test("Tries different expense changes", () => {
      render(<App />);

      const saveExpenseButton = screen.getByText("Save");

      const expenseNameInput = screen.getByPlaceholderText("Expense");
      const expenseCostInput = screen.getByPlaceholderText("0");

      fireEvent.change(expenseNameInput, { target: { value: "Bills" } });
      fireEvent.change(expenseCostInput, { target: { value: "200" } });
      fireEvent.click(saveExpenseButton);

      fireEvent.change(expenseNameInput, { target: { value: "More Bills" } });
      fireEvent.change(expenseCostInput, { target: { value: "400" } });
      fireEvent.click(saveExpenseButton);

      fireEvent.change(expenseNameInput, { target: { value: "Even More Bills" } });
      fireEvent.change(expenseCostInput, { target: { value: "200" } });
      fireEvent.click(saveExpenseButton);

      const remaining = screen.getByTestId("remaining");
      const spent = screen.getByTestId("spent");
      const deleteButton = screen.getAllByText("x");
      fireEvent.click(deleteButton[0]);

      fireEvent.change(expenseNameInput, { target: { value: "bills again" } });
      fireEvent.change(expenseCostInput, { target: { value: "300" } });
      fireEvent.click(saveExpenseButton);


      expect(spent.textContent).toBe("Spent so far: $900");
      expect(remaining.textContent).toBe("Remaining: $100");
    });
   
   })