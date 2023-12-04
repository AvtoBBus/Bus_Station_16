import ExpensesListTransaction from "./ExpensesListTransaction";
import ExpensesFilter from "../../Home/main/components/ExpensesFilter";
import { useState } from "react"
import ButtonAddExpenses from "../../Home/main/components/ButtonAddExpenses";
import ButtonEditList from "./ButtonEditList";
import "./style/transactionMainContent.css"

const TransactionMainContent = (props) => {

    const [filterValue, setFilterValue] = useState("Фильтр");

    const currentFilterChanged = (currentFilter) => {
        console.log(currentFilter);
        setFilterValue(currentFilter);
    }

    return <>
        <div className="transactionMainContent">
            <div style={{ position: "absolute", top: -18 }}>
                <ButtonAddExpenses style={{ width: 360, height: 60, fontSize: 30 }} />
            </div>
            <div style={{ position: "absolute", left: 749, top: -18 }}>
                <ExpensesFilter style={{ width: 360, height: 60, fontSize: 30 }} filterConverter={props.filterConverter} onChangeCurrentFilter={currentFilterChanged} />
            </div>
            <div style={{ position: "absolute", left: 727, top: 151 }}>
                <ButtonEditList />
            </div>
            <ExpensesListTransaction expList={props.expList} filterValue={props.filterConverter[filterValue]} filterConverter={props.filterConverter} />
        </div>
    </>
}

export default TransactionMainContent;