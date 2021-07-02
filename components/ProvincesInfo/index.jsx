import React, { useState } from "react"

export default function ProvincesInfo(props) {
  const [provincesInfo, seProvincesInfo] = useState(props.provincesInfo)
  const [input, setInput] = useState("")

  const onClickSearch = () => {
    if (input === "") {
      seProvincesInfo(props.provincesInfo)
      return
    }
    const searchRegex = new RegExp(input, "i")

    const newData = props.provincesInfo.filter((province) =>
      searchRegex.test(province.cityName || "")
    )
    seProvincesInfo(newData)
  }

  return (
    <div className="box p-4">
      <h1 className="text-center my-3">Thông tin chi tiết theo tỉnh thành</h1>
      <div className="input-group mb-3">
        <span
          className="input-group-text"
          id="inputGroup-sizing-default"
          onClick={onClickSearch}
        >
          Search
        </span>
        <input
          type="text"
          className="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-default"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
      </div>

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
