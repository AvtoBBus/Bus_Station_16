import "./style/buttonAddExpenses.css"

const ButtonAddExpenses = (props) => {
    return <>
        <button className="buttonAddExpenses" style={props.style}>
            Добавить расход
        </button>
    </>
}

export default ButtonAddExpenses;