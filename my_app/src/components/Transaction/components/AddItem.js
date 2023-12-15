import ExpensesFilter from "../../Home/main/components/ExpensesFilter";
import "./style/addItem.css"
import { useState } from "react";

const AddItem = (props) => {

    const dateNow = new Date();

    const [descValue, setDescValue] = useState("");
    const [moneyValue, setMoneyValue] = useState(0);
    const [currentCategory, setCurrentCategory] = useState("Фильтр");
    const [dateValue, setDateValue] = useState(dateNow.toISOString().split("T")[0]);


    const checkInput = (newExpenses) => {
        if (newExpenses.description.length === 0)
            throw "Заполните поле Название!";
        if (newExpenses.price === 0)
            throw "Заполните поле Деньги!";
        if (newExpenses.category === "nothing")
            throw "Выберете категорию!";
    }

    const addItemHandler = () => {
        const newExpenses = {
            description: descValue,
            price: Number(moneyValue),
            category: Object.values(props.filterConverter)[Object.keys(props.filterConverter).indexOf(currentCategory)],
            date: {
                year: dateValue.split("-")[0],
                month: dateValue.split("-")[1],
                day: dateValue.split("-")[2],
            }
        }
        try {
            checkInput(newExpenses);
            props.addElemInList(newExpenses);
            props.closeAddMenu();
        }
        catch (error) {
            alert(error);
        }
    }

    return <>
        <div className="addItemContainer">
            <div className="inputBlock descriptionBlock">
                <p className="descriptionP">Название: </p>
                <input className="inputValue descriptionValue" type="text" value={descValue} onChange={(event) => setDescValue(event.target.value)} />
            </div>
            <div className="inputBlock moneyBlock">
                <p className="moneyP">Деньги(₽):</p>
                <input className="inputValue moneyValue" type="number" value={moneyValue} onChange={(event) => setMoneyValue(event.target.value)} />
            </div>
            <div className="inputBlock categoryBlock">
                <p className="categoryP">Категория:</p>
                <ExpensesFilter style={{ top: 7, left: 218, width: 419, height: "85%", fontSize: 35, backgroundColor: "#514b9952", color: "black" }} filterConverter={props.filterConverter} onChangeCurrentFilter={(currentValue) => setCurrentCategory(currentValue)} />
            </div>
            <div className="inputBlock dateBlock">
                <p className="dateP">Дата траты:</p>
                <input className="inputValue dateValue" type="date" value={dateValue} onChange={(event) => setDateValue(event.target.value)} />
            </div>
            <button className="addButton" type="button" onClick={addItemHandler}>
                Добавить расход в список
            </button>
        </div>
    </>
}

export default AddItem;