import React, { useEffect, useState } from "react"
import dayjs from "dayjs"

import VietnamInfo from "../components/VietnamInfo"
import ProvincesInfo from "../components/ProvincesInfo"
import LastTenDays from "../components/LastTenDays"
import ChartInfo from "../components/ChartInfo"
import LastTenDaysTrend from "../components/TendaysTrendChart"
import PulseLoader from "react-spinners/PuffLoader"

const LATEST_IN_VN_URL =
  "https://api.apify.com/v2/key-value-stores/ZsOpZgeg7dFS1rgfM/records/LATEST"
const CITY_API_URL =
  "https://api.apify.com/v2/key-value-stores/p3nS2Q9TUn6kUOriJ/records/LATEST"
const TEN_DAYS_API =
  "https://api.apify.com/v2/key-value-stores/Tksmptn5O41eHrT4d/records/LATEST"

export default function Home() {
  const [isFetching, setIsFetching] = useState(true)
  const [vietnamInfo, setVietnamInfo] = useState(null)
  const [provincesInfo, setProvincesInfo] = useState(null)
  const [tenDaysData, setTenDaysData] = useState([])

  useEffect(() => {
    getLatestVietnamInfo()
    getLastTenDaysData()
  }, [])

  const getLatestVietnamInfo = async () => {
    try {
      const [vietnamLatestRes, cityRes] = await Promise.all([
        fetch(LATEST_IN_VN_URL).then((resp) => resp.json()),
        fetch(CITY_API_URL).then((resp) => resp.json()),
      ])

      const cityMapRes = cityRes.key.reduce((obj, item) => {
        return { ...obj, [item["hec-key"]]: item.name.replace(/-/g, " ") }
      }, {})

      const vietnamOverallInfo = {
        infected: vietnamLatestRes.infected,
        recovered: vietnamLatestRes.recovered,
        deceased: vietnamLatestRes.deceased,
        treated: vietnamLatestRes.treated,
        lastUpdate: dayjs(vietnamLatestRes.lastUpdatedAtSource).format(
          "MMMM D, YYYY h:mm A"
        ),
      }
      const provincesInfo = vietnamLatestRes.detail.map((city) => ({
        ...city,
        cityName: cityMapRes[city["hc-key"]],
      }))

      setVietnamInfo(vietnamOverallInfo)
      setProvincesInfo(provincesInfo)
    } catch (err) {
      console.log("fetch Vietnam info err: ", err)
    } finally {
      setIsFetching(false)
    }
  }

  const getLastTenDaysData = async () => {
    try {
      const res = await fetch(TEN_DAYS_API)
      const responseJSON = await res.json()
      const { canhiem, cakhoi, catuvong } = responseJSON
      let tenDays = []
      for (let i = 0; i < canhiem.length; i++) {
        tenDays.unshift({
          ngay: canhiem[i].day,
          socanhiem: canhiem[i].quantity,
          socakhoi: cakhoi[i].quantity,
          socatuvong: catuvong[i].quantity,
        })
      }
      setTenDaysData(tenDays)
    } catch (err) {
      console.log("err: ", err)
    }
  }

  if (isFetching)
    return (
      <div className="d-flex align-items-center justify-content-center vh-100">
        <PulseLoader loading={true} color="#13b057" size={120} />
      </div>
    )

  return (
    <div className="container">
      <h1 className=" text-center mt-5">MindX - Covid19 Statistics</h1>
      <div className="mt-5">
        <div className="row">
          <div className="col-8">
            <VietnamInfo vietnamInfo={vietnamInfo} />
          </div>
          <div className="col-4">
            <ChartInfo vietnamInfo={vietnamInfo} />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <LastTenDays tenDaysData={tenDaysData} />
          </div>
          <div className="col-6">
            <LastTenDaysTrend tenDaysData={tenDaysData} />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <ProvincesInfo provincesInfo={provincesInfo} />
          </div>
        </div>
      </div>
    </div>
  )
}
