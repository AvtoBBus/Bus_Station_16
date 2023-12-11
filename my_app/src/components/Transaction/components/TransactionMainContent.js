import ExpensesListTransaction from "./ExpensesListTransaction";
import ExpensesFilter from "../../Home/main/components/ExpensesFilter";
import { useState } from "react"
import ButtonAddExpenses from "../../Home/main/components/ButtonAddExpenses";
import ButtonEditList from "./ButtonEditList";
import AddItem from "./AddItem"
import "./style/transactionMainContent.css"

const TransactionMainContent = (props) => {

    const [filterValue, setFilterValue] = useState("Фильтр");
    const [flagAddItem, setFlagAddItem] = useState(false)
    const [flagEditItem, setFlagEditItem] = useState(false)

    const currentFilterChanged = (currentFilter) => {
        console.log(currentFilter);
        setFilterValue(currentFilter);
    }

    const addItemHanler = () => {
        setFlagAddItem(!flagAddItem)
    }

    const closeMenuHandler = () => {
        setFlagAddItem(false)
    }

    const editItemHandler = () => {
        setFlagEditItem(!flagEditItem)
    }

    return <>
        <div className="transactionMainContent">
            <div style={{ position: "absolute", top: -18 }}>
                <ButtonAddExpenses style={{ width: 360, height: 60, fontSize: 30 }} addItem={addItemHanler} />
            </div>
            {flagAddItem ?
                <div>
                    <AddItem filterConverter={props.filterConverter} addElemInList={props.addItem} closeAddMenu={closeMenuHandler} />
                </div> :
                <ExpensesListTransaction expList={props.expList} filterValue={props.filterConverter[filterValue]} filterConverter={props.filterConverter} editFlag={flagEditItem} />
            }
            <div style={{ position: "absolute", left: 749, top: -18 }}>
                <ExpensesFilter style={{ position: "absolute", left: 512, width: 360, height: 60, fontSize: 30 }} filterConverter={props.filterConverter} onChangeCurrentFilter={currentFilterChanged} />
            </div>
            <div style={{ position: "absolute", left: 727, top: 151 }}>
                <ButtonEditList switchEditFlag={editItemHandler} />
            </div>

        </div>
    </>
}

export default TransactionMainContent;