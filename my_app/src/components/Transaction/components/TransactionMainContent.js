import ExpensesListTransaction from "./ExpensesListTransaction";
import ExpensesFilter from "../../Home/main/components/ExpensesFilter";
import { useState } from "react"
import ButtonAddExpenses from "../../Home/main/components/ButtonAddExpenses";
import ButtonEditList from "./ButtonEditList";
import AddItem from "./AddItem"
import "./style/transactionMainContent.css"
import EditItem from "./EditItem";
import { useEffect } from "react";

const TransactionMainContent = (props) => {

    const [filterValue, setFilterValue] = useState("Фильтр");
    const [flagAddItem, setFlagAddItem] = useState(false)

    const [flagItemOnWork, setFlagItemOnWork] = useState(false);

    const [itemToEdit, setItemtoEdit] = useState(null);
    const [flagEditItem, setFlagEditItem] = useState(false);

    const [repeatList, setRepeatList] = useState(props.expList);
    const [showRepeatFlag, setShowRepeatFlag] = useState(false);

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
        }
        else {
            setItemtoEdit(null);
        }
    }

    const isEqual = (firstObj, secondObj) => {
        const helpObj = { ...firstObj };
        helpObj.id = secondObj.id;
        return JSON.stringify(helpObj) === JSON.stringify(secondObj);
    }

    const showRepeatHandler = () => {
        if (showRepeatFlag) {
            setRepeatList(props.expList);
            setShowRepeatFlag(false);
        }
        else {
            let dupElem = [];
            let vedro = [];
            for (let i = 0; i < props.expList.length; i++) {
                for (let j = i + 1; j < props.expList.length; j++) {
                    if (isEqual(props.expList[i], props.expList[j])) {
                        if (!dupElem.includes(i)) {
                            dupElem.push(i);
                        }
                        if (!dupElem.includes(j)) {
                            dupElem.push(j);
                        }
                    }
                }
            }
            console.log(dupElem);
            for (const index of dupElem) {
                vedro.push(props.expList[index]);
            }
            setRepeatList(vedro);
            setShowRepeatFlag(true);
        }
    }

    useEffect(() => {
        setRepeatList(props.expList);
    }, [props.expList])

    return <>
        <div className="transactionMainContent">
            <div style={{ position: "absolute", top: -18 }}>
                <ButtonAddExpenses style={{ width: 360, height: 60, fontSize: 30 }} addItem={addItemHanler} />
            </div>

            {
                flagAddItem && !flagEditItem ?
                    <div>
                        <AddItem filterConverter={props.filterConverter} addElemInList={props.addItem} closeAddMenu={closeMenuHandler} />
                    </div> :
                    flagEditItem ?
                        <div>
                            <EditItem filterConverter={props.filterConverter} itemToEdit={itemToEdit} editElemInList={props.editElem} closeAddMenu={closeMenuHandler} months={props.months} />
                        </div> :
                        <ExpensesListTransaction expList={repeatList} filterValue={props.filterConverter[filterValue]} filterConverter={props.filterConverter} editFlag={flagItemOnWork} editItem={editItemHandler} deleteElemByIndex={props.delItem} />
            }


            {
                !showRepeatFlag ?
                    <div style={{ position: "absolute", left: 749, top: -18 }}>
                        <ExpensesFilter style={{ position: "absolute", left: 512, width: 360, height: 60, fontSize: 30 }} filterConverter={props.filterConverter} onChangeCurrentFilter={currentFilterChanged} />
                    </div>
                    :
                    <></>
            }

            <div style={{ position: "absolute", left: 727, top: 151 }}>
                <ButtonEditList switchEditFlag={itemOnWorkHandler} />
            </div>
            <div className="showRepeat">
                <label for="showRepeatInput" className="showRepeatLabel">Показать повторяющиеся</label>
                <input type="checkbox" id="showRepeatInput" className="showRepeatInput" onChange={showRepeatHandler} value={showRepeatFlag} defaultValue={false} />
            </div>
        </div>
    </>
}

export default TransactionMainContent;