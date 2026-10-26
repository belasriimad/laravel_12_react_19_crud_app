import React from 'react'

export default function useValidation(errors, field) {
    const renderErrors = () => (
        errors?.[field]?.map((error, index) => (
            <div className="bg-danger p-2 text-white my-2 rounded" 
                key={index}
            >
                { error }
            </div>
        ))
    )

    return renderErrors()
}
