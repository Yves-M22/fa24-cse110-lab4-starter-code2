import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const expenses = useContext(AppContext);


  const totalExpenses = expenses.expenses.reduce((total, item) => {
    return (total = total + item.cost);
  }, 0);

  const alertType = totalExpenses > expenses.budget ? "alert-danger" : "alert-success";

  // Exercise: Create an alert when Remaining is less than 0.
  
  if (alertType == "alert-danger") {
    alert("You have exceeded your budget!");
  }
  
  return (
    <div data-testId="remaining" className={`alert ${alertType}`}>
      <span>Remaining: ${expenses.budget - totalExpenses}</span>
    </div>
  );
};

export default Remaining;
