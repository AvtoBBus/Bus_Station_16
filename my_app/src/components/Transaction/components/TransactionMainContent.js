import ExpensesListTransaction from "./ExpensesListTransaction";
import ExpensesFilter from "../../Home/main/components/ExpensesFilter";
import { useState } from "react"
import ButtonAddExpenses from "../../Home/main/components/ButtonAddExpenses";
import ButtonEditList from "./ButtonEditList";
import AddItem from "./AddItem"
import "./style/transactionMainContent.css"
import EditItem from "./EditItem";

const TransactionMainContent = (props) => {

    const [filterValue, setFilterValue] = useState("Фильтр");
    const [flagAddItem, setFlagAddItem] = useState(false)

    const [flagItemOnWork, setFlagItemOnWork] = useState(false);

    const [itemToEdit, setItemtoEdit] = useState(null);
    const [flagEditItem, setFlagEditItem] = useState(false);

    const currentFilterChanged = (currentFilter) => {
        console.log(currentFilter);
        setFilterValue(currentFilter);
    }

    const addItemHanler = () => {
        setFlagAddItem(!flagAddItem);
    }

    const closeMenuHandler = () => {
        setFlagAddItem(false);
        setFlagEditItem(false);
    }

    const itemOnWorkHandler = () => {
        setFlagItemOnWork(!flagItemOnWork);
    }

    const editItemHandler = (item) => {
        setFlagEditItem(!flagEditItem);
        if (!flagEditItem) {
            setItemtoEdit(item);
            props.editElem(item);
        }
        else {
            setItemtoEdit(null);
        }
    }

    return <>
        <div className="transactionMainContent">
            <div style={{ position: "absolute", top: -18 }}>
                <ButtonAddExpenses style={{ width: 360, height: 60, fontSize: 30 }} addItem={addItemHanler} />
            </div>


            {
                flagAddItem ?
                    <div>
                        <AddItem filterConverter={props.filterConverter} addElemInList={props.addItem} closeAddMenu={closeMenuHandler} />
                    </div> :
                    flagEditItem ?
                        <div>
                            <EditItem filterConverter={props.filterConverter} itemToEdit={itemToEdit} editElemInList={props.editElem} closeAddMenu={closeMenuHandler} />
                        </div> :
                        <ExpensesListTransaction expList={props.expList} filterValue={props.filterConverter[filterValue]} filterConverter={props.filterConverter} editFlag={flagItemOnWork} editItem={editItemHandler} deleteElemByIndex={props.delItem} />
            }

            <div style={{ position: "absolute", left: 749, top: -18 }}>
                <ExpensesFilter style={{ position: "absolute", left: 512, width: 360, height: 60, fontSize: 30 }} filterConverter={props.filterConverter} onChangeCurrentFilter={currentFilterChanged} />
            </div>
            <div style={{ position: "absolute", left: 727, top: 151 }}>
                <ButtonEditList switchEditFlag={itemOnWorkHandler} />
            </div>

        </div>
    </>
}

export default TransactionMainContent;