import ExpensesListTransaction from "./ExpensesListTransaction";
import ExpensesFilter from "../../Home/main/components/ExpensesFilter";
import { useState } from "react"
import ButtonAddExpenses from "../../Home/main/components/ButtonAddExpenses";
import ButtonEditList from "./ButtonEditList";
import "./style/transactionMainContent.css"

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

    const currentFilterChanged = (currentFilter) => {
        console.log(currentFilter);
        setFilterValue(currentFilter);
    }

    return <>
        <div className="transactionMainContent">
            <div style={{ position: "absolute", top: -18 }}>
                <ButtonAddExpenses style={{ width: 360, height: 60, fontSize: 30 }} />
            </div>
            <div style={{ position: "absolute", left: 781, top: -18 }}>
                <ExpensesFilter style={{ width: 360, height: 60, fontSize: 30 }} filterConverter={filterConverter} onChangeCurrentFilter={currentFilterChanged} />
            </div>
            <div style={{ position: "absolute", left: 727, top: 151 }}>
                <ButtonEditList />
            </div>
            <ExpensesListTransaction expList={props.expList} filterValue={filterConverter[filterValue]} filterConverter={filterConverter} />
        </div>
    </>
}

export default TransactionMainContent;