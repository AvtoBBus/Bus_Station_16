import { FixedSizeList } from 'react-window'
import { useState } from "react";
import CircleDiagram from "./CircleDiagram";
import "./style/expensesList.css"
import "./style/expensesListItem.css"
import "./style/circleDiagram.css"

const ExpensesList = (props) => {

    const [expensesList, setExpensesList] = useState(props.expList)


    let filteredList = []
    if (props.filterValue !== "nothing") {
        filteredList = expensesList.filter((item) => {
            return item.category === props.filterValue;
        })
    }
    else {
        filteredList = [...expensesList];
    }

    const convertStr = (str) => {
        return str ? str.length > 4 ? str.slice(0, 5) + "..." : str : "";
    }

    const renderRow = ({ index, style }) => {
        const item = filteredList[index];
        return <>
            {index % 2 ? <></> : <div className='expensesListWall' style={style} />}
            <div className="expensesListItem" style={style}>
                <div className='itemRightContent'>
                    <p className="itemDescription">{convertStr(item.description)}</p>
                    <p className="itemMoneyText">Money:</p>
                    <p className="itemMoney">{convertStr(String(item.amount))}</p>
                </div>
                <p className="itemCategory">Category:<br /><b>{convertStr(Object.keys(props.filterConverter)[Object.values(props.filterConverter).indexOf(item.category)])}</b></p>
                <div className='itemDateContainer'>
                    <p className="itemYear">{item.date.year}</p>
                    <p className="itemMonth">{item.date.month}</p>
                    <p className="itemDay">{item.date.day}</p>
                </div>
            </div>
        </>
    }

    return <>
        <div className="expensesList">
            <FixedSizeList
                className="fixedExpensesList"
                height={572}
                width={610}
                itemCount={filteredList.length}
                itemSize={230}
                style={{
                    width: 610,
                }}
            >
                {renderRow}
            </FixedSizeList >
        </div>
        <div className="expensesCircleDiagram">
            <CircleDiagram dataToFill={expensesList} filterConverter={props.filterConverter} />
        </div>
    </>
}

export default ExpensesList;