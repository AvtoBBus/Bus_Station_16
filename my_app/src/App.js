import Home from "./components/Home/Home";
import LoginPage from "./components/Login/LoginPage"
import "./style/App.css"
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/router/PrivateRoute";
import { AuthProvider } from "./utils/AuthProvider";
import Transaction from "./components/Transaction/Transaction";
import { useState } from "react";
import ImportPage from "./components/Import/ImportPage";
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

  axios.interceptors.response.use(function (response) {
    return response;
  })
  axios.interceptors.request.use(function (request) {
    console.log(request);
    return request;
  })

  const startGetListHandler = (userList) => {
    let vedro = [...expensesList]
    for (let elem of userList) {
      vedro.push({
        expensesID: elem.id,
        description: elem.expenseDescription,
        price: elem.amount,
        category: Object.values(filterConverter)[elem.category + 1],
        date: {
          year: elem.creationDate.split("T")[0].split("-")[0],
          month: elem.creationDate.split("T")[0].split("-")[1],
          day: elem.creationDate.split("T")[0].split("-")[2],
        }
      })
    }
    setExpensesList(vedro);
  }

<<<<<<< Updated upstream
=======

  const deleteElem = (elemIndex) => {
    let vedro = [...expensesList];
    vedro.filter(item => item.expensesID !== elemIndex);
    console.log(vedro);
    axios({
      method: 'post',
      url: `http://localhost:5290/userData/UserData/delete/${elemIndex}`,
      withCredentials: true,
    })
      .then(response => {
        if (response.status === 200) {
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
    vedro.push({
      expensesID: expensesList.length,
      description: newElem.description,
      price: newElem.price,
      category: newElem.category,
      date: {
        year: newElem.date.year,
        month: months[Number(newElem.date.month) - 1],
        day: newElem.date.day,
      }
    });
    axios({
      method: 'post',
      url: `http://localhost:5290/userData/UserData/add`,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
      data: JSON.stringify({
        "expenseDescription": newElem.description,
        "amount": newElem.price,
        "creationDate": `${newElem.date.year}-${Number(newElem.date.month) - 1}-${newElem.date.day}T00:00:00.000Z`,
        "category": Object.values(filterConverter).indexOf(newElem.category) - 1
      })
    })
      .then(response => {
        if (response.status === 200) {
          setExpensesList(vedro);
        }
        else {
          alert("Ошибка добавления элемента!\nПопробуйте снова позже(\n" + response.status + " - " + response.statusText)
        }
      })
      .catch(er => alert("Ошибка добавления элемента!\nПопробуйте снова позже(\n" + er))

  }

>>>>>>> Stashed changes
  return <>
    <AuthProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <Home expList={expensesList} filterConverter={filterConverter} />
            </PrivateRoute>
          }></Route>

          <Route path="/transaction" element={
            <PrivateRoute>
<<<<<<< Updated upstream
              <Transaction expList={expensesList} />
=======
              <Transaction expList={expensesList} deleteElemByIndex={deleteElem} addElemInList={addElem} filterConverter={filterConverter} />
>>>>>>> Stashed changes
            </PrivateRoute>
          }></Route>

          <Route path="/import" element={
            <PrivateRoute>
              <ImportPage />
            </PrivateRoute>
          }></Route>

          <Route path="/login" element={<LoginPage startGetList={startGetListHandler} />} />
        </Routes>
      </div>
    </AuthProvider>
  </>
}

export default App;
