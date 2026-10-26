import React from 'react'
import { ScaleLoader } from "react-spinners"

export default function Spinner() {
    return (
        <div className="d-flex justify-content-center my-3">
            <ScaleLoader
                size={60}
            />
        </div>
    )
}
