import React from "react"
import { Line } from "react-chartjs-2"

export default function LastTenDaysTrend(props) {
  const { tenDaysData } = props
  var sortedData = [].concat(tenDaysData).reverse()

  const data = {
    labels: sortedData.map((data) => data.ngay),
    datasets: [
      {
        label: "Số ca khỏi",
        data: sortedData.map((data) => data.socakhoi),
        backgroundColor: "rgba(75, 192, 192, 0.9)",
        borderColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Số ca nhiễm",
        data: sortedData.map((data) => data.socanhiem),
        backgroundColor: "rgba(255, 206, 86, 0.9)",
        borderColor: "rgba(255, 206, 86, 0.5)",
      },
      {
        label: "Số ca tử vong",
        data: sortedData.map((data) => data.socatuvong),
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  }

  return (
    <div className="box p-4 my-4 h-100">
      <h1 className="text-center mb-3">Last 10 days trend</h1>
      <Line data={data} />
    </div>
  )
}
