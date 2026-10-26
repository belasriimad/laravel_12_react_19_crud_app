import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

export default function PrivateRoute({ children }) {
    const { isLoggedIn } = useSelector(state => state.user)

    return isLoggedIn ?  children : <Navigate to="/login" replace />
}
