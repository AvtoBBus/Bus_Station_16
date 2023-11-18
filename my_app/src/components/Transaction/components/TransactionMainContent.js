import ExpensesListTransaction from "./ExpensesListTransaction";
import ExpensesFilter from "../../Home/main/components/ExpensesFilter";
import { useState } from "react"
import ButtonAddExpenses from "../../Home/main/components/ButtonAddExpenses";
import ButtonEditList from "./ButtonEditList";
import "./style/transactionMainContent.css"
import AddItem from "./AddItem";

const TransactionMainContent = (props) => {

    const filterConverter = {
        "Фильтр": "nothing",
        "Автомобиль": "auto",
        "Одежда": "clothes",
        "Продукты": "food",
        "Здоровье": "health",
        "Уход за собой": "selfCare",
        "Спорт": "sport",
        "Кафе и рестораны": "cafe",
        "Электроника": "electronics",
        "Дом, ремонт": "home",
        "Транспорт": "transport",
        "Путешествия": "travel",
        "Прочее": "other",
    }

    const [filterValue, setFilterValue] = useState("Фильтр");
    const [editList, setEditList] = useState(false);
    const [listStyle, setListStyle] = useState({ display: "block" })

    const currentFilterChanged = (currentFilter) => {
        setFilterValue(currentFilter);
    }


    const switchEditHandler = () => {
        setEditList(!editList);
        setListStyle({ display: "block" })
    }

    const addItemHandler = () => {
        setEditList(false);
        (listStyle.display == "block") ? setListStyle({ display: "none" }) : setListStyle({ display: "block" });
    }

    const closeAddMenuHandler = () => {
        setListStyle({ display: "block" });
    }

    return <>
        <div className="transactionMainContent">
            <div style={{ position: "absolute", top: -18 }}>
                <ButtonAddExpenses addItem={addItemHandler} style={{ width: 360, height: 60, fontSize: 30 }} />
            </div>
            <div style={{ position: "absolute", left: 781, top: -18 }}>
                <ExpensesFilter style={{ width: 360, height: 60, fontSize: 30 }} filterConverter={filterConverter} onChangeCurrentFilter={currentFilterChanged} />
            </div>
            <div style={{ position: "absolute", left: 727, top: 151 }}>
                <ButtonEditList switchEditFlag={switchEditHandler} />
            </div>
            {
                (listStyle.display == "none") ?
                    <AddItem filterConverter={filterConverter} addElemInList={props.addElemInList} closeAddMenu={closeAddMenuHandler} /> :
                    <></>
            }
            <ExpensesListTransaction deleteElemByIndex={props.deleteElemByIndex} editFlag={editList} expList={props.expList} filterValue={filterConverter[filterValue]} filterConverter={filterConverter} style={listStyle} />
        </div>
    </>
}

export default TransactionMainContent;