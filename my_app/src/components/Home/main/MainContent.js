import ExpensesList from "./components/ExpensesList";
import ButtonAddExpenses from "./components/ButtonAddExpenses";
import ExpensesFilter from "./components/ExpensesFilter"
import { useState } from "react"
import "./style/mainContent.css"
import SignOut from "./components/SignOut";
import { Link } from "react-router-dom";

const MainContent = (props) => {


    const [filterValue, setFilterValue] = useState("Фильтр");

    const currentFilterChanged = (currentFilter) => {
        setFilterValue(currentFilter);
    }

    return <>
        <div className="mainContent">
            <Link to="/transaction">
                <ButtonAddExpenses />
            </Link>
            <SignOut />
            <ExpensesFilter filterConverter={props.filterConverter} onChangeCurrentFilter={currentFilterChanged} />
            <ExpensesList expList={props.expList} filterConverter={props.filterConverter} filterValue={props.filterConverter[filterValue]} />
        </div>
    </>
}

export default MainContent;