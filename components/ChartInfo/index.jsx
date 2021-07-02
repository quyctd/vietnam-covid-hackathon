import React from "react"
import { Pie } from "react-chartjs-2"

export default function ChartInfo(props) {
  const { vietnamInfo } = props

  const data = {
    labels: ["Ca khỏi", "Tử vong", "Ca nhiễm"],
    datasets: [
      {
        label: "# of Votes",
        data: [
          vietnamInfo.recovered,
          vietnamInfo.deceased,
          vietnamInfo.treated,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="box p-4">
      <h1 className="text-center mb-3">Tỉ lệ ca nhiễm</h1>
      <Pie data={data} />
    </div>
  )
}
