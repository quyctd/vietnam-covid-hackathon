import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'

export default function VietnamInfo() {
    const [isFetching, setIsFetching] = useState(true);
    const [vietnamInfo, setVietnamInfo] = useState(null);

    useEffect(() => {
        getLatestVietnamInfo();
    }, [])

    const getLatestVietnamInfo = async () => {
        try {

            const res = await fetch('https://api.apify.com/v2/key-value-stores/ZsOpZgeg7dFS1rgfM/records/LATEST');
            const data = await res.json();
            setVietnamInfo({
                infected: data.infected,
                recovered: data.recovered,
                deceased: data.deceased,
                lastUpdate: dayjs(data.lastUpdatedAtSource).format('MMMM D, YYYY h:mm A'),
            })
        } catch (err) {
            console.log('fetch Vietnam info err: ', err);
        } finally {
            setIsFetching(false);
        }
    }

    if (isFetching) return <h1>Loading...</h1>;

    return (
        <div className="d-flex flex-column align-items-center justify-content-center p-4 mt-5 box">
            <h1 className="mb-3">Vietnam 🇻🇳</h1>
            <div className="d-flex flex-row align-items-center">
                <div className="d-flex flex-column p-3 border-end">
                    <span className="fz-3 fw-bold">{vietnamInfo.infected.toLocaleString()}</span>
                    <span className="fz-4">Confirmed</span>
                </div>
                <div className="d-flex flex-column p-3 border-end">
                    <span className="fz-3 fw-bold">{vietnamInfo.deceased.toLocaleString()}</span>
                    <span className="fz-4">Deaths</span>
                </div>
                <div className="d-flex flex-column p-3">
                    <span className="fz-3 fw-bold">{vietnamInfo.recovered.toLocaleString()}</span>
                    <span className="fz-4">Recovered</span>
                </div>
            </div>
            <p className="mt-3 text-muted">Updated: {vietnamInfo.lastUpdate}</p>
        </div>
    )
}
