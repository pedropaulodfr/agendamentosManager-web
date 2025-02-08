import React, { useEffect } from "react";
import { Chart } from "react-google-charts";

export function Calendario({ data = [], title }) {
    const _data = [[{ type: "date", id: "Date" }, { type: "number", id: "Won/Loss" }]];
    data.forEach(x => {_data.push(x)})

    const options = {
        title: title,
        noDataPattern: {
            backgroundColor: 'white',
            color: '#D9E9E4'
        },
        calendar: {
            daysOfWeek: 'DSTQQSS',
            //cellSize: window.innerWidth * 0.013, // Tamanho do gráfico
            cellColor: {
            stroke: '#3F8576', // Cor dos blocos vazios
            strokeOpacity: 0.5,
            strokeWidth: 1,
            },
            monthOutlineColor: {
                stroke: 'black', // Cor das linhas que separam os meses
                strokeOpacity: .4,
                strokeWidth: 2
            },
            focusedCellColor: {
            stroke: 'white', // Cor quando passa o mouse em cima do bloco
            strokeOpacity: 0.8,
            strokeWidth: 3
            },
            unusedMonthOutlineColor: {
                stroke: 'white', // Cor dos meses sem dados
                strokeOpacity: 0,
                strokeWidth: 2
            },
        },
        colorAxis: {
            minValue: 0, // Valor mínimo (define o início do gradiente)
            maxValue: 10, // Valor máximo (define o fim do gradiente)
            colors: ['#099182', '#003b34'], // Gradiente de cores (início e fim)
        },
    };

    useEffect(() => {
        const traduzirMeses = () => {
            document.querySelectorAll('text').forEach((el) => {
                if (el.textContent == "Jan") { el.textContent = "Janeiro" }
                if (el.textContent == "Feb") { el.textContent = "Fevereiro" }
                if (el.textContent == "Mar") { el.textContent = "Março" }
                if (el.textContent == "Apr") { el.textContent = "Abril" }
                if (el.textContent == "May") { el.textContent = "Maio" }
                if (el.textContent == "Jun") { el.textContent = "Junho" }
                if (el.textContent == "Jul") { el.textContent = "Julho" }
                if (el.textContent == "Aug") { el.textContent = "Agosto" }
                if (el.textContent == "Sep") { el.textContent = "Setembro" }
                if (el.textContent == "Oct") { el.textContent = "Outubro" }
                if (el.textContent == "Nov") { el.textContent = "Novembro" }
                if (el.textContent == "Dec") { el.textContent = "Dezembro" }
            });
        };

        // Aguardar o gráfico ser renderizado antes de aplicar a tradução
        const timeout = setTimeout(traduzirMeses, 10);

        return () => clearTimeout(timeout);
    }, [_data]);

    return (
        <Chart
            chartType="Calendar"
            width="100%"
            data={_data}
            options={options}
        />
    );
}
