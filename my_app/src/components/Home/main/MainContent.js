import ExpensesList from "./components/ExpensesList";
import ButtonAddExpenses from "./components/ButtonAddExpenses";
import ExpensesFilter from "./components/ExpensesFilter"
import { useState } from "react"
import "./style/mainContent.css"
import SignOut from "./components/SignOut";
import { Link } from "react-router-dom";

const MainContent = (props) => {
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
        <div className="mainContent">
            <Link to="/transaction">
                <ButtonAddExpenses />
            </Link>
            <SignOut />
            <ExpensesFilter filterConverter={filterConverter} onChangeCurrentFilter={currentFilterChanged} />
            <ExpensesList expList={props.expList} filterConverter={filterConverter} filterValue={filterConverter[filterValue]} />
        </div>
    </>
}

export default MainContent;