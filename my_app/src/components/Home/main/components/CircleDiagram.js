import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const CircleDiagram = (props) => {


    const drawingData = {
        "Продукты": 0,
        "Транспорт": 0,
        "Жильё": 0,
        "Развлечения": 0,
        "Здоровье": 0,
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

    let colors = [
        "rgba(255, 0, 0, 0.8)",
        "rgba(102, 178, 255, 0.8)",
        "rgba(204, 204, 0, 0.8)",
        "rgba(255, 153, 255, 0.8)",
        "rgba(102, 255, 102, 0.8)"
    ]

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