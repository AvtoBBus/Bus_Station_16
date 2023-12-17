import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const CircleDiagram = (props) => {


    const drawingData = {
        "Автомобиль": 0,
        "Одежда": 0,
        "Продукты": 0,
        "Здоровье": 0,
        "Уход за собой": 0,
        "Спорт": 0,
        "Кафе и рестораны": 0,
        "Электроника": 0,
        "Дом, ремонт": 0,
        "Транспорт": 0,
        "Путешествия": 0,
        "Прочее": 0,
    }

    for (let e of props.dataToFill) {
        const key = Object.keys(props.filterConverter)[Object.values(props.filterConverter).indexOf(e.category)];
        drawingData[key] += e.amount;
    }

    let flag = false;

    for (let e of Object.keys(drawingData)) {
        if (drawingData[e] !== 0) {
            flag = true;
        }
    }

    let colors = []
    for (let e of Object.keys(drawingData)) {
        let r = Math.ceil(Math.random() * 255);
        let g = Math.ceil(Math.random() * 255);
        let b = Math.ceil(Math.random() * 255);
        colors.push("rgba( " + r + ", " + g + ", " + b + ", 0.8");
    }

    if (flag) {
        return <>
            <Doughnut
                datasetIdKey="id"
                data={{
                    labels: Object.keys(drawingData),
                    datasets: [{
                        data: Object.values(drawingData),
                        backgroundColor: colors,
                        borderWidth: 1
                    }]
                }}
            />
        </>
    }

    return <>
        <Doughnut
            datasetIdKey="id"
            data={{
                labels: ['Пока тут пусто'],
                datasets: [{
                    data: [1],
                    backgroundColor: [
                        'rgba(192, 192, 192, 0.8)'
                    ],
                    borderWidth: 1
                }]
            }}
        />
    </>


}

export default CircleDiagram;   