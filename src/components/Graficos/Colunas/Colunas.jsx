import React from "react";
import { Chart } from "react-google-charts";

const dataInicial = [["Medicamento", "Quantidade", { role: "style" }], [0, 0, '']];


export function Colunas({ data = dataInicial }) {
  return (
    <Chart chartType="ColumnChart" width="100%" height="400px" data={data} />
  );
}
