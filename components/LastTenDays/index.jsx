import React from "react"

export default function LastTenDays(props) {
  const { tenDaysData } = props

  return (
    <div className="box p-4 my-4 h-100">
      <h1 className="w-100 text-center fz-2 p-3 m-0">Thống kê 10 ngày qua</h1>
      <table className="table table-striped table-hover table-borderless">
        <thead className="table-success">
          <tr>
            <th scope="col">Ngày</th>
            <th scope="col">Số ca nhiễm mới</th>
            <th scope="col">Số ca khỏi</th>
            <th scope="col">Số ca tử vong</th>
          </tr>
        </thead>
        <tbody>
          {tenDaysData.map((dayData) => (
            <tr key={dayData.ngay}>
              <td>{dayData.ngay}</td>
              <td>{dayData.socanhiem.toLocaleString()}</td>
              <td>{dayData.socakhoi.toLocaleString()}</td>
              <td>{dayData.socatuvong.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
