import React, { useEffect, useState } from "react"
import dayjs from "dayjs"

import VietnamInfo from "../components/VietnamInfo"
import ProvincesInfo from "../components/ProvincesInfo"

const LATEST_IN_VN_URL =
  "https://api.apify.com/v2/key-value-stores/ZsOpZgeg7dFS1rgfM/records/LATEST"
const CITY_API_URL =
  "https://api.apify.com/v2/key-value-stores/p3nS2Q9TUn6kUOriJ/records/LATEST"

export default function Home() {
  const [isFetching, setIsFetching] = useState(true)
  const [vietnamInfo, setVietnamInfo] = useState(null)
  const [provincesInfo, setProvincesInfo] = useState(null)

  useEffect(() => {
    getLatestVietnamInfo()
  }, [])

  const getLatestVietnamInfo = async () => {
    try {
      const [vietnamLatestRes, cityRes] = await Promise.all([
        fetch(LATEST_IN_VN_URL).then((resp) => resp.json()),
        fetch(CITY_API_URL).then((resp) => resp.json()),
      ])

      const cityMapRes = cityRes.key.reduce((obj, item) => {
        return {
          ...obj,
          [item["hec-key"]]: item.name.replace(/-/g, " "),
        }
      }, {})

      const vietnamOverallInfo = {
        infected: vietnamLatestRes.infected,
        recovered: vietnamLatestRes.recovered,
        deceased: vietnamLatestRes.deceased,
        lastUpdate: dayjs(vietnamLatestRes.lastUpdatedAtSource).format(
          "MMMM D, YYYY h:mm A"
        ),
      }
      const provincesInfo = vietnamLatestRes.detail.map((city) => {
        return {
          ...city,
          cityName: cityMapRes[city["hc-key"]],
        }
      })

      setVietnamInfo(vietnamOverallInfo)
      setProvincesInfo(provincesInfo)
    } catch (err) {
      console.log("fetch Vietnam info err: ", err)
    } finally {
      setIsFetching(false)
    }
  }

  if (isFetching) return <h1>Loading...</h1>

  return (
    <div className="container">
      <h1 className=" text-center">MindX - Covid19 Report</h1>
      <div className="mt-5">
        <VietnamInfo vietnamInfo={vietnamInfo} />
        <ProvincesInfo provincesInfo={provincesInfo} />
      </div>
    </div>
  )
}
