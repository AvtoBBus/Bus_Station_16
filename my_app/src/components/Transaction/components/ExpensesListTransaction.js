import { FixedSizeList } from 'react-window'
import { useState } from "react";
import "./style/expensesList.css"


const ExpensesListTransaction = (props) => {

    const [expensesList, setExpensesList] = useState(props.expList)

    console.log(props)

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
        return str.length > 9 ? str.slice(0, 8) + "..." : str;
    }


    const renderRow = ({ index, style }) => {
        const item = filteredList[index];
        return <>
            {index % 2 ? <></> : <div className='expensesListWall' style={style} />}
            <div className="expensesListItem" style={style}>
                <div className='itemRightContent' style={{ left: 360 }}>
                    <p className="itemDescription">{convertStr(item.description)}</p>
                    <p className="itemMoney">Money: {item.price}</p>
                </div>
                <p className="itemCategory" style={{ left: 730 }}>Category:<br /><b>{Object.keys(props.filterConverter)[Object.values(props.filterConverter).indexOf(item.category)]}</b></p>
                <div className='itemDateContainer'>
                    <p className="itemYear">{item.date.year}</p>
                    <p className="itemMonth">{item.date.month}</p>
                    <p className="itemDay">{item.date.day}</p>
                </div>
            </div>
        </>
    }

    return <>
        <div className="expensesList" style={{ width: 1435 }}>
            <FixedSizeList
                className="fixedExpensesList"
                height={572}
                width={1435}
                itemCount={filteredList.length}
                itemSize={230}
                style={{
                    width: "100%",
                    // paddingLeft: 15
                }}
            >
                {renderRow}
            </FixedSizeList >
        </div>
    </>
}

export default ExpensesListTransaction;