import React from "react"

export default function ProvincesInfo(props) {
  const { provincesInfo } = props

  return (
    <div className="box p-4">
      <h1 className="text-center my-3">Thông tin chi tiết theo tỉnh thành</h1>
      <table className="table table-striped table-hover">
        <thead className="table-success">
          <tr>
            <th scope="col">Tỉnh thành</th>
            <th scope="col">Số Ca Khỏi</th>
            <th scope="col">Số Ca Đang Điều Trị</th>
            <th scope="col">Số ca tử vong</th>
            <th scope="col">Tổng cộng</th>
          </tr>
        </thead>
        <tbody>
          {provincesInfo.map((province) => (
            <tr key={province["hc-key"]}>
              <td className="text-capitalize">{province.cityName}</td>
              <td>{province.socakhoi.toLocaleString()}</td>
              <td>{province.socadangdieutri.toLocaleString()}</td>
              <td>{province.socatuvong.toLocaleString()}</td>
              <td>{province.value.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
