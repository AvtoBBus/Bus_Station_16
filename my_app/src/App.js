import Home from "./components/Home/Home";
import LoginPage from "./components/Login/LoginPage"
import "./style/App.css"
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/router/PrivateRoute";
import { AuthProvider } from "./utils/AuthProvider";
import Transaction from "./components/Transaction/Transaction";
import { useState } from "react";
import ImportPage from "./components/Import/ImportPage";
import ExportPage from "./components/Export/ExportPage";
import axios from 'axios'


function App() {

  const dateNow = new Date();
  const months = [
    "ЯНВ",
    "ФЕВ",
    "МАРТ",
    "АПР",
    "МАЙ",
    "ИЮНЬ",
    "ИЮЛЬ",
    "АВГ",
    "СЕН",
    "ОКТ",
    "НОЯБ",
    "ДЕК",
  ]
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
    "Переводы": "transaction",
    "Прочее": "other",
  }

  const [expensesList, setExpensesList] = useState([])

  // axios.interceptors.response.use(function (response) {
  //   console.log(response);
  //   return response;
  // })
  // axios.interceptors.request.use(function (request) {
  //   console.log(request);
  //   return request;
  // })

  const startGetListHandler = (userList) => {
    let vedro = [...expensesList]
    for (let elem of userList) {
      vedro.push({
        expensesID: elem.id,
        description: elem.expenseDescription,
        amount: elem.amount,
        category: Object.values(filterConverter)[elem.category + 1],
        date: {
          year: elem.creationDate.split("T")[0].split("-")[0],
          month: months[elem.creationDate.split("T")[0].split("-")[1] - 1],
          day: elem.creationDate.split("T")[0].split("-")[2],
        }
      })
    }
    setExpensesList(vedro);
  }

  const editElem = (elem) => {
    axios({
      method: 'post',
      url: `http://localhost:5290/userData/update`,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({
        "id": elem.expensesID,
        "userId": 0,
        "expenseDescription": elem.description,
        "amount": elem.amount,
        "creationDate": `${elem.date.year}-${elem.date.month}-${elem.date.day}`,
        "category": Object.values(filterConverter).indexOf(elem.category) - 1,
      })
    })
      .then(response => {
        if (response.status === 200) {
          clearList();
          axios.get(`http://localhost:5290/userData/getAll`, { withCredentials: true })
            .then(response => {
              setExpensesList(response.data);
            })
        }
      })
  }


  const deleteElem = (elemIndex) => {
    let vedro = [...expensesList];
    vedro = vedro.filter(item => item.expensesID !== elemIndex);
    axios({
      method: 'post',
      url: `http://localhost:5290/userData/delete/${elemIndex}`,
      withCredentials: true,
    })
      .then(response => {
        if (response.status === 204) {
          setExpensesList(vedro);
        }
        else {
          alert("Ошибка удаления элемента!\nПопробуйте снова позже(\n" + response.status + " - " + response.statusText)
        }
      })
      .catch(er => alert("Ошибка удаления элемента!\nПопробуйте снова позже(\n" + er))
  }

  const addElem = (newElem) => {
    let vedro = [...expensesList]

    axios({
      method: 'post',
      url: `http://localhost:5290/userData/add`,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({
        "expenseDescription": newElem.description,
        "amount": newElem.amount,
        "creationDate": `${newElem.date.year}-${Number(newElem.date.month)}-${newElem.date.day}`,
        "category": Object.values(filterConverter).indexOf(newElem.category) - 1
      })
    })
      .then(response => {
        console.log(response.data)
        if (response.status === 200) {
          vedro.push({
            expensesID: response.data.id,
            description: newElem.description,
            amount: newElem.amount,
            category: newElem.category,
            date: {
              year: newElem.date.year,
              month: months[Number(newElem.date.month) - 1],
              day: newElem.date.day,
            }
          });
          setExpensesList(vedro);
        }
        else {
          alert("Ошибка добавления элемента!\nПопробуйте снова позже(\n" + response.status + " - " + response.statusText)
        }
      })
      .catch(er => alert("Ошибка добавления элемента!\nПопробуйте снова позже(\n" + er))

  }

  const clearList = () => {
    setExpensesList([]);
  }

  return <>
    <AuthProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <Home clearList={clearList} expList={expensesList} filterConverter={filterConverter} />
            </PrivateRoute>
          }></Route>

          <Route path="/transaction" element={
            <PrivateRoute>
              <Transaction expList={expensesList} editElem={editElem} deleteElemByIndex={deleteElem} addElemInList={addElem} filterConverter={filterConverter} months={months} />
            </PrivateRoute>
          }></Route>

          <Route path="/import" element={
            <PrivateRoute>
              <ImportPage />
            </PrivateRoute>
          }></Route>

          <Route path="/export" element={
            <PrivateRoute>
              <ExportPage />
            </PrivateRoute>
          }></Route>

          <Route path="/login" element={<LoginPage startGetList={startGetListHandler} />} />
        </Routes>
      </div>
    </AuthProvider>
  </>
}

export default App;
