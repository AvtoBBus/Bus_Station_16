import "./style/warningContainer.css"
import exampleImg from "./data/example.png"

const WarningContainer = () => {
    return <>
        <div className="warningContainer">
            <div className="warningTitle">Внимание!</div>
            <div className="warningDesc">
                При экспорте файла учитываейте,<br />
                что полученный excel-файл будет иметь<br />
                следующую структуру:
            </div>
            <img className="exampleImg" src={exampleImg} />
        </div>
    </>
}

export default WarningContainer;