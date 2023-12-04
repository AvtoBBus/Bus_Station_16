import ExpensesListTransaction from "./ExpensesListTransaction";
import ExpensesFilter from "../../Home/main/components/ExpensesFilter";
import { useState } from "react"
import ButtonAddExpenses from "../../Home/main/components/ButtonAddExpenses";
import ButtonEditList from "./ButtonEditList";
import "./style/transactionMainContent.css"
<<<<<<< Updated upstream
=======
import AddItem from "./AddItem";
import BlockEmailOn from "./BlockEmailOn";
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
            <ExpensesListTransaction expList={props.expList} filterValue={filterConverter[filterValue]} filterConverter={filterConverter} />
=======
            {
                (listStyle.display == "none") ?
                    <AddItem filterConverter={props.filterConverter} addElemInList={props.addElemInList} closeAddMenu={closeAddMenuHandler} /> :
                    <></>
            }
            <ExpensesListTransaction deleteElemByIndex={props.deleteElemByIndex} editFlag={editList} expList={props.expList} filterValue={props.filterConverter[filterValue]} filterConverter={props.filterConverter} style={listStyle} />
            <BlockEmailOn />
>>>>>>> Stashed changes
        </div>
    </>
}

export default TransactionMainContent;