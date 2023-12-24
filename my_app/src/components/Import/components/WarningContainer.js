import "./style/warningContainer.css"
import exampleImg from "./data/example.png"

const WarningContainer = () => {
    return <>
        <div className="warningContainer">
            <div className="warningTitle">Внимание!</div>
            <div className="warningDesc">
                При импорте файла учитываейте,<br />
                что необходимо загружать excel-файл имеющий<br />
                следующую структуру:
            </div>
            <img className="exampleImg" src={exampleImg} />
        </div>
    </>
}

export default WarningContainer;