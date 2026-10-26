import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function useCategories() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/categories")
                setCategories(response.data.data)
            } catch (error) {
                console.log(error)
                toast.error('Something went wrong while fetching categories try again later.')
            }
        }
        fetchCategories()
    }, [])
    
    return categories
}
