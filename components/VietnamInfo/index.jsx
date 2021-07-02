import React, { useEffect, useState } from 'react'

export default function VietnamInfo(props) {
    const { vietnamInfo } = props;

    return (
        <div className="d-flex flex-column align-items-center justify-content-center p-4 box">
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
