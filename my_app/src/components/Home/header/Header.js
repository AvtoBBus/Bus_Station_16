import "./style/Header.css"
import HeaderCard from "./headerCard"
import { Link, Navigate, useNavigate } from "react-router-dom"

const Header = (props) => {
    return <>
        <div className="header">
            <Link to="/" style={{ color: "rgb(0,0,0)" }}>
                <HeaderCard className="homePage" text="Обзор" />
            </Link>
            <Link to="/transaction" style={{ color: "rgb(0,0,0)" }}>
                <HeaderCard className="trasactionPage" text="Транзакции" />
            </Link>
            <Link to="/import" style={{ color: "rgb(0,0,0)" }}>
                <HeaderCard className="importPage" text="Импорт" />
            </Link>
            <Link to="/export" style={{ color: "rgb(0,0,0)" }}>
                <HeaderCard className="exportPage" text="Экспорт" />
            </Link>
        </div>
    </>
}

export default Header;