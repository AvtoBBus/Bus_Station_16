import Home from "./components/Home/Home";
import LoginPage from "./components/Login/LoginPage"
import "./style/App.css"
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/router/PrivateRoute";
import { AuthProvider } from "./utils/AuthProvider";
import Transaction from "./components/Transaction/Transaction";
import { useState } from "react";

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


  const [expensesList, setExpensesList] = useState([
    {
      expensesID: 0,
      description: "Штанишки",
      price: 100,
      category: "clothes",
      date: {
        year: dateNow.toISOString().split("T")[0].split("-")[0],
        month: months[dateNow.toISOString().split("T")[0].split("-")[1] - 1],
        day: dateNow.toISOString().split("T")[0].split("-")[2],
      }
    },
    {
      expensesID: 1,
      description: "exp2",
      price: 450,
      category: "auto",
      date: {
        year: dateNow.toISOString().split("T")[0].split("-")[0],
        month: months[dateNow.toISOString().split("T")[0].split("-")[1] - 1],
        day: dateNow.toISOString().split("T")[0].split("-")[2],
      }
    },
    {
      expensesID: 2,
      description: "exp3",
      price: 1200,
      category: "health",
      date: {
        year: dateNow.toISOString().split("T")[0].split("-")[0],
        month: months[dateNow.toISOString().split("T")[0].split("-")[1] - 1],
        day: dateNow.toISOString().split("T")[0].split("-")[2],
      }
    },
    {
      expensesID: 3,
      description: "exp4",
      price: 50,
      category: "other",
      date: {
        year: dateNow.toISOString().split("T")[0].split("-")[0],
        month: months[dateNow.toISOString().split("T")[0].split("-")[1] - 1],
        day: dateNow.toISOString().split("T")[0].split("-")[2],
      }
    },
    {
      expensesID: 4,
      description: "exp5",
      price: 100,
      category: "food",
      date: {
        year: dateNow.toISOString().split("T")[0].split("-")[0],
        month: months[dateNow.toISOString().split("T")[0].split("-")[1] - 1],
        day: dateNow.toISOString().split("T")[0].split("-")[2],
      }
    },
    {
      expensesID: 5,
      description: "exp6",
      price: 450,
      category: "auto",
      date: {
        year: dateNow.toISOString().split("T")[0].split("-")[0],
        month: months[dateNow.toISOString().split("T")[0].split("-")[1] - 1],
        day: dateNow.toISOString().split("T")[0].split("-")[2],
      }
    },
    {
      expensesID: 6,
      description: "exp7",
      price: 1200,
      category: "health",
      date: {
        year: dateNow.toISOString().split("T")[0].split("-")[0],
        month: months[dateNow.toISOString().split("T")[0].split("-")[1] - 1],
        day: dateNow.toISOString().split("T")[0].split("-")[2],
      }
    },
    {
      expensesID: 7,
      description: "exp8",
      price: 50,
      category: "other",
      date: {
        year: dateNow.toISOString().split("T")[0].split("-")[0],
        month: months[dateNow.toISOString().split("T")[0].split("-")[1] - 1],
        day: dateNow.toISOString().split("T")[0].split("-")[2],
      }
    },
  ]);


  const deleteElem = (elemIndex) => {
    setExpensesList(expensesList.filter(item => item.expensesID !== elemIndex));
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
    }
    );
    setExpensesList(vedro);
  }

  return <>
    <AuthProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={
            <PrivateRoute>
              <Home expList={expensesList} />
            </PrivateRoute>
          }></Route>

          <Route path="/transaction" element={
            <PrivateRoute>
              <Transaction expList={expensesList} deleteElemByIndex={deleteElem} addElemInList={addElem} />
            </PrivateRoute>
          }></Route>

          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </AuthProvider>
  </>
}

export default App;
