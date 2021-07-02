import VietnamInfo from "../components/VietnamInfo"

export default function Home() {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center text-center">
      <h1>MindX - Covid19 Report</h1>
      <div className="mainContent">
        <VietnamInfo />
      </div>
    </div>
  )
}
