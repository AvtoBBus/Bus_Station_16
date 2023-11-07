import "./style/Header.css"
import HeaderCard from "./headerCard";

const Header = (props) => {
    return <>
        <div className="header">
            <HeaderCard className="homePage" text="Обзор" />
            <HeaderCard className="trasactionPage" text="Транзакции" />
            <HeaderCard className="importPage" text="Импорт" />
            <HeaderCard className="exportPage" text="Экспорт" />
        </div>
    </>
}

export default Header;